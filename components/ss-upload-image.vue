<template>
  <view class="upload">
    <view class="list">
      <view class="item interval" v-for="(item,index) in fileList" :key="index">
        <image :src="item" v-if="item" @click="previewImage(index)"></image>
        <view class="icon-close" @click.stop="handleRemove(index)">
          <uni-icon type="closeempty" size="20" color="#fff"></uni-icon>
        </view>
      </view>
      <view class="item" @click="chooseImage" v-if="fileList.length<limit">
        <uni-icon type="image" size="30" color="#cccccd"></uni-icon>
      </view>
    </view>
  </view>
</template>

<script>
	import uniIcon from '@/components/uni-icon.vue'
  export default {
		components:{
			uniIcon
		},
    props: {
      limit: {
        type: Number,
        default: 5
      },
      url: {
        type: String,
        required: true
      },
      name: {
        type: String,
        default: 'file'
      },
      formData: {
        type: Object,
        default () {
          return {}
        }
      },
      header: {
        type: Object,
        default () {
          return {}
        }
      },
      fileList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data() {
      return {
			}
    },
    methods: {
      chooseImage() {
				let vm = this;
        uni.chooseImage({
					count:vm.limit,
          success: (chooseImageRes) => {
						chooseImageRes.tempFilePaths.forEach(function(item,index){
							const uploadTask = uni.uploadFile({
							  url: vm.url,
							  name: vm.name,
							  filePath: item,
							  formData: vm.formData,
							  header: vm.header,
							  success: (uploadFileRes) => {
							    vm.$emit('on-success', JSON.parse(uploadFileRes.data))
							  },
							  fail: (err) => {
							    vm.$emit('on-error', err)
							  }
							})
							uploadTask.onProgressUpdate((res) => {
							  vm.$emit('on-process', res)
							})
						})
            
          }
        })
      },
			// 删除图片
      handleRemove(index) {
        this.$emit('on-remove', index)
      },
			//预览图片
			previewImage(index){
				const urls = [];
				this.fileList.forEach((item)=> {
					urls.push(item);
				})
				uni.previewImage({
					current: urls[index],
					urls: urls,
					indicator: "number"
				})
			}
    }
  }
</script>

<style lang="scss" scoped>
  .upload {
    .list {
      display: flex;
      flex-wrap: wrap;
      .item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 140upx;
        height: 140upx;
        border-radius: 8upx;
        border: 2upx solid #D9D9D9;
        background-color: #f3f3f3;
        margin-bottom: 20upx;
        &.interval {
          margin-right: 16upx;
          border: none;
        }
        image {
          width: 100%;
          height: 100%;
          border-radius: 8upx;
          margin: 0;
        }
        .icon-close {
          position: absolute;
          top: 0;
          right: 0;
          width: 28upx;
          height: 28upx;
          background-color: red;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0 8upx 0 0;
        }
        .icon {
          width: 48upx;
          height: 48upx;
        }
      }
    }
  }
</style>
