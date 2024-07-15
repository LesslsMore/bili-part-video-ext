<template>
  <div class="layout_header">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
    >
      <el-menu-item index="1">storage</el-menu-item>
      <el-menu-item index="2">indexed</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup name="Head">
import {useRouter} from "vue-router";
import {ref} from "vue";

const router = useRouter()

const activeIndex = ref('2')
const handleSelect = (key, keyPath) => {
  if (key === '1') {
    router.push({name: 'storage'})
  } else if (key === "2") {
    router.push({name: 'indexed'})
  }
}
</script>


<style scoped lang="scss">
.layout_header {
  position: absolute;
  width: 100%;
  height: $base-tabbar-height;
  background: #8d8d8d;
}
</style>
