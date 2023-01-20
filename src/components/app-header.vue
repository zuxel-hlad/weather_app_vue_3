<template lang="pug">
header.header
    .container
        .header__wrapper
            a.header__brand(href="#") Weather App
            button.header__burger(
                :class="{ header__burger_active: burgerActive }",
                @click="burgerActive = !burgerActive"
            )
                span
                span
                span
            .header-nav(:class="{ 'header-nav_active': burgerActive }")
                a.header__brand.header__brand_mobile(href="#") Weather App
                select#swich-lang.header-nav__switch-lang(@change="switchLang")
                    option(value="en", :selected="$i18n.locale === 'en'") en
                    option(value="ru", :selected="$i18n.locale === 'ru'") ru
                router-link.header-nav__link(
                    v-if="$route.name === 'favorites' || $route.name === 'error' || $route.name === 'not-found'",
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
    data() {
        return {
            burgerActive: false,
        };
    },
    //get current lnguage from localStorage if it is there.
    created() {
        const lang = localStorage.getItem("lang");
        if (lang) {
            this.$i18n.locale = lang;
        }
    },
    methods: {
        //change local language
        switchLang(e) {
            this.$i18n.locale = e.target.value;
            localStorage.setItem("lang", this.$i18n.locale);
        },
    },
};
</script>

<style scoped lang="scss">
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    background-color: #fff;
    border-bottom: 1px solid var(--main-color);

    &__wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__burger {
        position: absolute;
        width: 30px;
        height: 20px;
        top: 50%;
        transform: translateY(-50%);
        right: 20px;
        background: #fff;
        display: flex;
        justify-self: center;
        flex-wrap: wrap;
        align-content: space-between;
        padding: 0;
        border: none;
        display: none;

        span {
            transition: transform 0.3s ease, opacity 0.3s ease;
            display: block;
            width: 100%;
            height: 3px;
            background: #000;
            border-radius: 4px;
        }

        &_active {
            z-index: 2;
            transform-origin: center;
            span {
                &:nth-child(1) {
                    transform: rotate(45deg) translate(4px, 8px);
                }
            }
            span {
                &:nth-child(2) {
                    opacity: 0;
                }
            }
            span {
                &:nth-child(3) {
                    transform: rotate(-45deg) translate(4px, -9px);
                }
            }
        }
    }

    &__brand {
        display: block;
        font-size: 24px;
        font-weight: 600;
        text-decoration: none;

        &_mobile {
            display: none;
        }
    }

    &-nav {
        &__link {
            display: inline-block;
            padding: 20px 0 20px 20px;
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

        &__switch-lang {
            cursor: pointer;
            padding: 5px;
            border: none;
            outline: 1px solid transparent;
            background-color: #fff;
            order: 3;
            padding: 20px 0;
            margin-top: auto;
        }
    }
}

@media screen and (max-width: 576px) {
    .header {
        &__brand {
            width: max-content;
            margin: 12px 0;
            &_mobile {
                display: block;
                margin: 0;
            }
        }

        &__burger {
            display: flex;
        }

        &-nav {
            padding: 20px;
            position: fixed;
            top: 0;
            right: 0;
            width: 50%;
            height: 100%;
            background: #fff;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            right: -100%;
            transition: right 0.3s ease;

            &__switch-lang {
                border-radius: 50%;
                background-color: var(--main-color);
                width: 50px;
                height: 50px;
                padding: 0;
            }

            &__link {
                padding: 20px 20px 20px 0;
                width: max-content;
            }

            &_active {
                right: 0;
            }
        }
    }
}

@media screen and (max-width: 440px) {
    .header {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 15px;

        &__brand {
            font-size: 20px;
            font-weight: 600;
        }

        &-nav {
            width: 100%;
        }
    }
}
</style>