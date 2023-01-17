<template lang="pug">
.app-card(:class="{ 'app-card_add': addCard }")
    //add card block
    .app-card__add-card(v-if="addCard")
        button.app-card__add-new(type="button", @click="$emit('add-item')")
            i.fa-sharp.fa-solid.fa-plus
            span add new city

    //default weather card block
    .app-card__default(v-else)
        .app-card__default-nav
            button.app-card__default-btn(
                v-if="!$route.path.includes('favorites')"
                type="button",
                title="Hourly temperature display for the current day",
                @click="$emit('show-chart')"
            )
                i.fa-solid.fa-chart-line
            button.app-card__default-btn(
                type="button",
                title="add to favorite",
                :class="{ 'app-card__default-btn_favorite': cardItem.isFavorite }",
                @click="$emit('add-to-favorite')"
            )
                i.fa-solid.fa-star
            button.app-card__default-btn(
                v-if="!$route.path.includes('favorites')"
                type="button",
                title="delete this item",
                @click="$emit('delete-item')"
            )
                i.fa-solid.fa-trash
        h3.app-card__default-title {{ cardItem.name }} {{ cardItem.temperature }}
            sup o
        p.app-card__default-descr {{ cardItem.weather }}
        img(
            v-if="cardItem.icon",
            :src="`http://openweathermap.org/img/wn/${cardItem.icon}.png`",
            alt="weather icon"
        )
</template>

<script>
export default {
    name: "app-card",
    props: {
        addCard: {
            type: Boolean,
            required: false,
            default: false,
        },
        cardItem: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
};
</script>

<style scoped lang="scss">
.app-card {
    border-radius: 12px;
    width: 100%;
    max-width: 300px;
    min-height: 150px;
    padding: 20px;
    border: 1px solid var(--main-color);
    cursor: pointer;
    position: relative;
    flex-shrink: 0;

    &_add {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed var(--main-color);

        .app-card__delete {
            display: none;
        }
    }

    &__add-card {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__add-new {
        width: 100%;
        padding: 10px 15px;
        background: transparent;
        border: 1px dashed var(--main-color);
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: color 0.3s ease;
        text-transform: uppercase;

        i {
            display: block;
            margin-right: 10px;
        }

        @media (any-hover: hover) {
            &:hover {
                color: var(--main-color);
            }
        }
    }

    &__default {
        &-nav {
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }

        &-btn {
            background: transparent;
            border: none;
            transition: color 0.3s ease;
            cursor: pointer;
            padding: 5px;

            i {
                display: block;
            }

            @media (any-hover: hover) {
                &:hover {
                    color: var(--main-color);
                }
            }

            &_favorite {
                color: gold;

                @media (any-hover: hover) {
                    &:hover {
                        color: gold;
                    }
                }
            }
        }
    }
}
</style>