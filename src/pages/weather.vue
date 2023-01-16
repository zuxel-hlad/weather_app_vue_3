<template lang="pug">
section.weather-page
    h1 weather app
    .weather-page__add
        app-add-city
    .weather-page__weather
        app-card
        app-card(addCard)
    app-modal(v-model="addCityModal")
        app-add-city
    app-modal(v-model="showConfirmModal")
        app-confirm-popup
    
</template>

<script>
import appModal from "../components/app-modal.vue";
import appConfirmPopup from "../components/app-alert.vue";
import appAddCity from "../components/app-add-city.vue";
import appCard from "../components/app-card.vue";

export default {
    name: "weather",
    components: {
        appModal,
        appConfirmPopup,
        appAddCity,
        appCard
    },
    data() {
        return {
            showConfirmModal: false,
            addCityModal: false
        }
    }
};
</script>

<style scoped lang="scss">
.weather-page {
    &__weather {
        display: flex;
        gap: 20px;
    }

    &__add {
        margin: 0 auto;
        max-width: 50%;
    }
}
</style>