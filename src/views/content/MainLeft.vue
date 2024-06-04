<template>
  <div class="index-container">

 
  <div class="side-wrapper">
    <div class="item-wrap">
      <div class="item-content">
        left
      </div>

    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from "vue"
</script>

<style lang="scss" scoped>
.index-container{
  width: 180px;
  position: sticky;
  top: 80px;
  margin-right: 20px;
  height: fit-content;
  border-radius: 4px;
  background-color: #ffff;
  max-height: calc(100vh - 101px);
  overflow-x: hidden;
  
.side-wrapper {
  min-width: 180px;
  box-sizing: border-box;
  padding: 8px;
  font-size: 16px;
  color: #000;

  .item-wrap {
    display: flex;
    flex-direction: column;

    .item-content {
      line-height: 24px;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }
}
}


</style>
