<template lang="pug">
.modal(v-if="modelValue", @click="$emit('update:modelValue', false)")
    .modal-content(@click.stop)
        button.modal-content__close(
            type="button",
            @click="$emit('update:modelValue', false)"
        )
            i.fa-solid.fa-circle-xmark
        slot
</template>

<script>
export default {
    name: "app-modal",
    props: {
        modelValue: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
};
</script>

<style scoped lang="scss">
@keyframes show {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.modal {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0%, 0%, 0%, 80%);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: show 0.3s ease-out;

    &-content {
        position: relative;
        padding: 40px 30px;
        border-radius: 12px;
        background: #fff;
        width: 100%;
        max-width: 440px;

        &__close {
            position: absolute;
            right: 0;
            top: 0;
            padding: 0;
            margin: 0;
            background: transparent;
            border: none;
            padding: 10px;

            i {
                display: block;
                font-size: 20px;
                cursor: pointer;
                transition: color 0.3s ease;

                @media (any-hover: hover) {
                    &:hover {
                        color: var(--main-color);
                    }
                }
            }
        }
    }
}
</style>