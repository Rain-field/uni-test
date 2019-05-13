<template>
	<view class="swiper">
		<swiper :style="{height:fullHeight}" class="swiper-tall" :previous-margin="previousMargin"
		 :next-margin="nextMargin" circular="true" @change="change" :current="swiperCurrentIndex">
			<swiper-item class="swiper-container" v-for="(img,index) in imgs" :key="index"
			 :item-id="index" :data-year="index">
			 
			<view class="swiper-item"
			  :style="{background:img?('url('+ img +') center no-repeat'):'',backgroundSize:'100% 100%'}" 
			   :animation="animationData[index]">
			</view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				screenHeight: 0,
				animationData: {
					0:{},
					1:{},
					2:{}
				},
				previousMargin: uni.upx2px(82)+'px',
				nextMargin: uni.upx2px(82)+'px',
				zoomParam: 1.1,
				swiperCurrentIndex: 0,
				data: [],
				max: 0,
				imgs:[
					'/static/lunbo/1.jpg',
					'/static/lunbo/2.jpg',
					'/static/lunbo/3.jpg'
				]
			}
		},
		computed:{
			fullHeight() {
				const res = uni.getSystemInfoSync();
				return res.windowHeight - uni.upx2px(60) - (res.statusBarHeight+44)+'px';
			}
		},
		onLoad() {
			this.animation = uni.createAnimation();
			this.animation.scale(this.zoomParam).step();
			this.animationData[0] = this.animation.export();
		},
		methods: {
			change(e) {
				this.swiperCurrentIndex = e.detail.current;
				for (let key in this.animationData) {
					if (e.detail.currentItemId == key) {
						this.animation.scale(this.zoomParam).step();
						this.animationData[key] = this.animation.export();
					} else {
						this.animation.scale(1.0).step();
						this.animationData[key] = this.animation.export();
					}
				}
			}
		}
	}
</script>

<style>
	.swiper-item {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		height: 300upx;
		width: 520upx;
		line-height: 300upx;
		text-align: center;
		broder-radius: 6upx;
		margin: 50upx auto;
	}



	.swiper-tall {
		display: flex;
		align-items: center;
	}



	.swiper-title {
		width: 750upx;
		text-align: center;
	}

</style>
