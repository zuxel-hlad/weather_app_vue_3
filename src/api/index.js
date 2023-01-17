import axios from "axios";

class Api {
    constructor() {
        this._baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
        this._options =
            "&units=metric&appid=ffc28ffb8dd4bfbefdbbb8d51dbbcc6c&lang=";
        this._lang = "ru";
        this.status = ''
    }
    

    getCity = async (cityName) => {
        try {
            const resCity = await axios.get(
                `${this._baseUrl}q=${cityName}${this._options}${this._lang}`
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
            };
            return transformedCIty;
        } catch (e) {
            console.error(e);
            this.status = e.response.status;
        }
    };
}

const api = new Api();
export default api;
