<template>
  <view class="demo">
    <ss-upload-image :url="url" :file-list="fileList" :name="name" @on-success="onSuccess" @on-error="onError" @on-remove="onRemove" @on-process="onProcess"></ss-upload-image>
  </view>
</template>

<script>
  import ssUploadImage from '@/components/ss-upload-image.vue'
  export default {
    data() {
      return {
        fileList: [],
		baseUrl:'http://ceshiyijia.com.h001.webe7.com',
        url: 'http://ceshiyijia.com.h001.webe7.com/api/yijia/topgrade.ashx',
        name: 'file'
      }
    },
    components: {
      ssUploadImage
    },
    methods: {
      // 上传成功
      onSuccess(res) {
        // 响应示例
        // {
        //    code: 0,
        //    data: {
        //      image_url: 'http://www.xxxxx.png'
        //    },
        //    message: '上传成功'
        // }
        if (res[0].Status == 1) {
          this.fileList.push(this.baseUrl+res[0].FileName);
        }
        console.log(this.fileList);
      },
      // 上传进程
      onProcess(res) {
        console.log(res)
      },
      // 上传失败
      onError(err) {
        console.log(err)
      },
      // 移除
      onRemove(index) {
        this.fileList.splice(index, 1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .demo {
    padding: 40upx 20upx;
  }
</style>
