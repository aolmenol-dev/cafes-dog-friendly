exports.handler = async function(event) {
  const ciudad = event.queryStringParameters.ciudad;
  const apiKey = process.env.GOOGLE_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=cafes+dog+friendly+en+${encodeURIComponent(ciudad)}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const cafes = data.results.slice(0, 6).map(place => ({
    nombre: place.name,
    direccion: place.formatted_address,
    rating: place.rating ? `${place.rating} ⭐` : "Sin valoración",
    abierto: place.opening_hours?.open_now ? "Abierto ahora" : "Horario desconocido"
  }));

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(cafes)
  };
};
