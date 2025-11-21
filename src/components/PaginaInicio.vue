<template>
  <div class="pagina">
    <!-- Video de fondo -->
    <div class="contenedor-video">
      <video class="bg-video" autoplay muted loop playsinline>
        <source src="../assets/coche.mp4" type="video/mp4" />
      </video>
    </div>

    <!-- Contenido por encima del vídeo -->
    <div class="contenido">
        <p>“Conduce calidad, elige confianza.”</p>
      <img src="../assets/logo-pagina.svg"></img>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
/* Contenedor general */
.pagina {
  position: relative;
  width: 100%;
  height: 100%; /* ocupa toda la pantalla */
  overflow: hidden;
}

/* Video de fondo */
.contenedor-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.bg-video {
  width: 100%;
  height: 100%;
  object-fit: cover; /* llena sin deformar */
}

/* Contenido encima */
.contenido {
  position: relative;
  z-index: 1;
  text-align: center;
  top: 40%;
  transform: translateY(-40%);
  background: rgb(0, 0, 0, 0.5);;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 600px;
  margin: auto;
}

p {
    color: white;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 30px;
    font-weight: bold;
}

img {
    width: 25%;
    height: 25%;
}
/* Estilos opcionales */
button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: #ff6600;
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

button:hover {
  background-color: #ff8800;
}
</style>
