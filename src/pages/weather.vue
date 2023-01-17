<template lang="pug">
app-spinner(v-if="loading")
section.weather-page(v-else)
    .weather-page__add
        app-add-city(
            v-model="cityName", 
            :cities="defaultCities"
            :responseStatus="cityNotFound"
        )
    .weather-page__weather
        app-card(
            v-for="city in cities", 
            :key="city.id", 
            :cardItem="city"
            @delete-item="deleteCurrentCity(city.id)"
            )
        app-card(
            addCard
            @add-item="addNewCity"
            )
    app-modal(v-model="addCityModal")
        app-add-city(
            v-model="cityName", 
            :cities="defaultCities"
            :responseStatus="cityNotFound"
            )
    app-modal(v-model="showConfirmDeleteModal")
        app-confirm-popup(
            :settings="confirmDeletePopupSettings"
            @confirm="deleteCity(deleteCardId), showConfirmDeleteModal = false"
            @cancel="showConfirmDeleteModal = false"
        )
    app-modal(v-model="showWarningModal")
        app-confirm-popup(
            :settings="warningPopupSettings"
            @confirm="showWarningModal = false"
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
            loading: true,
            confirm: false,
            cancel: false,
            showConfirmDeleteModal: false,
            showWarningModal: false,
            confirmPopupSettings: {},
            addCityModal: false,
            cityName: "",
            cityNotFound: null,
        };
    },

    computed: {
        ...mapState({
            defaultCities: (state) => state.defaultCities,
            cities: (state) => state.cities,
            warningPopupSettings: state => state.warningPopupSettings,
            confirmDeletePopupSettings: state => state.confirmDeletePopupSettings,
        }),
    },

    created() {
        this.setInitialCity();
    },

    methods: {
        ...mapMutations(["setCities", 'deleteCity']),
        updateCityList() {
            this.cityNotFound = '';
            api.getCity(this.cityName)
                .then((data) => this.setCities(data))
                .then(() => (this.loading = false))
                .catch(() => {
                    this.loading = false;
                    this.cityNotFound = api.status === 404 ? 'City not found' : api.status;
                });
        },

        setInitialCity() {
            api.getCity(this.defaultCities[0])
                .then((data) => this.setCities(data))
                .then(() => (this.loading = false))
                .catch(() => {
                    this.loading = false;
                });
        },

        addNewCity() {
            if(this.cities.length !== 5) {
                this.addCityModal = true
            } else {
                this.showWarningModal = true
            }
        
        },
        deleteCurrentCity(id) {
            this.showConfirmDeleteModal = true;
            this.deleteCardId = id;
        }
    },

    watch: {
        cityName(val) {
            if (val && this.cities.length !== 5) {
                this.updateCityList();
                this.cityName = '';
                this.addCityModal = false;
            } else if(val && this.cities.length === 5) {
                this.showWarningModal = true
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