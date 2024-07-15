// import XLSX from 'xlsx'

// import Dexie from './vendor/dexie.js';

// import Dexie from "https://unpkg.com/dexie@latest/dist/modern/dexie.mjs";

import Dexie from 'dexie'

const DB_NAME = 'bili'

const SCHEMA_LOCAL = [
    // null,
    {
        // interest: 'id, &subject, [type+status], [type+status+version]',
        bili: ' &cid, bvid, mid, view', // 主键 索引
        // douban: '&subject',
    },
];

export default function newDB() {
    // console.log(SCHEMA_LOCAL)
    let userId = 't'
    let db = new Dexie(`${DB_NAME}[${userId}]`);
    for (let i = 1; i < SCHEMA_LOCAL.length; i ++) {
        db.version(i).stores(SCHEMA_LOCAL[i]);
    }
    return db;
}
