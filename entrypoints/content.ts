import {get_bvids, get_mid, get_pn} from "@/src/utils/bili";

export default defineContentScript({
    matches: ['*://space.bilibili.com/*/video'],
    // matches: ['*://*.google.com/*'],
    runAt: 'document_end',
    main() {
        console.log('Hello content.');
        // let items = document.querySelectorAll(".be-pager-item")
        // let item = items[items.length - 1]
        // let page = item.textContent
        // console.log(page);
        // 在网页加载完成后执行
        window.addEventListener('load', () => {
            console.log('load');
            let mid = get_mid()

            // get_wbi_sign({mid,pn})
            // let query = await get_wbi_sign({mid,pn})
            // console.log(query)

            chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
                if (request.cmd == 'test') {
                    alert(request.value);

                    let pn = get_pn()
                    sendResponse({mid, pn});
                } else if (request.cmd === 'bvid') {
                    let bvids = get_bvids()
                    sendResponse({mid, bvids});
                } else if (request.cmd === 'fetchData') {
                    fetch(request.val)
                        .then((response) => response.json())
                        .then((data) => sendResponse(data))
                        .catch(error => console.log('error', error));
                    // let data = await resp.json()
                    // sendResponse(data)
                    return true
                }
            });

        });
    },
});
