<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>焦安溥</span>
    </div>
    <div>
      <el-button style="padding: 3px 0" type="text" @click="openBackground">获取页面全部图片</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "app",
  methods: {
    openBackground() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var tabId = tabs.length ? tabs[0].id : null;
        // let message = {
        //   tabId: tabId,
        //   message: "popup发来的消息"
        // };
        // console.log(message);
        // window.open(chrome.extension.getURL("background.html"));
        chrome.tabs.create({url: 'imagelist.html?tabId='+tabId});
      });
    }
  }
};
</script>

<style>
.box-card {
  width: 300px;
}
</style>
