<template>
  <div>
    <el-row>
      <el-col :span="3" v-for="(img, index) in imgList" :key="index" :offset="1">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <img
            :src="img.url"
            class="image"
            @click="downloadImage(img.url)"
            @load="imageLoaded(img, $event)"
          >
          <div style="padding: 14px;">
            <span>分辨率</span>
            <div class="bottom clearfix">
              <span>{{img.nWidth}} * {{img.nHeight}}</span>
            </div>
          </div>
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
      chrome.tabs.executeScript(tabId, { file: "main.js" }, results => {
        console.log(results);
        if (results && results[0] && results[0].length) {
          this.imgList = results[0].filter(result => {
            return result;
          });
          this.imgList = this.imgList.map(img => {
            return { url: img };
          });
        }
      });
    },

    // 图片加载完成
    imageLoaded(img, e) {
      let nWH = this.getImgNaturalDimensions(e.target);
      img.nWidth = nWH[0];
      img.nHeight = nWH[1];
      this.$forceUpdate();
    },

    // 计算原始图片分辨率
    getImgNaturalDimensions(img, callback) {
      let nWidth, nHeight;
      if (img.naturalWidth) {
        // 现代浏览器
        nWidth = img.naturalWidth;
        nHeight = img.naturalHeight;
      } else {
        // IE6/7/8
        let image = new Image();
        image.src = img.src;
        image.onload = function() {
          callback(image.width, image.height);
        };
      }
      return [nWidth, nHeight];
    },

    // 下载图片
    downloadImage(url) {
      chrome.downloads.download({
        url: url,
        conflictAction: "uniquify",
        saveAs: false
      });
      chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: 'img/logo.png',
        title: '安溥',
        message: '已添加到下载任务！'
      });
    },

    // web请求监听
    addListenerRequest() {
      // web请求监听，最后一个参数表示阻塞式，需单独声明权限：webRequestBlocking
      chrome.webRequest.onBeforeRequest.addListener(details => {
        // 判断请求是否为图片
        if (details.type == 'image') {

          let result = this.imgList.some((img) => {
            return img.url === details.url;
          });

          if (!result) {
            this.imgList.push({ url: details.url });
          }

        }
      }, {urls: ["<all_urls>"]}, ["blocking"]);
    }
  },
  mounted() {
    this.getImageList();
    this.addListenerRequest();
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

el-col {
  margin-top: 10px;
}
</style>
