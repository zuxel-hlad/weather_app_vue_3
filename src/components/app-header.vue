<template lang="pug">
header.header
    span.header__brand Weather App
    header.header-nav
        router-link.header-nav__link(
            v-if="!$route.path.includes('weather')",
            to="/"
        ) Main
        router-link.header-nav__link(
            v-if="$route.path.includes('weather')",
            to="/favorites"
        ) Favorite cities
</template>

<script>
export default {
    name: "app-header",
};
</script>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    border-bottom: 1px solid var(--main-color);

    &__brand {
        display: block;
        font-size: 24px;
        font-weight: 600;
    }

    &-nav {
        &__link {
            display: inline-block;
            padding: 20px;
            text-decoration: none;
            color: #000;
            font-weight: 500;
            transition: color 0.3s ease;

            &.active {
                color: var(--main-color);
            }

            @media (any-hover: hover) {
                &:hover {
                    color: var(--main-color);
                }
            }
        }
    }
}
</style>