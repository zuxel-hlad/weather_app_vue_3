<template lang="pug">
form.add-form(@submit.prevent="addNewItem")
    h3.add-form__title Enter the name of the city
    label(for="cities-list") Choose the city:
    input#cities-list(
        list="cities",
        name="cities-list",
        @input="city = $event.target.value"
    )

    datalist#cities
        option(v-for="(city, idx) in cities", 
        :key="idx", 
        :value="city"
        )
    button.add-form__submit(type="submit") submit
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
        cities: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
    data() {
        return {
            city: "",
        };
    },

    methods: {
        addNewItem(e) {
            if (!this.city) return false;
            this.$emit("update:modelValue", this.city);
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

    &__submit {
        display: block;
        margin: 0 0 0 auto;
        font-size: 16px;
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