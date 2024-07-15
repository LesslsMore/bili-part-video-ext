<template>
  <div class="layout_left">
    <el-button @click="getCheckedNodes">get by node</el-button>
    <el-button @click="getCheckedKeys">get by key</el-button>
    <el-tree
        ref="treeRef"
        style="max-width: 600px"
        default-expand-all
        show-checkbox
        :data="id_tree"
        :props="defaultProps"
        @check-change="updateCheckedNodes"
    >
    </el-tree>
  </div>

</template>
<script setup name="Left">

import {ref} from "vue";

import {useTreeStore} from '@/src/stores/tree.js';
import {mid_map2tree} from "@/src/utils/bili.js";

const treeStore = useTreeStore();

let id_tree = ref()
const treeRef = ref()

chrome.storage.local.get('id_map', function ({id_map}) {
  console.log(id_map)
  let tree = mid_map2tree(id_map)
  id_tree.value = tree
})


chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
    if (key === 'id_map') {
      console.log('new value is: ', newValue)
      let tree = mid_map2tree(newValue)
      console.log(tree)
      id_tree.value = tree
    }
  }
  // if (area === 'sync' && changes.options?.newValue) {
  //   const debugMode = Boolean(changes.options.newValue.debug);
  //   console.log('enable debug mode?', debugMode);
  //   setDebugMode(debugMode);
  // }
});

const updateCheckedNodes = () => {
  if (treeRef.value) {
    treeStore.setCheckedNodes(treeRef.value.getCheckedNodes(true));
  }
};

const getCheckedNodes = () => {
  console.log(treeRef.value.getCheckedNodes(true))
}
const getCheckedKeys = () => {
  console.log(treeRef.value.getCheckedKeys(false))
}

const defaultProps = {
  children: 'children',
  label: 'id',
}

</script>

<style scoped lang="scss">
.layout_left {
  position: absolute;
  width: $base-menu-width;
  height: 100vh;
  top: $base-tabbar-height;
  background: #d1dbe5;

  .scrollbar {
    width: 100%;
    height: calc(100vh - $base-menu-logo-height);
  }
}
</style>
