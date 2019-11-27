<template>
  <div>
    <el-row>
      <el-col :span="3" v-for="(img, index) in imgList" :key="index" :offset="1">
        <el-popover placement="bottom" width="200" trigger="hover">
          <el-button type="success" plain @click="downloadImage(img.url)">下载</el-button>
          <el-button type="success" plain @click="showQrCode(img.url)">扫码查看</el-button>
          <div slot="reference">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img :src="img.url" class="image" @load="imageLoaded(img, $event)">
              <div style="padding: 14px;">
                <span>分辨率</span>
                <div class="bottom clearfix">
                  <span>{{img.nWidth}} * {{img.nHeight}}</span>
                </div>
              </div>
            </el-card>
          </div>
        </el-popover>
      </el-col>
    </el-row>
    <el-dialog title="QR-Code" :visible.sync="dialogTableVisible" width="240px">
      <vue-qr :text="qrSrc" :size="200"></vue-qr>
    </el-dialog>
  </div>
</template>

<script>
import VueQr from "vue-qr";

const ADD_CONFIG = {
  urls: ["<all_urls>"],
  types: ["image"]
};

export default {
  name: "app",
  data() {
    return {
      imgList: [],
      qrSrc: "",
      dialogTableVisible: false,
      srcList: []
    };
  },
  components: {
    VueQr
  },
  methods: {
    // 获取图片列表
    getImageList() {
      let tabId = Number(window.location.href.split("=")[1]);
      chrome.tabs.executeScript(tabId, { file: "main.js" }, results => {
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
      chrome.downloads.download(
        {
          url: url,
          conflictAction: "uniquify",
          saveAs: false
        },
        this.notifications
      );
    },

    // 桌面通知
    notifications() {
      chrome.notifications.create(null, {
        type: "basic",
        iconUrl: "img/logo.png",
        title: "安溥",
        message: "已添加到下载任务！"
      });
    },

    // 生成QR Code
    showQrCode(url) {
      this.qrSrc = url;
      this.dialogTableVisible = true;
    },

    // web请求监听
    addListenerRequest() {
      // web请求监听，最后一个参数表示阻塞式，需单独声明权限：webRequestBlocking
      chrome.webRequest.onBeforeRequest.addListener(
        details => {
          let result = this.imgList.some(img => {
            return img.url === details.url;
          });

          if (!result) {
            this.imgList.push({ url: details.url });
          }
        },
        ADD_CONFIG,
        ["blocking"]
      );
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
