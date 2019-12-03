<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>焦安溥</span>
    </div>
    <div>
      <el-button style="padding: 3px 0" type="text" @click="openBackground">获取页面全部图片</el-button>
    </div>
    <!-- <div>
      <el-button style="padding: 3px 0" type="text" @click="openRemind">日报提醒</el-button>
    </div> -->
  </el-card>
</template>

<script>
export default {
  name: "app",
  methods: {
    openBackground() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var tabId = tabs.length ? tabs[0].id : null;
        chrome.tabs.create({url: 'imagelist.html?tabId='+tabId});
      });

      // 拿不到 获取生成脚本调用的标签。此函数不适用于脚本被非标签内容调用的情况。(例如: 背景页 或者 弹出视图) 。
      // chrome.tabs.getCurrent(function(tab) {
      //   // 通过 tab.id 可以拿到标签页的ID
      //   chrome.tabs.create({url: 'imagelist.html?tabId='+tab.id});
      // });
    },
    // openRemind() {
    //     chrome.tabs.create({url: 'options.html'});
    // }
  }
};
</script>

<style>
.box-card {
  width: 300px;
}
</style>
