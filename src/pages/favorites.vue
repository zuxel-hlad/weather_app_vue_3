<template lang="pug">
app-spinner(v-if="loading")
section.favorites(v-else-if="!loading && cardItems.length")
    app-card(
        v-for="city in cardItems",
        :key="city.id",
        :cardItem="city",
        @delete-item="removeFromFaforites(city.id)"
    )

h1.favorites__empty(v-if="!loading && cardItems.length === 0") {{ $t('favorites.itemsNotFound') }} <br> {{ $t('favorites.backToHome') }} 
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
        // We return the data through the calculated ones, so that when deleting, the list is re-rendered on the fly.
        cardItems() {
            return this.cards.filter((item) => item.isFavorite);
        },
    },

    created() {
        // Check if there are items in localStorage. If present, writes to an array of local cards.
        if (localStorage.getItem("currentCities")) {
            this.cards = JSON.parse(localStorage.getItem("currentCities"));
            this.loading = false;
        } else {
            // if not, then set the download to false, a message is displayed that there is no data.
            this.loading = false;
        }
    },

    methods: {
        // update state to "unfavorite", update localStorage
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
    grid-template-rows: 1fr;
    grid-auto-rows: 1fr;
    gap: 20px;
    padding: 50px 0;

    &__empty {
        margin-top: 50px;
        text-align: center;
    }
}

@media screen and (max-width: 992px) {
}

@media screen and (max-width: 440px) {
    .favorites {
        &__empty {
            font-size: 24px;
        }
    }
}
</style>