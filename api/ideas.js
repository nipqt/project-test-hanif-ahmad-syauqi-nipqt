export default async function handler(request, response) {
  // Ambil query params dari request masuk
  const searchParams = request.url.split('?')[1] || '';

  const targetUrl = `https://suitmedia-backend.suitdev.com/api/ideas?${searchParams}`;

  try {
    const apiResponse = await fetch(targetUrl, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!apiResponse.ok) {
      return response.status(apiResponse.status).json({ message: `Error from backend: ${apiResponse.statusText}` });
    }

    const data = await apiResponse.json();
    response.status(200).json(data);

  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Internal Server Error' });
  }
}