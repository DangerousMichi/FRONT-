"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "@/api/peticiones";
import styles from "./css/Auth.module.css";
import "./css/global.css";



export default function AuthPage() {
    const router = useRouter();
    const [mensaje, setMensaje] = useState("");
    const { register, handleSubmit, reset, setFocus } = useForm();

    return (
        
        <div className={styles.container}>
            
            {/* Sección izquierda */}
            <div className={styles.leftPanel}>
                <h1 className={styles.welcomeTitle}>¡Bienvenido!</h1>
                <p className={styles.welcomeText}>Inicia sesión para seguir monitoreando los dispositivos</p>
            </div>

            {/* Sección derecha */}
            <div className={styles.rightPanel}>
                <img src="/images/one.png" alt="Logo" className={styles.logo} />
                <h2 className={styles.d}>Inicio de Sesión</h2>
                <form className={styles.formContainer} onSubmit={handleSubmit(async (usuario) => {
                    const respuesta = await login(usuario);
                    if (respuesta.tipoUsuario === "usuario") {
                        router.push("/usuario");
                    } else if (respuesta.tipoUsuario === "admin") {
                        router.push("/admin");
                    } else {
                        setMensaje("Datos incorrectos");
                        toast.error("Usuario o contraseña incorrectos.");
                        reset();
                        setTimeout(() => setFocus("username"), 100);
                    }
                })}>
                    <label className={styles.label}>User:</label>
                    <input type="text" placeholder="Usuario" {...register("username")} className={styles.input} />
                    <label className={styles.label}>Password:</label>
                    <input type="password" placeholder="Password" {...register("password")} className={styles.input} />
                    <a href="/registro" className={styles.loginLink}>¿No tienes cuenta? Regístrate</a>
                    <button type="submit" className={styles.loginButton}>Iniciar Sesión</button>
                    {mensaje && <p className={styles.errorMessage}>{mensaje}</p>}
                </form>
            </div>
        </div>
    );
}
