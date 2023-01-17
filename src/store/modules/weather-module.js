export default {
    namespaced: true,
    state() {
        return {
            cities: [],
            defaultCities: [
                "kharkiv",
                "kherson",
                "kyiv",
                "sumy",
                "kremenchuk",
                "ternopil",
            ],
            warningPopupSettings: {
                title: "Number of cities equals 5",
                description: "Delete one to add a new one",
                type: "warning",
            },
            confirmDeletePopupSettings: {
                title: "Warning, you are trying to delete this block!",
                description: "Confirm deletion ?",
                type: "",
            },
        };
    },

    mutations: {
        setCities(state, payload) {
            if (state.cities.findIndex((item) => item.id === payload.id) > -1)
                return false;
            state.cities = [...state.cities, payload];
            localStorage.setItem("currentCities",JSON.stringify(state.cities));
        },

        deleteCity(state, payload) {
            state.cities = state.cities.filter((item) => item.id !== payload);
            localStorage.setItem("currentCities",JSON.stringify(state.cities));
        },

        getCitiesFromStorage(state, payload) {
            state.cities = payload;
            localStorage.setItem("currentCities",JSON.stringify(state.cities));
        },

        addToFavorite(state, payload) {
            state.cities = state.cities.map((city) => {
                if (city.id === payload) {
                    return {
                        ...city,
                        isFavorite: !city.isFavorite,
                    };
                } else {
                    return city;
                }
            });
            localStorage.setItem("currentCities",JSON.stringify(state.cities));
        },
    },
};
