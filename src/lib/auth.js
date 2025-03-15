import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const usuarioAutorizado = async()=>{
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if(!token){
            return "no autorizado";
        }
        return new Promise((resolve)=>{
            jwt.verify(token,process.env.SECRET_TOKEN,(error, usuario)=>{
                if(error){
                    resolve({status:"no autorizado"});
                }
                else{
                    if(usuario.tipoUsuario=="usuario"){
                        resolve({status:"autorizado",usuario});
                    }
                    else if(usuario.tipoUsuario=="admin"){
                        resolve({status:"autorizadoAdmin",usuario});
                    }
                    else{
                        resolve({status:"no autorizado"});
                    }
                } 
            });
        });    
    } catch (error) {
        return "no autorizado";
    }
}

