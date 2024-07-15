<template>
  <el-button @click="req_bvids">req_bvids</el-button>

  <el-upload
      multiple
      action=""
      accept=".json"
      :on-success="handleFileChange"
      :show-file-list="false"
  >
    <el-button type="primary">上传 bvid json</el-button>
  </el-upload>

  <el-upload
      multiple
      action=""
      accept=".json"
      :on-success="handleFileChangePage"
      :show-file-list="false"
  >
    <el-button type="primary">上传 page json</el-button>
  </el-upload>

  <el-button type="primary" :icon="Download" size="mini" @click="exportData()">导出</el-button>

  <el-upload
      multiple
      action=""
      accept=".json"
      :on-success="importData"
      :show-file-list="false"
  >
    <el-button type="primary">导入</el-button>
  </el-upload>
</template>

<script setup>
import {sendMessageToContentScript} from "@/src/utils/content.js";

import {useTreeStore} from '@/src/stores/tree.js';
import newDB from "@/src/utils/db.js";
import {bvid_json2item, get_save_mid_bvids, page_json2item} from "@/src/utils/bili.js";
import {Download} from "@element-plus/icons-vue";
import {saveAs} from 'file-saver'

let db = newDB()
let id_obj = {}
const treeStore = useTreeStore();

const getCheckedNodes = () => {
  const checkedNodes = treeStore.getCheckedNodes();
  checkedNodes.forEach(node => console.log(node.id))
  // console.log('Checked Nodes:', checkedNodes);
};

const handleFileChange = async (_, file) => {
  // console.log(file)
  let json_str = await file.raw.text()
  let json_obj = JSON.parse(json_str);
  let items = bvid_json2item(json_obj)
  console.log(`每 bvid 下 cid 数：${items.length}`)
  items.forEach(item => {
    db.bili.put(item)
  })
}

const handleFileChangePage = async (_, file) => {
  // console.log(file)
  let json_str = await file.raw.text()
  let json_obj = JSON.parse(json_str);
  // console.log(json_obj)
  let {mid, bvids} = page_json2item(json_obj);
  console.log(bvids.size)
  if (id_obj.hasOwnProperty(mid)) {
    bvids = id_obj[mid].union(bvids)
  }
  id_obj[mid] = bvids
}

function exportData() {
  console.log('exportData...')
  console.log(id_obj)
  let id_map = {}
  for(let mid of Object.keys(id_obj)) {
    let bvids = {}
    id_obj[mid].forEach(bvid => {
      bvids[bvid] = 1
    })
    id_map[mid] = {bvids}
  }
  // let data = {
  //   test: 't',
  // }
  //
  let blob = new Blob([JSON.stringify(id_map)], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "id_map.json");
}

const importData = async (_, file) => {
  // console.log(file)
  let json_str = await file.raw.text()
  let json_obj = JSON.parse(json_str);
  console.log(json_obj)
  for (let mid of Object.keys(json_obj)) {
    get_save_mid_bvids(mid, json_obj[mid].bvids)
  }
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


          db.bili.put(rows[i])
          // chrome.storage.local.set({[bvid]: res}, function () {
          //   console.log('保存成功！');
          // });
        });
  })


  // console.log('Checked Nodes:', checkedNodes);

  // 读取数据，第一个参数是指定要读取的key以及设置默认值
  // chrome.storage.local.get(['bvids'], function(res) {
  //   // console.log(res);
  //   for (let bvid of res.bvids) {
  //     // fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`)
  //     //     .then((response) => response.json())
  //     //     .then((data) => console.log(data));
  //
  //     sendMessageToContentScript({cmd: 'fetchData', val: `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`},
  //         function (res) {
  //           console.log('来自content的回复：', res);
  //           chrome.storage.local.set({[bvid]:res}, function() {
  //             console.log('保存成功！');
  //           });
  //         });
  //   }
  // });
}
</script>
