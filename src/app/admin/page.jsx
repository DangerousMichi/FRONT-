"use client";

import { useRouter } from "next/navigation"; 
import { cerrarSesion, obtenerTodosUsuarios, borrarUsuario, obtenerUsuarioPorId } from "@/api/peticiones"; 
import { useEffect, useState } from "react"; 
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaSearch, FaTrash, FaRedo } from "react-icons/fa"; 
import { useAuth } from "@/hooks/useAuth";
import "./styles.css";

export default function User() { 
    const [usuarios, setUsuarios] = useState([]);
    const [idBuscar, setIdBuscar] = useState(""); 
    const [isLoading, setIsLoading] = useState(false); // Estado para animación de carga
    const router = useRouter(); 
    const autorizado = useAuth(["admin"]);

    useEffect(() => {
        if (autorizado === null) return;
        cargarUsuarios();
    }, [autorizado]);

    if (autorizado === null) {
        return <p className="text-center text-gray-600">Verificando autorización...</p>;
    }

    const cargarUsuarios = async () => {
        setIsLoading(true);
        try {
            const data = await obtenerTodosUsuarios();
            if (data) {
                setUsuarios(data.data.mensaje);
                setIdBuscar(""); // Restablece el campo de búsqueda
            }
        } catch (error) {
            toast.error("Error al cargar usuarios");
        }
        setTimeout(() => setIsLoading(false), 5000); // Retraso para que la animación se note
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

    return (
        <div className="container">
            <div className="panel">
                <h2 className="title">Administración de Usuarios</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Ingrese ID del usuario"
                        value={idBuscar}
                        onChange={(e) => setIdBuscar(e.target.value)}
                    />
                    <button className="btn-primary" onClick={buscarUsuarioPorId}>
                        Buscar
                        <FaSearch style={{ marginLeft: "8px" }} />
                    </button>
                    <button className={`btn btn-primary mb-3 ${isLoading ? "refreshing" : ""}`} onClick={cargarUsuarios}>
                        <FaRedo className={isLoading ? "rotate" : ""} /> Refrescar
                    </button>
                </div>
                <table className="table">
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
                                    <td className="actions">
                                        <button
                                            className="btn-edit"
                                            onClick={() => router.push(`/edit/${usuario._id}`)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(usuario._id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="no-users">
                                    No hay usuarios
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="logout">
                    <a onClick={handleCerrarSesion} className="logout-link">
                        Cerrar Sesión
                    </a>
                </div>
            </div>
        </div>
    );
}