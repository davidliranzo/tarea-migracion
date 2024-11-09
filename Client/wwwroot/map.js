// Archivo wwwroot/js/map.js
window.initMap = (detencionesJson) => {
    // Convertir JSON a objeto
    const detenciones = JSON.parse(detencionesJson);

    // Inicializar el mapa centrado en República Dominicana
    const map = L.map('map').setView([18.7357, -70.1627], 8);

    // Cargar y mostrar el mapa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Añadir marcadores para cada detención
    detenciones.forEach(detencion => {
        const marker = L.marker([detencion.Coordenadas.Latitud, detencion.Coordenadas.Longitud]).addTo(map);
        marker.on('click', () => {
            // Invocar método C# para mostrar detalles de la detención
            DotNet.invokeMethodAsync('BlazorApp1.Client', 'MostrarDetallesDetencion', detencion);
        });
    });
};
