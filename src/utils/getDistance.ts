export function calculateDistance(lat1, lon1, lat2, lon2) {
  // Convertir grados a radianes
  const toRadian = angle => (Math.PI / 180) * angle;

  // Distancias entre latitudes y longitudes
  const dLat = toRadian(lat2 - lat1);
  const dLon = toRadian(lon2 - lon1);

  // Fórmula de Haversine
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadian(lat1)) *
      Math.cos(toRadian(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Radio de la Tierra en kilómetros (aproximado)
  const radioTierra = 6371;

  // Calcular distancia
  const distancia = radioTierra * c;

  return distancia;
}
