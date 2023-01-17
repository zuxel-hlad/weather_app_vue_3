<template lang="pug">
app-spinner(v-if="loading")
section.favorites(v-else-if="!loading && cardItems.length")
    app-card(
        v-for="city in cardItems",
        :key="city.id",
        :cardItem="city",
        @delete-item="removeFromFaforites(city.id)"
    )

h1.favorites__empty(v-if="!loading && cardItems.length === 0") No favorites yet.
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

    computed: {
        cardItems() {
            return this.cards.filter((item) => item.isFavorite);
        },
    },

    created() {
        if (localStorage.getItem("currentCities")) {
            this.cards = JSON.parse(localStorage.getItem("currentCities"));
            this.loading = false;
        } else {
            this.loading = false;
        }
    },

    methods: {
        removeFromFaforites(id) {
            this.cards = this.cards.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        isFavorite: false,
                    };
                } else {
                    return item;
                }
            });
            localStorage.setItem("currentCities", JSON.stringify(this.cards));
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