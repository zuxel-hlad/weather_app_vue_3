<template lang="pug">
app-spinner(v-if="loading")
section.favorites(v-else-if="!loading && favorites.length")
    app-card(
        v-for="city in favorites", 
        :key="city.id", 
        :cardItem="city"
        @add-to-favorite="addToFavorite(city.id)"
        )

h1(v-if="!loading && favorites.length === 0") Cards Not Found
</template>

<script>
import appSpinner from "../components/app-spinner.vue";
import appCard from "../components/app-card.vue";
import { mapMutations, mapState } from "vuex";
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
        ...mapState({
            favorites: state => state.favorites
        })
    },

    created() {
        if (localStorage.getItem("favoriteCities")) {
            this.setFavorites(JSON.parse(localStorage.getItem("favoriteCities")));
            this.loading = false;
        } else {
            this.loading = false;
        }
    },

    methods: {
        ...mapMutations(["addToFavorite", "setFavorites"]),
    },
};
</script>

<style scoped lang="scss">
.favorites {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 50px 0;
}
</style>