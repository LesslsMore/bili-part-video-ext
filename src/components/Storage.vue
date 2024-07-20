<template>
  <el-upload
      multiple
      action=""
      accept=".json"
      :on-success="import_json_bvids"
      :show-file-list="false"
  >
    <el-button :icon="Upload" type="primary">上传 bvids json</el-button>
  </el-upload>

  <el-upload
      multiple
      action=""
      accept=".json"
      :on-success="import_json_pages"
      :show-file-list="false"
  >
    <el-button :icon="Upload" type="primary">上传 pages json</el-button>
  </el-upload>

  <el-button @click="pages2vlist">pages2vlist</el-button>
  <el-button @click="vlist2bvids">vlist2bvids</el-button>
  <el-button @click="bvids2cids">bvids2cids</el-button>

  <el-upload
      multiple
      action=""
      accept=".json"
      :on-success="import_db"
      :show-file-list="false"
  >
    <el-button :icon="Upload" type="primary">import_db</el-button>
  </el-upload>
  <el-button :icon="Download" @click="export_db">export_db</el-button>

  <el-upload
      action=""
      accept=".xlsx, .xls"
      :on-success="import_excel"
      :show-file-list="false"
  >
    <el-button :icon="Upload" type="primary">import_excel</el-button>
  </el-upload>
  <el-button :icon="Download" @click="export_excel()">export_excel</el-button>


</template>

<script setup>
import {Delete, Edit, Search, Refresh, Share, Upload, Download} from '@element-plus/icons-vue'
import {export_db, import_db} from "@/src/utils/db.js";
import {export_excel, import_excel} from "@/src/utils/excel.js";
import {bvids2cids, import_json_bvids, import_json_pages, pages2vlist, vlist2bvids} from "@/src/utils/db_bili.js";
</script>
