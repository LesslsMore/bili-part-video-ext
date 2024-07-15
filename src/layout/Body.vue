<template>
  <div class="layout_main">
    <RouterView></RouterView>
  </div>
</template>

<script setup>

import {RouterView} from "vue-router";


</script>

<style scoped lang="scss">
.layout_main {
  position: absolute;
  width: calc(100% - $base-menu-width * 2);
  height: calc(100vh - $base-tabbar-height);
  left: $base-menu-width;
  top: $base-tabbar-height;
  //padding: 20px;
  overflow: auto;
  transition: all 0.3s;

  &.fold {
    width: calc(100vw - $base-menu-min-width);
    left: $base-menu-min-width;
  }

}
</style>
