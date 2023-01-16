<template lang="pug">
.spinner
    .spinner__image
        img(src="../assets/svg/preloader.svg", alt="loader")
</template>

<script>
export default {
    name: "app-spinner",
};
</script>

<style scoped lang="scss">
.spinner {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

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