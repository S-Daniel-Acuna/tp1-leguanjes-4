// Referencias a los elementos del DOM
const btnAbrir = document.getElementById('btnAbrir');
const inputNombre = document.getElementById('nombre');
const inputLatitud = document.getElementById('latitud');
const inputLongitud = document.getElementById('longitud');
const mensajeError = document.getElementById('mensajeError');
const mapaContainer = document.getElementById('mapaContainer');
const mapaIframe = document.getElementById('mapaIframe');

btnAbrir.addEventListener('click', () => {
  const nombre = inputNombre.value.trim();
  const latitud = inputLatitud.value.trim();
  const longitud = inputLongitud.value.trim();

  // Validación básica de los datos ingresados
  if (!validarCoordenadas(latitud, longitud)) {
    mensajeError.textContent = 'Ingresá una latitud y longitud válidas (ej: 28.3537921 / -81.5618197).';
    mapaContainer.classList.remove('visible');
    return;
  }

  mensajeError.textContent = '';

  // 1) Mostrar el mapa embebido dentro de la misma página
  mapaIframe.src = `https://www.google.com/maps?q=${latitud},${longitud}&hl=es&z=15&output=embed`;
  mapaContainer.classList.add('visible');

  // 2) Abrir también Google Maps en una nueva pestaña con la ubicación
  const url = `https://www.google.com/maps?q=${latitud},${longitud}`;
  window.open(url, '_blank');

  console.log(`Ubicación: ${nombre || 'Sin nombre'} -> Lat: ${latitud}, Lon: ${longitud}`);
});

// Verifica que latitud y longitud sean números válidos dentro de rango
function validarCoordenadas(lat, lon) {
  if (lat === '' || lon === '') return false;

  const latNum = parseFloat(lat.replace(',', '.'));
  const lonNum = parseFloat(lon.replace(',', '.'));

  if (isNaN(latNum) || isNaN(lonNum)) return false;
  if (latNum < -90 || latNum > 90) return false;
  if (lonNum < -180 || lonNum > 180) return false;

  return true;
}
