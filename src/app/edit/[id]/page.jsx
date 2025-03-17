"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { obtenerUsuarioPorId, editarUsuario } from "@/api/peticiones";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import "./styles.css"; // Asegúrate de que los estilos están en este archivo

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
            toast.success("Usuario actualizado correctamente", {
                style: { backgroundColor: "#218838", color: "white" }
            });
            router.push("/admin"); 
        } catch (error) {
            toast.error("Error al actualizar usuario");
        }
    };

    return (
        <div className="container">
            <div className="panel">
                <h2 className="title">Editar Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Username</label>
                        <input
                            type="text"
                            className="input-field"
                            name="username"
                            value={usuario.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Rol</label>
                        <select 
                            name="tipoUsuario" 
                            className="input-field"
                            value={usuario.tipoUsuario}
                            onChange={handleChange}
                        >
                            <option value="admin">Admin</option>
                            <option value="usuario">Usuario</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Nueva Contraseña (opcional)</label>
                        <input
                            type="password"
                            className="input-field"
                            name="password"
                            value={usuario.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="btn-group">
                        <button type="submit" className="btn-success">
                            <FaEdit /> Guardar Cambios
                        </button>
                        <button type="button" className="btn-secondary" onClick={() => router.push("/admin")}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
