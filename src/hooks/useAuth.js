"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth(roles=null) {
    const router = useRouter();
    const [autorizado, setAutorizado] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        let bandera = true;
        const verificarAutorizacion = async () => {
            try {
                const res = await axios.get("/api/auth", { withCredentials: true });//api/auth/route.js
                const usuario = res.data.estado.usuario;
                if(!roles.includes(usuario.tipoUsuario)){
                    router.replace("/login");
                }
                setAutorizado(usuario)
            } catch (error) {
                setError("Error de conexión");
                router.replace("/login");
            }
        };
        if (autorizado === null) { 
            verificarAutorizacion();
        }
        return()=>{bandera=false}
    }, [router,roles]);
    return autorizado;
}