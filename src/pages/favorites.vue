<template lang="pug">
app-spinner(v-if="loading")
section.favorites(v-else-if="!loading && cards.length")
    app-card(
        v-for="city in cards",
        :key="city.id",
        :cardItem="city",
        @delete-item="removeFromFaforites(city.id)"
    )

h1.favorites__empty(v-if="!loading && cards.length === 0") No favorites yet.
    <br> Back to home and add one.
</template>

<script>
import appSpinner from "../components/app-spinner.vue";
import appCard from "../components/app-card.vue";
export default {
    name: "favorites",
    components: {
        appSpinner,
        appCard,
    },
    data() {
        return {
            loading: true,
            cards: [],
        };
    },

    created() {
        if (localStorage.getItem("favoriteCities")) {
            this.cards = JSON.parse(localStorage.getItem("favoriteCities"));
            this.loading = false;
        } else {
            this.loading = false;
        }
    },

    methods: {
        removeFromFaforites(id) {
            this.cards = this.cards.filter((item) => item.id !== id);
            localStorage.setItem("favoriteCities", JSON.stringify(this.cards));
        },
    },
};
</script>

<style scoped lang="scss">
.favorites {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 50px 0;

    &__empty {
        margin-top: 50px;
        text-align: center;
    }
}
</style>