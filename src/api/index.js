import axios from "axios";

class Api {
    constructor() {
        this._baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
        this._options =
            "&units=metric&appid=ffc28ffb8dd4bfbefdbbb8d51dbbcc6c&lang=";
        this._lang = "ru";
    }
}

const api = new Api();
export default api;
