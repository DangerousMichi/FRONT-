"use client"
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { peticionRegistro } from "@/api/peticiones";
import styles from "../css/Registro.module.css";
import "../css/global.css";

export default function Registro(){
    const {register, handleSubmit} = useForm();
    return(
        <>
        <div className={styles.container}>
             <img src="/images/register.png" alt="Logo" className={styles.logo} />
             <h1 className={styles.d}>Regístrate</h1>
            <form className={styles.formContainer} action="" onSubmit={handleSubmit(async(usuario)=>{
                //console.log(usuario);
                const respuesta = await peticionRegistro(usuario);
                //console.log(respuesta);
                redirect("/")
            })}>
                <input type="text" placeholder="Usuario" {... register("username")}  className={styles.input} /><br/><br/>
                <input type="text" placeholder="Correo" {... register("email")}   className={styles.input} /><br/><br/>
                <input type="text" placeholder="Password" {... register("password")}  className={styles.input}  /><br/><br/>
                <a href="/" className={styles.loginLink}> &lt;-Regresar</a>
                <button type="submit" className={styles.loginButton} >Registrar usuario</button>
            </form>
        </div>
       
        </>
    );
}