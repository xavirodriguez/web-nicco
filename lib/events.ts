export async function getEvents() {
    const apiUrl = process.env.BANDSINTOWN_URL;
  
    if (!apiUrl) {
      throw new Error("BANDSINTOWN_URL no configurada");
    }
  
    const res = await fetch(apiUrl, {
      next: { revalidate: 36000 }, // 10h en segundos
    });
  
    if (!res.ok) {
      throw new Error("Error al obtener eventos de Bandsintown");
    }
  
    return res.json();
  }
  