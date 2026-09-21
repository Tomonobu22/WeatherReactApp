import { useCallback, useEffect, useState } from "react"
import { getWeather } from "../services/weatherService";
import { createWeatherModel } from "../models/weatherModel";

export function useWeather() {

    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [image, setImage] = useState(null);

    const loadInfo = useCallback(async (city = "london") => {
        const searchCity = city && city.trim() ? city.trim() : "london";
        try {
            setError(null);
            setLoading(true);
            const json = await getWeather(searchCity);

            // getWeather now throws for non-ok responses, but keep defensive checks
            if (json && (json.cod === 200 || json.cod === "200")) {
                setWeather(createWeatherModel(json));
                const bg = await fetchBackgroundImage(searchCity);
                if (bg && bg.urls && bg.urls.regular) {
                    setBackgroundImage(bg.urls.regular);
                    setImage(bg);
                    // Tell Unsplash the photo was used (best-effort).
                    // The download_location endpoint requires authentication. Only call it when we have an access key.
                    try {
                        const dl = bg.links && bg.links.download_location;
                        const key = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
                        if (dl && key) {
                            fetch(dl, { headers: { Authorization: `Client-ID ${key}` } });
                        }
                    } catch (e) { /* ignore */ }
                } else {
                    setBackgroundImage(null);
                    setImage(null);
                }
            } else {
                const msg = json && json.message ? json.message : "City not found";
                setError(msg);
            }

        } catch (error) {
            setError(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }, []);



    async function fetchBackgroundImage(city) {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?query=${city}&orientation=landscape`,
            {
                headers: {
                    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }
    


    useEffect(() => {
        loadInfo();
    }, [loadInfo]); 

    return {
        weather,
        error,
        loading,
        loadInfo,
        backgroundImage,
        image,
        clearError: () => setError(null)
    };
}