<template>
  test
  <el-button @click="addmid()">addmid</el-button>
  <el-button @click="getmids()">getmids</el-button>
  <el-button @click="get_vlist">get_vlist</el-button>
  <el-button @click="req_bvids()">req_bvids</el-button>

  <el-button @click="test_cors()">test_cors</el-button>

  <el-button @click="openBili()" type="primary">bili.html</el-button>
</template>

<script setup>
import {sendMessageToContentScript} from "@/src/utils/content.js";

import {useTreeStore} from '@/src/stores/tree.js';
import {get_save_mid_up} from "@/src/utils/bili.js";
import {db_bili} from "@/src/utils/db.js";

const treeStore = useTreeStore();

// let mid_map = {
//   {mid: pn}
// }

function addmid() {
  console.log('addmid...')
  sendMessageToContentScript({cmd: 'addmid', value: '添加 up 主 mid'},
      ({mid, pn}) => {
        console.log('来自content的回复：', mid, pn);
        get_save_mid_up(mid, pn)
      });
}

function get_vlist() {
  console.log('get_vlist...')
  sendMessageToContentScript({cmd: 'get_vlist'},
      async (vlist) => {
        console.log('来自content的回复: ', vlist);
        const existingKeys = await db_bili.vlist.orderBy('bvid').primaryKeys();
        const newDataList = vlist.filter(item => !existingKeys.includes(item.bvid));
        console.log(newDataList.length)
        await db_bili.vlist.bulkAdd(newDataList)
      });
}

async function getmids() {
  console.log('getmids...')
  let {id_map} = await chrome.storage.local.get('id_map')
  console.log(id_map)
}


function req_bvids() {
  console.log('req_bvids...')
  const checkedNodes = treeStore.getCheckedNodes();
  checkedNodes.forEach(node => {
    let bvid = node.id
    let url = `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`
    console.log(url)
    sendMessageToContentScript({cmd: 'fetchData', val: url},
        function (res) {
          console.log('来自content的回复：', res);
          // chrome.storage.local.set({[bvid]: res}, function () {
          //   console.log('保存成功！');
          // });
        });
  })
}

function test_cors() {
  // fetch(`https://api.bilibili.com/x/web-interface/view?bvid=BV13T421k794`)
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch(error => console.log('error', error));

  sendMessageToContentScript({
    cmd: 'fetchData',
    val: `https://api.bilibili.com/x/web-interface/view?bvid=BV13T421k794`
  }, function (res) {
    console.log('来自content的回复：', res);
  });
}

function openBili() {
  window.open('bili.html', '_blank');
}
</script>


