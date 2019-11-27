
//content_scripts——>background  例如
// 主动发送消息给后台
// 要演示此功能，请打开控制台主动执行sendMessageToBackground()
// function sendMessageToBackground(message) {
//     chrome.runtime.sendMessage({ greeting: message || '你好，我是content-script呀，我主动发消息给后台！' }, function () {
//         // tip('收到来自后台的回复：' + response);
//     });
//     window.open(chrome.extension.getURL("background.html"));
// }

// chrome.runtime.onMessage.addListener(function (request) {
//     console.log(request);
//     sendMessageToBackground(request.tabId);
// })
