<template>
  <div>
    <el-row>
      <el-col :span="4" v-for="(img, index) in imgList" :key="index" :offset="1">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <img :src="img" class="image" @click="downloadImage(img)">
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      imgList: []
    };
  },
  methods: {
    // 获取图片列表
    getImageList() {
      let tabId = Number(window.location.href.split("=")[1]);
      chrome.tabs.executeScript(
        tabId,
        { file: "main.js" },
        results => {
          if (results && results[0] && results[0].length) {
            this.imgList = results[0].filter((result) => {
              return result;
            });
          }
        }
      );
    },
    // 下载图片
    downloadImage(url) {
      chrome.downloads.download({
        url: url,
        conflictAction: "uniquify",
        saveAs: false
      });
    }
  },
  mounted() {
    this.getImageList();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
  cursor: pointer;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

el-col{
  margin-top: 10px;
}
</style>
