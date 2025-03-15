"use client";
import { useEffect, useState } from "react";
import { obtenerUsuarios } from "@/api/peticiones"; 
import './style.css';

export default function MostrarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true); // Estado para manejar el indicador de carga

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const respuesta = await obtenerUsuarios();
        console.log("Respuesta de la API:", respuesta); // Verifica la estructura de la respuesta
        if (respuesta.length > 0) {
          setUsuarios(respuesta); // Almacena los datos de usuarios si la respuesta es exitosa
        } else {
          setMensaje("No se encontraron usuarios."); // Mensaje en caso de no encontrar usuarios
        }
      } catch (error) {
        setMensaje("Error al cargar los usuarios.");
        console.error("Error al obtener usuarios:", error);
      } finally {
        setCargando(false); // Finaliza la carga después de la respuesta
      }
    };
    fetchUsuarios();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Lista de Usuarios</h1>

      {cargando ? (
        <p>Cargando usuarios...</p> // Mensaje de carga mientras se obtienen los usuarios
      ) : mensaje ? (
        <p className="error">{mensaje}</p> // Si hay un mensaje de error o no hay usuarios
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de Usuario</th>
              <th>Email</th>
              <th>Tipo de Usuario</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td>{usuario._id}</td>
                <td>{usuario.username}</td>
                <td>{usuario.email}</td>
                <td>{usuario.tipoUsuario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}