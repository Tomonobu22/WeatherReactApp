export function createWeatherModel(data) {
    return {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        latitude: data.coord.lat,
        longitude: data.coord.lon,
        feelsLike: data.main.feels_like,
    };
}