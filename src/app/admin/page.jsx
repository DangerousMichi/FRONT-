"use client";

import { useRouter } from "next/navigation"; 
import { cerrarSesion,obtenerTodosUsuarios, borrarUsuario, obtenerUsuarioPorId, editarUsuario } from "@/api/peticiones"; 
import { useEffect, useState } from "react"; 
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaExclamationTriangle, FaTrash } from "react-icons/fa"; 
import { useAuth } from "@/hooks/useAuth";


export default function User() { 
    const [usuarios, setUsuarios] = useState([]);
    const [idBuscar, setIdBuscar] = useState(""); 
    const router = useRouter(); 

    const autorizado = useAuth(["admin"]);

    // UseEffect to load users after checking authorization
    useEffect(() => {
        if (autorizado === null) return; // Don't load users until authorization is confirmed
        cargarUsuarios();
    }, [autorizado]); // Depend on 'autorizado'

    if (autorizado === null) {
        return <p>Verificando autorización...</p>;
    }

    const cargarUsuarios = async () => {
        try {
            const data = await obtenerTodosUsuarios();
            console.log("cargando la data: ",data);
            
            if (data) {
                setUsuarios(data.data.mensaje);
            }
        } catch (error) {
            toast.error("Error al cargar usuarios");
        }
    };

    const handleCerrarSesion = async () => {
        try {
            await cerrarSesion();
            router.push("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const buscarUsuarioPorId = async () => {
        if (!idBuscar.trim()) {
            toast.error("Por favor, ingresa un ID");
            return;
        }
        try {
            const dataUser = await obtenerUsuarioPorId(idBuscar);
            console.log("dataUser isss: ",dataUser);
            
            if (dataUser) {
                setUsuarios([dataUser]); 
            } else {
                toast.error("Usuario no encontrado");
            }
        } catch (error) {
            toast.error("Error al buscar el usuario");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            return;
        }

        const eliminado = await borrarUsuario(id);
        if (eliminado) {
            setUsuarios(usuarios.filter((usuario) => usuario._id !== id)); 
        }
    };

    const handleEdit = (id) => {
        router.push(`/edit/${id}`); 
    };

    return (
        <div className="row">
            
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ingrese ID del usuario"
                    value={idBuscar}
                    onChange={(e) => setIdBuscar(e.target.value)}
                />
                <button type="button" className="btn btn-primary mt-2" onClick={buscarUsuarioPorId}>
                    Buscar
                </button>
            </div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>IdUsuario</th>
                        <th>Username</th>
                        <th>Rol</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.length > 0 ? (
                        usuarios.map((usuario) => (
                            <tr key={usuario._id}>
                                <td>{usuario._id}</td>
                                <td>{usuario.username}</td>
                                <td>{usuario.tipoUsuario}</td>
                                <td>
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => handleEdit(usuario._id)} 
                                    >
                                        <FaEdit /> Editar
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(usuario._id)}
                                    >
                                        <FaTrash /> Borrar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                No hay usuarios
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <a onClick={handleCerrarSesion} style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>
                Cerrar Sesión
            </a>

        </div>
    );
}