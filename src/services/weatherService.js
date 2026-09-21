export async function getWeather(city) {
    const encodedCity = encodeURIComponent(city);
    const url = `${process.env.REACT_APP_URL}${encodedCity}&units=metric&appid=${process.env.REACT_APP_KEY}`;

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
        // Normalize the error so callers can show useful messages
        const message = data && data.message ? data.message : `Request failed with status ${response.status}`;
        throw new Error(message);
    }

    return data;
}