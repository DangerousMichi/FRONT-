"use client"
import { useForm } from "react-hook-form";
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { login } from "@/api/peticiones";
export default function Login(){
    const router = useRouter()
    const [mensaje, setMensaje] = useState("");
    const {register, handleSubmit, reset, setFocus} = useForm();
    return(
        <>
            <h1>Login</h1>
            <form action="" onSubmit={handleSubmit(async(usuario)=>{
                const respuesta = await login(usuario);
                //const autorizado = useAuth();
                //console.log(respuesta);
                
                if(respuesta.tipoUsuario=="usuario"){
                    router.push("/usuario");
                } 
                else{
                    if(respuesta.tipoUsuario=="admin"){
                        router.push("/admin");
                    }
                    else{
                        setMensaje("Datos incorrectos");
                        toast.error("Usuario o contraseña incorrectos.");
                        reset(); 
                        setTimeout(() => setFocus("username"), 100);
                    }
                }
            })}>
                <input type="text" placeholder="Usuario" {... register("username")} /><br/><br/>
                <input type="text" placeholder="Password" {... register("password")} /><br/><br/>
                <button type="submit">Ingresar</button>
                {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}
            </form>

        </>
    );
}