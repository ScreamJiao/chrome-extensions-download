<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>我是背景页面</span>
    </div>
    <div>
      <el-row>
        <el-col :span="8" v-for="(img, index) in imgList" :key='img' :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="img" class="image">
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      imgList: ["https://cn.vuejs.org/images/logo.png","","https://cn.vuejs.org/images/dcloud.gif","https://cn.vuejs.org/images/vant.png"]
    };
  },
  methods: {
    // 监听刚转发过来的消息
    addListenerFrom() {
      console.log("background");
      chrome.runtime.onMessage.addListener(function(
        request
        // sender,
        // sendResponse
      ) {
        console.log("background111");
        console.log(request);
        chrome.tabs.executeScript(
          request.greeting,
          { file: "main.js" },
          function(results) {
            if (results && results[0] && results[0].length) {
              this.imgList = results[0];
              console.log(this.imgList);
              // results[0].forEach(function(t) {
              //   console.log(t);
              //   chrome.downloads.download({
              //     url: t,
              //     conflictAction: "uniquify",
              //     saveAs: false
              //   });
              // });
            }
          }
        );
      });
    }
  },
  mounted() {
    this.addListenerFrom();
  }
};
</script>

<style>
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
