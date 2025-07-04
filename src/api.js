/**
 * Función genérica para hacer peticiones HTTP (GET, POST, PUT, DELETE)
 * @param {string} url - URL completa de la API
 * @param {string} method - Método HTTP ('GET', 'POST', 'PUT', 'DELETE')
 * @param {object} [body=null] - Objeto con los datos a enviar (opcional)
 * @returns {Promise<any|null>} - Retorna los datos o null si hay error
 */

export const fetchData = async (url, method = 'GET', body = null) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(url, options);

    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

    const contentType = res.headers.get('Content-Type');

    if (contentType && contentType.includes('application/json')) {
      return await res.json();
    }

    return null; // No hay contenido útil en la respuesta
  } catch (error) {
    console.error(`❌ Error en ${method} ${url}:`, error.message);
    return null;
  }
};
