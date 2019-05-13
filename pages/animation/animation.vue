<template>
	<view>
		<view :animation="animationData" style="background:red;height:100upx;width:100upx"></view>
		<view>
			<view class="" @click="rotateAndScale">旋转同时放大</view>
			<view class="" @click="rotateThenScale">先旋转后缩小</view>
			<view class="" @click="rotateAndScaleThenTranslate">先旋转同时放大，然后平移</view>
		</view>
	</view>
</template>

<script>
	export default{
  data() {
    return{
		animationData: {}
	}
  },
  onShow: function(){
    var animation = uni.createAnimation({
      duration: 1000,
        timingFunction: 'ease-in-out',
		transformOrigin:'50% 0%',
    })

    this.animation = animation

    setTimeout(function() {
      this.animation.translate(200).step().translate(200,400).step().translate(0,400).step().translate(0).step();
      this.animationData = this.animation.export()
    }.bind(this), 500)
  },
  // 并列同时执行的动画链式写在一起最后以step结尾,队列先后执行的动画链式写在一起每个动作结束都以step分割
  methods:{
    rotateAndScale: function () {
      // 旋转同时放大
      this.animation.rotate(45).scale(1.5,1.5).step()
      this.animationData = this.animation.export()
    },
    rotateThenScale: function () {
      // 先旋转后缩放
      this.animation.rotate(90).step().scale(1, 1).step();
      this.animationData = this.animation.export()
    },
    rotateAndScaleThenTranslate: function () {
      // 先旋转同时放大，然后平移
      this.animation.rotate(135).scale(1.5, 1.5).step()
      this.animation.translate(100, 100).step({ duration: 1000 })
      this.animationData = this.animation.export()
    }
  }
}
</script>

<style>
</style>
