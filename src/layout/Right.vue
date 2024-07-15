<script setup lang="ts">

</script>

<template>
  <div class="layout_right">
    right
  </div>
</template>

<style scoped lang="scss">
.layout_right {
  position: absolute;
  width: $base-menu-width;
  height: 100vh;
  left: calc(100% - $base-menu-width);
  top: $base-tabbar-height;
  background: #d1dbe5;

}
</style>
