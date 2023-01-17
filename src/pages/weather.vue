<template lang="pug">
app-spinner(v-if="loading")
section.weather-page(v-else)
    .weather-page__add
        app-add-city(
            v-model="cityName",
            :cities="defaultCities",
            :responseStatus="cityNotFound"
        )
    .weather-page__weather
        app-card(
            v-for="city in cities",
            :key="city.id",
            :cardItem="city",
            @delete-item="deleteCurrentCity(city.id)",
            @add-to-favorite="addToFavorite(city.id)"
        )
        app-card(addCard, @add-item="addNewCity")
    app-chart(:chartData="chartData")
    app-modal(v-model="addCityModal")
        app-add-city(
            v-model="cityName",
            :cities="defaultCities",
            :responseStatus="cityNotFound"
        )
    app-modal(v-model="showConfirmDeleteModal")
        app-confirm-popup(
            :settings="confirmDeletePopupSettings",
            @confirm="deleteCity(deleteCardId), (showConfirmDeleteModal = false)",
            @cancel="showConfirmDeleteModal = false"
        )
    app-modal(v-model="showWarningModal")
        app-confirm-popup(
            :settings="warningPopupSettings",
            @confirm="showWarningModal = false"
        )
</template>

<script>
import appModal from "../components/app-modal.vue";
import appConfirmPopup from "../components/app-alert.vue";
import appAddCity from "../components/app-add-city.vue";
import appCard from "../components/app-card.vue";
import appSpinner from "../components/app-spinner.vue";
import appChart from "../components/app-chart";
import { mapState, mapMutations } from "vuex";
import api from "../api";

export default {
    name: "weather",
    components: {
        appModal,
        appConfirmPopup,
        appAddCity,
        appCard,
        appSpinner,
        appChart,
    },
    data() {
        return {
            loading: true,
            showConfirmDeleteModal: false,
            showWarningModal: false,
            confirmPopupSettings: {},
            addCityModal: false,
            cityName: "",
            cityNotFound: null,
            chartData: {
                labels: [],
                datasets: [{ data: [], label: "" }],
            },
        };
    },

    computed: {
        ...mapState("weatherModule", {
            defaultCities: (state) => state.defaultCities,
            cities: (state) => state.cities,
            warningPopupSettings: (state) => state.warningPopupSettings,
            confirmDeletePopupSettings: (state) =>
                state.confirmDeletePopupSettings,
        }),
    },

    created() {
        this.setInitialCity();
        setTimeout(this.setChartData, 500);
    },

    methods: {
        ...mapMutations("weatherModule", [
            "setCities",
            "deleteCity",
            "addToFavorite",
            "getCitiesFromStorage",
        ]),
        async setChartData(name = 'kharkiv') {
            const res = await api.getForecast(name);
            const date = new Date();
            const year = date.getFullYear();
            const dayDate = date.getDate();
            const month = date.getMonth() + 1;
            const today = `${year}-${
                month > 9 ? month : `0${month}`
            }-${dayDate}`;
            this.chartData = {
                labels: res.data.list
                    .filter((item) => item.dt_txt.includes(today))
                    .map((item) => item.dt_txt),
                datasets: [
                    {
                        data: res.data.list
                            .filter((item) => item.dt_txt.includes(today))
                            .map((item) => item.main.temp),
                        label: "Hourly Forecast",
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(255, 159, 64, 0.2)",
                            "rgba(255, 205, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(201, 203, 207, 0.2)",
                        ],
                        borderColor: [
                            "rgb(255, 99, 132)",
                            "rgb(255, 159, 64)",
                            "rgb(255, 205, 86)",
                            "rgb(75, 192, 192)",
                            "rgb(54, 162, 235)",
                            "rgb(153, 102, 255)",
                            "rgb(201, 203, 207)",
                        ],
                        borderWidth: 1,
                    },
                ],
            };
        },
        updateCityList() {
            this.cityNotFound = "";
            api.getCity(this.cityName)
                .then((data) => this.setCities(data))
                .then(() => (this.loading = false))
                .catch(() => {
                    this.loading = false;
                    this.cityNotFound =
                        api.status === 404 ? "City not found" : api.status;
                });
        },

        setInitialCity() {
            const currentCities = JSON.parse(
                localStorage.getItem("currentCities")
            );
            if (currentCities && currentCities.length > 0) {
                this.getCitiesFromStorage(currentCities);
                this.loading = false;
            } else {
                api.getCity(this.defaultCities[0])
                    .then((data) => this.setCities(data))
                    .then(() => (this.loading = false))
                    .catch(() => {
                        this.loading = false;
                    });
            }
        },

        addNewCity() {
            if (this.cities.length !== 5) {
                this.addCityModal = true;
            } else {
                this.showWarningModal = true;
            }
        },
        deleteCurrentCity(id) {
            this.showConfirmDeleteModal = true;
            this.deleteCardId = id;
        },
    },

    watch: {
        cityName(val) {
            if (val && this.cities.length !== 5) {
                this.updateCityList();
                this.cityName = "";
                this.addCityModal = false;
            } else if (val && this.cities.length === 5) {
                this.showWarningModal = true;
            }
        },
    },
};
</script>

<style scoped lang="scss">
.weather-page {
    &__weather {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    &__add {
        margin: 0 auto;
        max-width: 50%;
    }
}
</style>