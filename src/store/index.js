import { createStore } from "vuex";

export default createStore({
    state() {
        return {
            cities: [],
            defaultCities: [
                "kharkiv",
                "kherson",
                "kyiv",
                "kremenchuk",
                "ternopil",
            ],
        };
    },

    mutations: {
        setCities(state, payload) {
            if (
                state.cities.length === 5 ||
                state.cities.findIndex((item) => item.id === payload.id) > -1
            )
                return false;
            state.cities = [...state.cities, payload];
        },
        deleteCity(state, payload) {
            state.cities = state.cities.filter((item) => item.id !== payload);
        },
    },
});
