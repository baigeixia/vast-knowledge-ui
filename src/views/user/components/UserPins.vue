<template>
  <div class="">UserPins</div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
const props = defineProps({
    userid: {
        type: String,
        required: true,
        default: ''
    }
})


const pageTitle = ref('动态');
onMounted(() => {
  console.log(props.userid);
  document.title = pageTitle.value;
});
</script>
  
<style lang="scss" scoped></style>
  