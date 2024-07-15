<template>
    <div>
      <input type="file" @change="handleFileChange">
      <ag-grid-vue style="width: 100%; height: 500px;" class="ag-theme-alpine" :gridOptions="gridOptions"></ag-grid-vue>
    </div>
    <div class="app-container">
        mongodb
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  createGrid,
} from "ag-grid-community";
// import "ag-grid-charts-enterprise";
import * as XLSX from 'xlsx';

export default defineComponent({
    components: {
        AgGridVue,
    },
    setup() {
        const gridOptions = ref({
            columnDefs: [],
            rowData: [],
        });

        const handleFileChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const rowData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                    const columnDefs = rowData[0].map(col => ({ headerName: col }));
                    rowData.splice(0, 1);
                    gridOptions.value.columnDefs = columnDefs;
                    gridOptions.value.rowData = rowData;
                };
                reader.readAsBinaryString(file);
            }
        };

        return {
            gridOptions,
            handleFileChange,
        };
    },
});
</script>