<template lang="pug">
.confirm-popup
    h3.confirm-popup__message {{ settings.title }}
    p.confirm-popup__descriprion(v-if="settings.description") {{ settings.description }}
    .confirm-popup__btns
        button.confirm-popup__btn(type="button", @click="$emit('confirm')") ok
        button.confirm-popup__btn(
            v-if="settings.type !== 'warning'",
            type="button",
            @click="$emit('cancel')"
        ) cancel
</template>

<script>
export default {
    name: "app-alert",
    emits: ["confirm", "cancel"],
    props: {
        settings: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
};
</script>

<style scoped lang="scss">
.confirm-popup {
    &__message {
        text-align: center;
    }

    &__descriprion {
        text-align: center;
    }

    &__btns {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
    }

    &__btn {
        border: 1px solid var(--main-color);
        border-radius: 4px;
        padding: 5px;
        min-width: 70px;
        text-align: center;
        cursor: pointer;
        font-size: 12px;
        line-height: 100%;
        font-weight: 500;
        background-color: #fff;
        transition: background-color 0.3s ease, color 0.3s ease;
        text-transform: uppercase;

        @media (any-hover: hover) {
            &:hover {
                background-color: var(--main-color);
                color: #fff;
            }
        }
    }
}
</style>