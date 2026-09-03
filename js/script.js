/* ===================================================================
   MENÚ MÓVIL Y AÑO DEL FOOTER
   -------------------------------------------------------------------
   1) Pone el año actual en el footer automáticamente, así no hay
      que cambiarlo a mano cada año.
   2) Abre/cierra el menú en móvil al pulsar el botón hamburguesa.
=================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  // 1) Año automático en el footer
  const anio = document.getElementById('anio');
  if (anio) {
    anio.textContent = new Date().getFullYear();
  }

  // 2) Menú móvil: al hacer clic en el botón, añadimos/quitamos una clase
  //    que el CSS usa para mostrar u ocultar el menú
  const botonMenu = document.getElementById('botonMenu');
  const menuNav = document.getElementById('menuNav');

  if (botonMenu && menuNav) {
    botonMenu.addEventListener('click', () => {
      menuNav.classList.toggle('cabecera__nav--abierto');
      botonMenu.classList.toggle('cabecera__boton-menu--abierto');
    });

    // Cerramos el menú automáticamente al pulsar un enlace (útil en móvil)
    document.querySelectorAll('.cabecera__nav a').forEach((enlace) => {
      enlace.addEventListener('click', () => {
        menuNav.classList.remove('cabecera__nav--abierto');
        botonMenu.classList.remove('cabecera__boton-menu--abierto');
      });
    });
  }
});

/* ===================================================================
   FORMULARIO DE CONTACTO
   -------------------------------------------------------------------
   Esta web no tiene servidor propio, así que no podemos "enviar" el
   formulario a una base de datos ni nada parecido. La solución más
   sencilla para una web estática es construir un enlace "mailto:"
   con los datos que ha escrito el visitante, y abrirlo: el navegador
   arranca el programa de correo (Gmail, Outlook, la app de Mail...)
   con un email ya redactado. El visitante solo tiene que pulsar
   "Enviar" desde ahí.

   IMPORTANTE: cambia "tuemail@example.com" por el correo real de tu
   madre (el mismo que pongas en el enlace de la sección de contacto),
   si no los mensajes no llegarán a nadie.
=================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  const CORREO_DESTINO = 'susana_ambar@hotmail.com';

  const formularioContacto = document.querySelector('#formulario-contacto');
  if (!formularioContacto) return; // esta página no tiene formulario de contacto

  formularioContacto.addEventListener('submit', (evento) => {
    // Evita que el formulario haga lo que hace por defecto (recargar
    // la página e intentar enviarse solo a la URL actual).
    evento.preventDefault();

    const nombre = formularioContacto.nombre.value;
    const correo = formularioContacto.correo.value;
    const mensaje = formularioContacto.mensaje.value;

    // El asunto y el cuerpo del email van dentro de la URL, así que
    // hay que "escaparlos" con encodeURIComponent: convierte espacios,
    // acentos, saltos de línea, etc. en un formato válido para una URL.
    const asunto = encodeURIComponent(`Mensaje de ${nombre} desde la web`);
    const cuerpo = encodeURIComponent(
      `Nombre: ${nombre}\nCorreo: ${correo}\n\nMensaje:\n${mensaje}`
    );

    // Construimos el enlace mailto y lo "visitamos" con el navegador,
    // igual que si el visitante hubiera hecho clic en un enlace.
    window.location.href = `mailto:${CORREO_DESTINO}?subject=${asunto}&body=${cuerpo}`;
  });
});
