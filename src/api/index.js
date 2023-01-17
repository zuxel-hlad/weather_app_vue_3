import axios from "axios";

class Api {
    constructor() {
        this._baseWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
        this._baseForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?";
        this._options =
            "&units=metric&appid=ffc28ffb8dd4bfbefdbbb8d51dbbcc6c&lang=";
        this._lang = "ru";
        this.status = "";
    }

    getCity = async (cityName) => {
        try {
            const resCity = await axios.get(
                `${this._baseWeatherUrl}q=${cityName}${this._options}${this._lang}`
            );
            const transformedCIty = {
                name: resCity.data.name,
                weather: resCity.data.weather[0].description,
                id: resCity.data.id,
                temperature:
                    Math.round(resCity.data.main.temp) > 0
                        ? `+${Math.round(resCity.data.main.temp)}`
                        : `${Math.round(resCity.data.main.temp)}`,
                icon: resCity.data.weather[0].icon,
                isFavorite: false,
                lat: resCity.data.coord.lat,
                lon: resCity.data.coord.lon
            };
            return transformedCIty;
        } catch (e) {
            console.error(e);
            this.status = e.response.status;
        }
    };

    getForecast = async (cityName) => {
        try {
            const forecast = await axios.get(`${this._baseForecastUrl}q=${cityName}${this._options}${this._lang}`);
            return forecast
        } catch (e) {
            console.error(e);
        }
    };
}

const api = new Api();
export default api;
