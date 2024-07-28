import {db_json, db_bili} from "@/src/utils/db.js";
import {sendMessageToContentScript} from "@/src/utils/content.js";
import {bvid2cids} from "@/src/utils/bili.js";

const import_json_bvids = async (_, file) => {
    console.log('import_json_bvids...')
    console.log(new Date())
    let json_str = await file.raw.text()
    let json_obj = JSON.parse(json_str);

    let bvid = json_obj.data.bvid
    db_bili.bvids.put({bvid, json_obj})
    console.log(new Date())
}

async function pages2vlist() {
    console.log('pages2vlist...')
    console.log(new Date())
    for (let table of db_json.tables) {
        console.log(table)
        if (table.name.startsWith('pages[')) {
            console.log(table.name)
            let pages = await table.toArray()
            console.log(pages)
            for (let {json_obj} of pages) {
                // console.log(json_obj)
                // console.log(db_bili)
                await db_bili.vlist.bulkPut(json_obj.data.list.vlist)
            }
        }
    }
    console.log(new Date())
}

async function vlist2bvids() {
    console.log('vlist2bvids...')
    console.log(new Date())
    const new_bvids = await db_bili.vlist.orderBy('bvid').primaryKeys();
    const old_bvids = await db_json.bvids.orderBy('bvid').primaryKeys();
    // console.log(new_bvids)
    // console.log(old_bvids)
    const bvids = new_bvids.filter(item => !old_bvids.includes(item));
    console.log(bvids.length)
    for (const bvid of bvids) {
        sendMessageToContentScript({
            cmd: 'fetchData',
            val: `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`
        }, async function (json_obj) {
            console.log('来自content的回复：', bvid);
            await db_json.bvids.put({bvid, json_obj})
        });
    }
    console.log(new Date())
}

async function bvids2cids() {
    console.log('bvids2cids...')
    console.log(new Date())
    let bvids = await db_json.bvids.toArray()
    for (let {json_obj} of bvids) {
        // console.log(json_obj)
        // console.log(db_bili)
        let cids = bvid2cids(json_obj)
        console.log(`每 bvid 下 cid 数: ${cids.length}`)
        await db_bili.cids.bulkPut(cids)
    }
    console.log(new Date())
}

const import_json_pages = async (_, file) => {
    console.log('import_json_pages...')
    console.log(new Date())
    // console.log(file)
    let json_str = await file.raw.text()
    let json_obj = JSON.parse(json_str);
    // console.log(json_obj)
    let vlist = json_obj.data.list.vlist
    let mid = vlist[0].mid

    let pn = json_obj.data.page.pn

    await db_json[`pages[${mid}]`].put({pn, json_obj})
    console.log(new Date())
}

export {import_json_bvids, import_json_pages, pages2vlist, vlist2bvids, bvids2cids}
