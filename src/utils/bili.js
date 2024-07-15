export function get_mid() {
    let url = window.location.href
    // console.log(url)
    let mid = url.split('/')[3]
    return mid;
}

export function get_pn() {
    let items = document.querySelectorAll(".be-pager-item")
    let item = items[items.length - 1]
    let pn = item.textContent
    // console.log(pn);
    // console.log(items);
    return pn
}

export function get_bvids() {
    let items = document.querySelectorAll(".small-item.fakeDanmu-item")
    let bvids = {}
    items.forEach(item => {
        bvids[item.dataset.aid] = 1
    })
    return bvids
}

export function mid_map2tree(id_map) {
    let mids = Object.keys(id_map);
    return mids.map(mid => {
        return {
            id: mid,
            pn: id_map[mid].pn,
            children: bvid_obj2list(id_map[mid].bvids)
        }
    })
}

export function bvid_obj2list(bvid_obj) {
    let bvids = Object.keys(bvid_obj);
    return bvids.map(bvid => {
        return {
            id: bvid,
            pn: bvid_obj[bvid]
        }
    })
}

export function page_json2item(json_obj) {
    let vlist = json_obj.data.list.vlist
    let mid = vlist[0].mid
    let bvids = new Set()
    vlist.forEach(el => {
        bvids.add(el.bvid)
    });
    return {mid, bvids}
}

export function bvid_json2item(obj) {
    const bvid = obj.data.bvid
    // https://www.bilibili.com/video/BV19K4y1L7MT?p=57
    let item_info = []
    obj.data.pages.forEach(el => {
            let url = `https://www.bilibili.com/video/${bvid}?p=${el.page}`
            // console.log(url)
            // console.log(el.part)
            let mid = obj.data.owner.mid
            let name = obj.data.owner.name
            let view = obj.data.stat.view

            let page = el.page
            let cid = el.cid
            let part = el.part
            let duration = el.duration

            item_info.push({
                name,
                mid,
                bvid,
                cid,
                url,
                page,

                view,

                duration,
                part,
            })
        }
    )
    return item_info
}

export async function get_save_mid_up(mid, pn) {
    let {id_map} = await chrome.storage.local.get('id_map')
    if (id_map === undefined) {
        id_map = {}
    }
    if (!id_map.hasOwnProperty(mid)) {
        id_map[mid] = {pn, bvids: {}}
    }
    console.log(id_map)

    chrome.storage.local.set({id_map}, async function () {
        console.log('保存成功！');
        let {id_map} = await chrome.storage.local.get('id_map')
        console.log(id_map)
    });
}

export async function get_save_mid_bvids(mid, bvids) {
    let {id_map} = await chrome.storage.local.get('id_map')
    if (!id_map.hasOwnProperty(mid)) {
        id_map[mid] = {bvids: {}}
    }
    id_map[mid].bvids = bvids
    chrome.storage.local.set({id_map}, async function () {
        console.log('保存成功！');
        let {id_map} = await chrome.storage.local.get('id_map')
        console.log(id_map)
    });
}
