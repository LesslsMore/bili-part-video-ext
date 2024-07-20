import ExcelJS from "exceljs";
import {db_name, db_obj} from "@/src/utils/db.js";

async function export_excel() {
    let tb_name = 'cids'
    console.log('export_excel...')
    console.log(new Date())
    const res = await db_obj[db_name][tb_name].toArray();

    res.sort((a, b) => {
        if (a.view != b.view) {
            return b.view - a.view
        } else {
            return a.page - b.page;
        }
    });

    console.log(res.length)
    const keys = ['name', 'mid', 'bvid', 'cid', 'url', 'page', 'view', 'duration', 'part']; // 指定字段的顺序
    const widths = [10, 10, 12, 10, 45, 4, 8, 8, 45]
    const columns = []
    for (let i = 0; i < keys.length; i++) {
        columns.push({header: keys[i], key: keys[i], width: widths[i] * 1.2})
    }
    await exportToExcel(res, db_name, tb_name, columns)
    console.log(new Date())
}

async function exportToExcel(jsonData, db_name, tb_name, columns) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(tb_name);

    // 添加列
    // 添加列，按照指定的顺序
    worksheet.columns = columns;

    // 添加行
    jsonData.forEach(record => {
        worksheet.addRow(record);
    });

    // 生成 Excel 文件并下载
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    saveAs(blob, `${db_name}.xlsx`);
}


async function import_excel(_, file) {
    console.log('import_excel:')
    console.log(new Date())
    let json = await readXlsxFile(file.raw)
    await importToIndexedDB(json)
    console.log(new Date())
}

async function importToIndexedDB(excel_json) {
    for (const [key, value] of Object.entries(excel_json)) {
        await db_obj[db_name][key].bulkPut(value)
    }
}

async function readXlsxFile(file) {
    let buffer = new Uint8Array(await file.arrayBuffer());

    const workbook = new ExcelJS.Workbook();
    const worksheet = await workbook.xlsx.load(buffer);

    let worksheets = worksheet.worksheets

    let excel = {}

    worksheets.forEach(worksheet => {
        if (worksheet.rowCount > 1) {
            let json = []
            let headers
            worksheet.eachRow(function (row, rowNumber) {
                if (rowNumber === 1) {
                    // Assume the first row is the header
                    headers = row.values.slice(1);
                }
                if (rowNumber > 1) {
                    const item = {}
                    headers.forEach((head, index) => {
                        item[head] = row.values[index + 1]
                    })
                    json.push(item)
                }
            });
            excel[worksheet.name] = json
        }
    })
    return excel
}

export {export_excel, import_excel}
