export function createWeatherModel(data) {
    return {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        // OpenWeather returns wind speed in m/s. Also provide km/h for display.
        windspeed: data.wind.speed,
        windspeedKmh: data.wind && data.wind.speed ? Math.round(data.wind.speed * 3.6) : null,
        latitude: data.coord.lat,
        longitude: data.coord.lon,
        feelsLike: data.main.feels_like,
    };
}