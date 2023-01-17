import { createStore } from "vuex";
import weatherModule from './modules/weather-module';

export default createStore({
    modules: {
        weatherModule
    },
});
