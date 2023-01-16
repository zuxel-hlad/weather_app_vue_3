<template lang="pug">
app-header
main
    .container
        router-view
</template>

<script>
import appHeader from "./components/app-header.vue";
export default {
    name: "App",
    components: {
        appHeader,
    },
};
</script>

<style lang="scss" scoped>
</style>
