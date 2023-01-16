<template lang="pug">
app-spinner(v-if="loading")
section.weather-page(v-else)
    .weather-page__add
        app-add-city(
            v-model="cityName", 
            :cities="defaultCities"
        )
    .weather-page__weather
        app-card(
            v-for="city in cities", 
            :key="city.id", 
            :cardItem="city"
            @delete-item="deleteCity(city.id)"
            )
        app-card(
            addCard
            @add-item="addNewCity"
            )
    app-modal(v-model="addCityModal")
        app-add-city(
            v-model="cityName", 
            :cities="defaultCities")
    app-modal(v-model="showConfirmModal")
        app-confirm-popup(
            :settings="confirmPopupSettings"
            @confirm=" confirm = $event"
            @cancel="cancel = $event"
            )
</template>

<script>
import appModal from "../components/app-modal.vue";
import appConfirmPopup from "../components/app-alert.vue";
import appAddCity from "../components/app-add-city.vue";
import appCard from "../components/app-card.vue";
import appSpinner from "../components/app-spinner.vue";
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
    },
    data() {
        return {
            confirm: false,
            cancel: false,
            loading: true,
            showConfirmModal: false,
            addCityModal: false,
            cityName: "",
            confirmPopupSettings: {}
        };
    },

    computed: {
        ...mapState({
            defaultCities: (state) => state.defaultCities,
            cities: (state) => state.cities,
        }),
    },

    created() {
        this.setInitialCity();
    },

    methods: {
        ...mapMutations(["setCities", 'deleteCity']),
        updateCityList() {
            api.getCity(this.cityName)
                .then((data) => this.setCities(data))
                .then(() => (this.loading = false))
                .catch((error) => {
                    this.loading = false;
                    console.error(error);
                });
        },

        setInitialCity() {
            api.getCity(this.defaultCities[0])
                .then((data) => this.setCities(data))
                .then(() => (this.loading = false))
                .catch((error) => {
                    this.loading = false;
                    console.error(error);
                });
        },

        addNewCity() {
            if(this.cities.length === 5) {
                this.confirmPopupSettings = {
                    title: 'Number of cities equals 5',
                    description: 'Delete one to add a new one'
                }
                this.showConfirmModal = true
            } else {
                this.addCityModal = true
            }
        }
    },

    watch: {
        cityName(val) {
            if (val) {
                this.updateCityList();
                this.cityName = '';
                this.addCityModal = false;
                confirmPopupSettings = {}
            }
        },
        confirm(val) {
            if(val) {
                this.showConfirmModal = false
            }
        },
        cancel(val) {
            if(val) {
                this.showConfirmModal = false
            }
        }
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