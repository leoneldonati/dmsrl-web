"use client";
import { ToastContainer } from "react-toastify";
const ToastClientContainer = () => (
  <ToastContainer
    position="bottom-right" // Posición por defecto
    autoClose={1500} // Cierra después de 5 segundos
    hideProgressBar={false} // Muestra la barra de progreso
    newestOnTop={true} // Nuevas notificaciones debajo
    closeOnClick // Cierra al hacer clic
    rtl={false} // Dirección de izquierda a derecha
    pauseOnFocusLoss // Pausa el temporizador si la ventana pierde foco
    draggable // Permite arrastrar las notificaciones
    pauseOnHover // Pausa el temporizador al pasar el ratón
    theme="light"
  />
);
export default ToastClientContainer;
