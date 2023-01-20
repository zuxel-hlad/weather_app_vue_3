<template lang="pug">
app-spinner(v-if="loading")
section.weather-page(v-else)
    .weather-page__add
        app-add-city(
            v-model="cityName",
            :responseStatus="cityNotFound"
        )
    .weather-page__weather
        app-card(
            v-for="city in cities",
            :key="city.id",
            :cardItem="city",
            @delete-item="openDeleteCityModal(city.id)",
            @add-to-favorite="addToFavorite(city.id)",
            @show-hourly-forecast="setChartForecast(city.name, '.weather-page__chart')"
        )
        app-card(addCard, @add-item="openAddCityModal")
    .weather-page__chart
        app-spinner(
            v-if="chartLoader",
            customClass="weather-page__chart-spinner"
        )
        .weather-page__chart-nav
            button.weather-page__chart-btn(
                type="button",
                @click="changeChartForecast(1)"
            ) {{ $t('chart.showOneDayForecast') }}
            button.weather-page__chart-btn(
                type="button",
                @click="changeChartForecast(5)"
            ) {{ $t('chart.showFiveDaysForecast') }}
        .weather-page__chart-chart
            .canvas
                app-chart(:chartData="chartData")
    app-modal(v-model="addCityModal")
        app-add-city(
            v-model="cityName",
            :responseStatus="cityNotFound"
        )
    app-modal(v-model="showConfirmDeleteModal")
        app-confirm-popup(
            :settings="confirmDeletePopupSettings",
            @confirm="deleteCityFromList",
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
            chartLoader: false,
            showConfirmDeleteModal: false,
            showWarningModal: false,
            confirmPopupSettings: {},
            addCityModal: false,
            cityName: "",
            forecastDaysMax: 1,
            cityNotFound: null,
            chartData: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        label: "",
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
            },
        };
    },

    computed: {
        // Get the necessary variables from the store.
        ...mapState("weatherModule", {
            cities: (state) => state.cities,
            warningPopupSettings: (state) => state.warningPopupSettings,
            confirmDeletePopupSettings: (state) =>
                state.confirmDeletePopupSettings,
        }),
    },

    created() {
        // Here we are set the initial chart values ​​and default city.
        this.setInitialCity();
        this.setChartForecast(
            this.$route.query.location ? this.$route.query.location : "kharkiv"
        );
    },

    methods: {
        //Here we are get mutations from store.
        ...mapMutations("weatherModule", [
            "setCities",
            "deleteCity",
            "addToFavorite",
            "getCitiesFromStorage",
        ]),

        //Action for set initial chart data, or update, or change one/five days.
        setChartForecast(cityName, selector) {
            //if selector defined, and we click icon "hourly temperature on card, then the page will scroll to the graph."
            if (selector) {
                document.querySelector(selector).scrollIntoView({
                    block: "start",
                    behavior: "smooth",
                });
            }
            //start loader before request.
            this.chartLoader = true;
            //write to query city name, it will need for save location for update graph day/5days, and graph label.
            this.$router.replace({ query: { location: cityName } });
            //this we are create function type
            let requestName = "";

            //this we check, if forecastDaysMax variable === 1, we write function name type "getForecastOneDay", and call it.
            if (this.forecastDaysMax === 1) {
                requestName = "getForecastOneDay";
            //this we check, if forecastDaysMax variable === 5, we write function name type "getForecasFiveDays", and call it.
            } else if (this.forecastDaysMax === 5) {
                requestName = "getForecasFiveDays";
            }
            //call a function with the specified type
            api[requestName](cityName, this.$i18n.locale)
                .then((res) => {
            // We receive data from api and form a chart settings object.
                    this.chartData = {
                        labels: res.data.list.map((item) => item.dt_txt),
                        datasets: [
                            {
                                ...this.chartData.datasets[0],
                                data: res.data.list.map((item) =>
                                    Math.round(item.main.temp)
                                ),
                                label: `${this.$t("chart.title")} ${
                                    this.$route.query.location
                                }`,
                            },
                        ],
                    };
                    this.chartLoader = false;
                })
                .catch((error) => {
                    console.error(error);
                    this.chartLoader = false;
                    this.$router.push('/error');
                });
        },
        //The function that we call when we press the forecast buttons for one/5 days. A parameter is also passed there, 1 or 5.
        changeChartForecast(hour) {
            this.forecastDaysMax = hour;
            this.setChartForecast(this.$route.query.location);
        },
        //
        // The function of adding a city simply from a form, or a form from a modal window.
        updateCityList() {
            //cityNotFound is responsible for the message if the city is not found.
            this.cityNotFound = "";
            this.loading = true;
            api.getCity(this.cityName, this.$i18n.locale)
                .then((data) => this.setCities(data))
                .then(() => (this.loading = false))
                .catch(() => {
                    this.loading = false;
                //if status === 404 we write message "city not found"
                    this.cityNotFound =
                        api.status === 404 ? "City not found" : this.$router.push('/error');
                });
        },

        // Function to set the default city. There will always be one. We check the local storage, and if there is no data, we make a request to the api, outside the city. If the local storage is not empty, we will send data from it to the store.
        setInitialCity() {
            const currentCities = JSON.parse(
                localStorage.getItem("currentCities")
            );
            if (currentCities && currentCities.length > 0) {
                this.getCitiesFromStorage(currentCities);
                this.loading = false;
            } else {
                api.getCity(this.defaultCities[0], this.$i18n.locale)
                    .then((data) => this.setCities(data))
                    .then(() => (this.loading = false))
                    .catch(() => {
                        this.loading = false;
                        this.$router.push('/error');
                    });
            }
        },

        // Function to open a modal window that responds either to adding a city or to overflowing the list of cities.
        openAddCityModal() {
            if (this.cities.length !== 5) {
                this.addCityModal = true;
            } else {
                this.showWarningModal = true;
            }
        },
        //Functions for opening a modal window warning about deleting a city. Gets the ID of the city to be deleted, writes it to data.
        openDeleteCityModal(id) {
            this.showConfirmDeleteModal = true;
            this.deleteCardId = id;
        },
        //A function that deletes a city by clicking on "ok" in a modal window that warns about deleting a city.
        // We take the ID of the city to be deleted from data, and call the mutation from the store, passing the ID of the city to be deleted to it.
        //Then close the modal.
        deleteCityFromList() {
            this.deleteCity(this.deleteCardId);
            this.showConfirmDeleteModal = false;
        },
    },

    watch: {
        // Listener checking a number of options:
        //Is there a city with that name in the store? If there is, the request is not made.
        //looks if this.cityName (we change it when we enter data in the city search form) has changed or cities list length !==5?
        // We are trying to make a request to the api, and get the city
        //If there are 5 cities in the list, then when trying a new one, we show a modal with a warning and a suggestion to delete some city in order to add a new one.
        cityName(val) {
            if (
                this.cities.findIndex(
                    (item) => item.name.toLowerCase() === val
                ) !== -1
            )
                return;
            else if (val && this.cities.length !== 5) {
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
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
        grid-template-rows: 1fr;
        grid-auto-rows: 1fr;
        gap: 20px;
        margin-bottom: 50px;
    }

    &__chart {
        position: relative;
        &-btn {
            padding: 10px 15px;
            background: transparent;
            border: 1px solid var(--main-color);
            border-radius: 4px;
            cursor: pointer;
            transition: color 0.3s ease, background-color 0.3s ease;
            text-transform: uppercase;
            margin-right: 10px;

            @media (any-hover: hover) {
                &:hover {
                    color: var(--main-color);
                }
            }

            &:active {
                background-color: var(--main-color);
                color: #fff;
            }
        }

        &-spinner {
            position: absolute;
            background: rgba(100%, 100%, 100%, 50%);
        }
    }

    &__add {
        margin: 0 auto;
        max-width: 50%;
    }
}

@media screen and (max-width: 992px) {
    .weather-page {
        &__add {
            max-width: 100%;
        }
    }
}

@media screen and (max-width: 576px) {
    .weather-page {
        &__chart {
            &-chart {
                overflow-x: scroll;
                & .canvas {
                    width: 900px;
                    height: 470px;
                }
            }
        }
    }
}

@media screen and (max-width: 414px) {
    .weather-page {
        &__chart {
            &-nav {
                display: flex;
                justify-content: center;
            }

            &-btn {
                padding: 10px;
                font-size: 12px;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
}
</style>