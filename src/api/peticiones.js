import axios from "axios";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
const API = process.env.NEXT_PUBLIC_API_URL;


export const peticionRegistro = async(usuario)=>{
    console.log("estas en la funcion registro");
    console.log(usuario);
    return await axios.post(`${API}/registro`, usuario);
}

export const login = async(usuario)=>{
    try {
        const rutaLogin = `${API}/ingresar`
        const respuesta =  await axios.post(rutaLogin,{usuario},{withCredentials: true});
        //console.log(respuesta);
        
        if (!respuesta.data) return {estado:false}
        return {estado:true,tipoUsuario:respuesta.data}        
    } catch (error) {
        //console.log(error);
        return {estado:false}
    }
}

export const buscarPorId = async(id)=>{
    return await axios.get(`${API}/buscarPorId/${id}`);
}

export const buscarTodos = async()=>{
    return await axios.get(`${API}/buscarTodos`);
}  

export const cerrarSesion = async () => {
    try {
        const rutaLogout = `${API}/salir`;
        console.log("🔍 URL de logout:", rutaLogout);

       const response = await axios.post(rutaLogout, {}, { withCredentials: true });

        console.log("Respuesta de logout:", response);

        if (response.status === 200) {
            console.log("Sesión cerrada correctamente");
            return { estado: true, mensaje: response.data };
        } else {
            throw new Error("Error al cerrar sesión");
        }
    } catch (error) {
        console.error("Error en la solicitud de cierre de sesión:", error);
        return { estado: false, mensaje: "No se pudo cerrar sesión" };
    }
};


export const obtenerTodosUsuarios = async () => {

    return await axios.get(`${API}/mostrar`);
  };


  export const borrarUsuario = async (id) => {
    try {
        const respuesta = await axios.delete(`${API}/eliminarPorId/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        toast.success(respuesta.data.mensajeUsuario);
        return true;
    } catch (error) {
        toast.error(error.response?.data?.mensajeUsuario || "Error al borrar usuario");
        return false;
    }
};

export const obtenerUsuarioPorId = async (id) => {
    try {
        const respuesta = await axios.get(`${API}/buscarPorId/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        
        return respuesta.data.usuario;
    } catch (error) {
        toast.error(error.response?.data?.mensajeUsuario || "Error al obtener usuario");
        return null; 
    }
};
export const editarUsuario = async (id, datos) => {
    try {
        console.log("Enviando datos para actualizar usuario:", { id, datos });  // Log de los datos enviados

        const respuesta = await axios.put(`${API}/actualizarPorId/${id}`, datos, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        console.log("Respuesta de la API:", respuesta);  // Log de la respuesta de la API
        toast.success(respuesta.data.mensajeUsuario);
        return true;
    } catch (error) {
        console.log("Error al actualizar usuario:", error);  // Log de error
        toast.error(error.response?.data?.mensajeUsuario || "Error al editar usuario");
        return false;
    }
};

