<template>
    <img :src="computedImage" :alt="alt || '默认的图片'">
</template>

<script setup>
import { ref,computed  } from "vue"
const props = defineProps({
    Image: {
        type: String,
        required: false,
    },
    defaultImage: {
        type: String,
        required: false
    },
    alt: {
        type: String,
        required: false
    }
})
    const computedImage = computed(() => {
    return props.Image || props.defaultImage || '@/assets/img/defaultImage.png';
});
</script>

<style lang="scss" scoped></style>
