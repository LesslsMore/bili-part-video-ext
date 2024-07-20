import Dexie from 'dexie'
import {exportDB, importDB} from "dexie-export-import"
import {saveAs} from 'file-saver'

const db_name = 'bili'

const db_schema = {
    vlist: '&bvid, mid',
    bvids: '&bvid',
    cids: '&cid, bvid, mid, view', // 主键 索引
}

const db_names = [37974444, 302417610]

// 原始数据
const db_schemas = {
    pages: '&pn',
}

const db_obj = {
    [db_name]: get_db(db_name, db_schema)
}

db_names.forEach(mid => {
    db_obj[mid] = get_db(mid, db_schemas)
})

function get_db(db_name, db_schema, db_ver = 1) {
    let db = new Dexie(db_name)
    // 默认版本为从 1 开始
    db.version(db_ver).stores(db_schema)
    return db
}

// 导出 indexeddb 数据
async function export_db() {
    console.log('export_db:')
    console.log(new Date())
    let databases = await Dexie.getDatabaseNames()
    console.log(databases)
    for (const database of databases) {
        console.log(database)
        const blob = await exportDB(db_obj[database]);
        // console.log(blob)
        saveAs(blob, `IndexedDB_${database}.json`);
    }
    console.log(new Date())
}

// 导入 indexeddb 数据
// const import_db = async (_, file) => {
async function import_db(_, file) {
    console.log('import_db:')
    console.log(new Date())
    await importDB(file.raw);
    console.log(new Date())
}

export {get_db, export_db, import_db, db_name, db_schema, db_names, db_schemas, db_obj}
