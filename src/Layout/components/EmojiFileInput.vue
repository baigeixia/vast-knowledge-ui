<template>
        <EmojiPicker :group-names="groupnamesZh" :hide-search="true" class="emoji-file-input" :display-recent="true" @click="emitEmojiClick" :native="true" :disable-skin-tones="true" @select="onSelectEmoji" />
</template>
  
<script setup>
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import { defineEmits , ref } from 'vue';

const selectedEmoji = ref(null);
const emit = defineEmits(['emoji-click'])

const groupnamesZh={
  smileys_people: "笑脸与人",
  animals_nature: "动物与自然",
  food_drink: "食物与饮料",
  activities: "活动",
  travel_places: "旅行地点",
  objects: "物体",
  symbols: "符号",
  flags: "旗帜",
  recent: "最近使用"
}

const emitEmojiClick=()=>{
    if (selectedEmoji.value) {
        emit('emoji-click', selectedEmoji.value);
        selectedEmoji.value=null
      }
}

function onSelectEmoji(emoji) {
    if(emoji){
        console.log('emoji',emoji)
        selectedEmoji.value = emoji;
    }
}

</script>
  
<style lang="scss" scoped>
.emoji-file-input{
    width: 100%;
}

:deep(.v3-header) {
        .v3-spacing {
            display: none;
        }

        // .v3-search {
        //     display: none;
        // }
    }

    :deep(.v3-body) {
        .v3-sticky {
            display: none;
        }

        .v3-body-inner{
            .v3-group{
                margin-bottom: 10px ;
                padding-bottom: 10px ;
                border-bottom: 1px solid #c1c1c2 ;
            }
           
        }
    }

    :deep(.v3-footer) {
        display: none;
    }
</style>
  