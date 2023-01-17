<template lang="pug">
.spinner(:class="customClass")
    .spinner__image
        img(src="../assets/svg/preloader.svg", alt="loader")
</template>

<script>
export default {
    name: "app-spinner",
    props: {
        customClass: {
            type: String, Array,
            required: false,
            default: ''
        }
    }
};
</script>

<style scoped lang="scss">
.spinner {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;

    &__image {
        width: 200px;
        height: 200px;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>