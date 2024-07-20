export function sendMessageToContentScript(message, callback) {
    if (message.cmd === 'fetchData') {
        chrome.tabs.query({active: false}, function (tabs) {
            // console.log(tabs)
            let tab = tabs.filter(tab => tab.url.includes('.bilibili.com'));
            // console.log(tab)
            chrome.tabs.sendMessage(tab[0].id, message, function (response) {
                if (callback) callback(response);
            });
        });
    } else {
        console.log('content.js...')
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            // console.log(tabs)
            chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
                if (callback) callback(response);
            });
        });
    }

}
