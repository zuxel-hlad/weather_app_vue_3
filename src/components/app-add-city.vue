<template lang="pug">
form.add-form(@submit.prevent.enter="addNewItem")
    h3.add-form__title {{ $t('searchCityForm.title') }}
    label(for="cities-list") {{ $t('searchCityForm.description') }}
    input#cities-list(
        list="cities",
        name="cities-list",
        @input="city = $event.target.value"
    )

    datalist#cities
        option(
            v-for="(city, idx) in defaultCities", 
            :key="idx", :value="city"
            )
    span.add-form__not-found {{ responseStatus }}
    button.add-form__submit(type="submit") {{ $t('searchCityForm.btn') }}
</template>

<script>
export default {
    name: "app-add-city",
    emits: ["update:modelValue"],
    props: {
        modelValue: {
            type: String,
            required: false,
            default: "",
        },
        responseStatus: {
            type: String,
            required: false,
            default: "",
        },
    },
    data() {
        return {
            city: "",
        };
    },

    computed: {
        //List of default cities.
        defaultCities() {
            return [
                this.$t("defaultCitiesList.kharkiv"),
                this.$t("defaultCitiesList.kherson"),
                this.$t("defaultCitiesList.kyiv"),
                this.$t("defaultCitiesList.sumy"),
                this.$t("defaultCitiesList.kremenchuk"),
                this.$t("defaultCitiesList.ternopil"),
            ];
        },
    },

    methods: {
        //A function that raises a value from an input.
        addNewItem(e) {
            if (!this.city) return false;
            this.$emit("update:modelValue", this.city.toLowerCase());
            this.city = "";
            e.target.reset();
        },
    },
};
</script>

<style scoped lang="scss">
.add-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 30px;

    label {
        margin-bottom: 10px;
        font-weight: 500;
    }

    input {
        width: 100%;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid var(--main-color);
        margin-bottom: 10px;
    }

    &__not-found {
        display: block;
        color: red;
    }

    &__submit {
        display: block;
        margin: 0 0 0 auto;
        font-size: 16px;
        font-weight: 400;
        padding: 5px;
        border-radius: 4px;
        line-height: 100%;
        border: 1px solid var(--main-color);
        cursor: pointer;
        background-color: #fff;
        transition: background-color 0.3s ease, color 0.3s ease;
        text-transform: uppercase;
        text-align: center;

        @media (any-hover: hover) {
            &:hover {
                background-color: var(--main-color);
                color: #fff;
            }
        }
    }
}
</style>