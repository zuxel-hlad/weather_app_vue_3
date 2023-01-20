<template lang="pug">
section.error
    h1.error__title {{ $t('error.title') }}
    p.error__description {{ $t('error.description') }}
    router-link.error__back(to="/weather") Go to main page
</template>

<script>
export default {
    name: "error",
};
</script>

<style scoped lang="scss">
.error {
    text-align: center;

    &__descriprion {
        font-size: 24px;
    }

    &__back {
        text-decoration: none;
        background-color: #fff;
        padding: 5px;
        border-radius: 4px;
        border: 1px solid var(--main-color);
        transition: color 0.3s ease, background-color 0.3s ease;

        @media (any-hover: hover) {
            &:hover {
                color: var(--main-color);
            }
        }

        &:active {
            background-color: var(--main-color);
            color: #fff;
        }
    }
}

@media screen and (max-width: 414px) {
    .error {
        &__title {
            font-size: 24px;
        }

        &__description {
            font-size: 16px;
        }

        &__back {
        }
    }
}
</style>