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
            warningPopupSettings: {
                title: 'Number of cities equals 5',
                description: 'Delete one to add a new one',
                type: 'warning'
            },
            confirmDeletePopupSettings: {
                title: 'Warning, you are trying to delete this block!',
                description: 'Confirm deletion ?',
                type: ''
            },
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
