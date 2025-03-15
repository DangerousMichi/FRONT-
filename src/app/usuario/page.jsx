"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { cerrarSesion } from "@/api/peticiones"; 

export default function Usuario() {
    const autorizado = useAuth(["usuario", "admin"]);
    const router = useRouter();

    console.log("******* Estas en usuario.jsx *****");
    console.log(autorizado);
    console.log("**********************************");

    if (autorizado === null) {
        return <p>Verificando autorización...</p>;
    }

    if (!autorizado) {
        return <p>Acceso denegado. No tienes permisos para ver esta página.</p>;
    }

    const handleCerrarSesion = async () => {
        try {
            await cerrarSesion();
            router.push("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Datos del Usuario</h1>
            <p>Bienvenido, {autorizado?.username || "Usuario"}.</p>
            <p>Tu rol es: <strong>{autorizado?.tipoUsuario}</strong></p>
            
            <a href="/dashboard" style={{ color: "blue", textDecoration: "underline" }}>
                Editar perfil
            </a>
            <br />
            <br />

            <a href="/dashboard" style={{ color: "blue", textDecoration: "underline" }}>
                Eliminar cuenta
            </a>
            <br />
            <br />
            <a onClick={handleCerrarSesion} style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>
                cerrar sesion
            </a>
        </div>
    );
}
