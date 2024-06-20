<template>
    <div class="emoji-file-input">
        <EmojiPicker :native="true" :disable-skin-tones="true" @select="onSelectEmoji" />
    </div>
</template>
  
<script setup>
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

function onSelectEmoji(emoji) {
    console.log(emoji)
    /*
      // result
      { 
          i: "😚", 
          n: ["kissing face"], 
          r: "1f61a", // with skin tone
          t: "neutral", // skin tone
          u: "1f61a" // without tone
      }
      */
}
</script>
  
<style lang="scss" scoped>
// .emoji-file-input {
//     background-color: #000;
// }

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
  