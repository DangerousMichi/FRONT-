"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { obtenerUsuarioPorId, editarUsuario } from "@/api/peticiones";
import { toast } from "react-toastify";

export default function EditUser() {
    const router = useRouter();
    const { id } = useParams(); 
    const [usuario, setUsuario] = useState({ username: "", password: "", tipoUsuario: "" });

    
    useEffect(() => {
        const cargarUsuario = async () => {
            try {
                const data = await obtenerUsuarioPorId(id);
                if (data) {
                    setUsuario({ username: data.username, password: "", tipoUsuario: data.tipoUsuario });
                }
            } catch (error) {
                toast.error("Error al cargar el usuario");
            }
        };

        if (id) {
            cargarUsuario();
        }
    }, [id]);

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const datosActualizados = usuario.password ? usuario : { username: usuario.username, tipoUsuario: usuario.tipoUsuario };
            await editarUsuario(id, datosActualizados);
            toast.success("Usuario actualizado correctamente");
            router.push("/admin"); 
        } catch (error) {
            toast.error("Error al actualizar usuario");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Editar Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={usuario.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select 
                        name="tipoUsuario" 
                        className="form-control"
                        value={usuario.tipoUsuario}
                        onChange={handleChange}
                    >
                        <option value="admin">Admin</option>
                        <option value="usuario">Usuario</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Nueva Contraseña (opcional)</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={usuario.password}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-success">Guardar Cambios</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => router.push("/")}>
                    Cancelar
                </button>
            </form>
        </div>
    );
}