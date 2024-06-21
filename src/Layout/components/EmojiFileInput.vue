<template>
    <div class="emoji-file-input" @click="emitEmojiClick">
        <EmojiPicker :native="true" :disable-skin-tones="true" @select="onSelectEmoji" />
    </div>
</template>
  
<script setup>
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import { defineEmits , ref } from 'vue';

const selectedEmoji = ref(null);
const emit = defineEmits(['emoji-click'])

const emitEmojiClick=()=>{
    if (selectedEmoji.value) {
        // 通过 $emit 触发 'emoji-click' 事件，并传递选中的 emoji
        emit('emoji-click', selectedEmoji.value);
      }
}
function onSelectEmoji(emoji) {
    console.log('emoji',emoji)
    selectedEmoji.value = emoji;
}

</script>
  
<style lang="scss" scoped>

:deep(.v3-header) {
        .v3-spacing {
            display: none;
        }

        .v3-search {
            display: none;
        }
    }

    :deep(.v3-body) {
        .v3-sticky {
            display: none;
        }
    }

    :deep(.v3-footer) {
        display: none;
    }
</style>
  