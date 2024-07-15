<template>
  <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">

  <el-button type="primary" :icon="Download" size="mini" @click="exportData()">导出</el-button>

  <el-form ref="searchObjRef" style="max-width: 600px" :model="searchObj" status-icon :rules="rules"
           label-width="auto" class="demo-ruleForm">
    <el-form-item label="分段视频名称">
      <el-input v-model="searchObj.name"/>
    </el-form-item>
    <el-form-item>
      <!-- <el-button type="primary" @click="submitForm(searchObjRef)">Submit</el-button>
      <el-button @click="resetForm(searchObjRef)">Reset</el-button> -->
      <el-button type="primary" :icon="Search" size="mini" @click="fetchData()">搜索</el-button>
      <el-button :icon="Refresh" size="mini" @click="resetData">重置</el-button>
    </el-form-item>
  </el-form>


  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="name" label="name" width="100"/>
    <el-table-column prop="mid" label="mid" width="100"/>
    <el-table-column prop="bvid" label="bvid" width="150"/>
    <el-table-column prop="cid" label="cid" width="100"/>
    <el-table-column prop="url" label="url" width="350"/>
    <el-table-column prop="page" label="page" width="100"/>
    <el-table-column prop="view" label="view" width="100"/>
    <el-table-column prop="duration" label="duration" width="100"/>
    <el-table-column prop="part" label="part" width="350"/>
  </el-table>

  <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
                 :page-sizes="[10, 20, 50, 100, 200, 500, 1000]" :small="small" :disabled="disabled"
                 :background="background"
                 layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"/>

</template>

<script setup>

import {reactive, ref} from 'vue'
import {Delete, Edit, Search, Refresh, Share, Upload, Download} from '@element-plus/icons-vue'
import {saveAs} from 'file-saver'

import ExcelJS from 'exceljs'

import newDB from '../utils/db.js'

const searchObjRef = ref()

let total = ref()

let tableData = ref([])

let currentPage4 = ref(1)
let pageSize4 = ref(10)

let db = newDB()

let searchObj = ref({
  name: '',
  mid: '',
  bvid: '',
  part: '',
})

async function handleClick(e) {
  const files = e.target.files
  const rawFile = files[0] // only use files[0]
  if (!rawFile) return
  console.log(rawFile)
  await upload(rawFile)
  // this.import(rawFile)
}

async function exportData() {
  console.log('exportData...')


  const collection = db.bili

  const res = await collection.toArray();

  console.log(res.length)
  console.log(res)

  // let data = {
  //   test: 't',
  // }
  let blob = new Blob([JSON.stringify(res)], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "bili.json");
}

async function upload(file) {
  try {
    let buffer = new Uint8Array(await file.arrayBuffer());

    const workbook = new ExcelJS.Workbook();
    const worksheet = await workbook.xlsx.load(buffer);

    let worksheets = worksheet.worksheets

    let excel = {}

    worksheets.forEach(sheet => {
      if (sheet.rowCount > 1) {
        excel[sheet.name] = get_json_by_sheet(sheet)
      }
    })

    console.log(excel)

    for (let key in excel) {
      console.log(key)
      let rows = excel[key]
      for (let i = 0; i < rows.length; i++) {
        // console.log(rows[i])
        await db.bili.put(rows[i])
      }
    }

  } catch (msg) {
    alert(msg);
  } finally {
    // modal.close();
  }
}

function get_json_by_sheet(worksheet) {
  let json = []
  // console.log(worksheet)
  worksheet.eachRow(function (row, rowNumber) {
    // console.log(rowNumber)
    if (rowNumber > 1) {
      let el = row.values

      let name = el[0 + 1]
      let mid = el[1 + 1]
      let bvid = el[2 + 1]
      let cid = el[3 + 1]
      let url = el[4 + 1]
      let page = el[5 + 1]
      let view = el[6 + 1]
      let duration = el[7 + 1]
      let part = el[8 + 1]

      let item = {
        cid,
        bvid,
        mid,
        name,

        url,
        page,

        view,

        duration,
        part,
      }
      // console.log(item)
      json.push(item)
      // console.log(json)
    }
    // console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
  });
  //   console.log(json)
  return json
}

async function fetchData() {
  tableData.value = await filter(searchObj.value.name, currentPage4.value, pageSize4.value)
}

async function filter(word, page, limit) {
  console.log(word)
  const collection = db.bili
      .orderBy('view')
      .filter((item) => item.part.includes(word));
  // console.log(collection)

  const res = await collection.toArray();

  total.value = res.length

  const result = await collection.reverse().offset((page - 1) * limit).limit(limit).toArray();

  console.log(result)
  return result
}


// const submitForm = () => {
//     fetchData()
// }

const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)

  fetchData()
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)

  fetchData()
}

</script>
