<template>
  <div></div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // 重新加载监听 undefined 不要了
    // chrome.runtime.onInstalled.addListener(function() {
      // 新建右键菜单
      chrome.contextMenus.create({
        id: "getImage",
        type: "normal",
        title: "获取页面图片"
      });
    // });

    // 监听点击事件
    chrome.contextMenus.onClicked.addListener(function(info) {
      if (info.menuItemId == "getImage") {
        chrome.tabs.query({ active: true, currentWindow: true }, function(
          tabs
        ) {
          var tabId = tabs.length ? tabs[0].id : null;
          chrome.tabs.create({ url: "imagelist.html?tabId=" + tabId });
        });
      }
    });

    // 定时器
    // setTimeout(() => {
    //   chrome.notifications.create(null, {
    //     type: "basic",
    //     iconUrl: "img/logo.png",
    //     title: "安溥",
    //     message: "已添加到下载任务！"
    //   });
    // }, 5000)
  }
};
</script>

<style></style>
