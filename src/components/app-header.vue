<template lang="pug">
header.header
    span.header__brand Weather App
    header.header-nav
        select#swich-lang.header-nav__switch-lang(@change="switchLang")
            option(value="en", :selected="$i18n.locale === 'en'") en
            option(value="ru", :selected="$i18n.locale === 'ru'") ru
        router-link.header-nav__link(
            v-if="$route.name === 'favorites'",
            to="/"
        ) {{ $t('header.main') }}
        router-link.header-nav__link(
            v-if="$route.name === 'weather'",
            to="/favorites"
        ) {{ $t('header.favorites') }}
</template>

<script>
export default {
    name: "app-header",
    created() {
        const lang = localStorage.getItem("lang");
        if (lang) {
            this.$i18n.locale = lang;
        }
    },
    methods: {
        switchLang(e) {
            console.log(e.target.value);
            this.$i18n.locale = e.target.value;
            localStorage.setItem("lang", this.$i18n.locale);
        },
    },
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