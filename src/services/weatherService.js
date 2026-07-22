export async function getWeather(city) {

    const response = await fetch(
        `${process.env.REACT_APP_URL}${city}&units=metric&appid=${process.env.REACT_APP_KEY}`
    );

    return response.json();
}