<template>
	<view>
		<view class="uni-mask" v-show="show" :style="{ top: offsetTop + 'px' }" @click="hide" @touchmove.stop.prevent="moveHandle"></view>
		<view class="uni-popup uni-popup-bottom" :class="{'translate-top':show}" @touchmove.stop.prevent="moveHandle">
			<view class="popup-main">
				<view class="popup-top">
					<view class="popup-title">{{title}}</view>
					<view class="popup-close" @click="hide"><uni-icon type="closeempty" size="40" color="#c1c1c1"></uni-icon></view>
				</view>
				<view class="popup-content">
					<scroll-view class="popup-scroll" scroll-y>
						<radio-group class="popup-listItem" @change="radioChange">
							<!-- <label class="popup-item">
								<view class="popup-item-key">普通快递包邮</view>
								<radio value="userSelf" color="#ff384f" checked="true"/>
							</label>
							<label class="popup-item">
								<view class="popup-item-key">顺丰快递(￥20)</view>
								<radio value="alipay" color="#ff384f" />
							</label> -->
							<label class="popup-item" v-for="(item,index) in popData" :key="index">
								<view class="popup-item-key">{{item.title}}</view>
								<radio :value="item.value" color="#ff384f" :checked="activeCurrent == index"/>
							</label>
						</radio-group>
					</scroll-view>
					<view class="popup-confirm" @click="$emit('popConfirm',itemValue)">确定</view>
				</view>
			</view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			show: {
				type: Boolean,
				default: false
			},
			title:{
				type: String,
				default: '标题'
			},
			popData:{
				
			}
		},
		data() {
			let offsetTop = 0;
			//#ifdef H5
			if (!this.h5Top) {
				offsetTop = 44;
			} else {
				offsetTop = 0;
			}
			//#endif
			return {
				offsetTop: offsetTop,
				itemValue:'',//选择的值
				activeCurrent: 0 //当前选择的项
			};
		},
		methods:{
			hide: function() {
				this.$emit('hidePopup');
			},
			//使用遮罩层后避免遮罩内容的滑动
			moveHandle() {
				
			},
			radioChange(e) {
				this.itemValue = e.target.value
			},
		},
		created() {
			this.itemValue = this.popData[0].value;
		}
	};
</script>
<style lang="scss">
	.uni-mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.3);
	}
	.uni-popup {
		position: fixed;
		z-index: 999;
		background-color: #ffffff;
		transform: translate(0,150%);
		transition: .3s;
		border-radius: 20upx 20upx 0 0;
	}
	.uni-popup-bottom {
		left: 0;
		bottom: 0;
		width: 100%;
		min-height: 100upx;
	}
	.translate-top{
		transform: translate(0);
	}
	.popup-main{
		padding: 20upx 30upx;
		.popup-top{
			position: relative;
			text-align: center;
			.popup-close{
				position: absolute;
				right: 0;
				top: -14upx;
			}
		}
		.popup-content{
			padding: 40upx 0;
			.popup-scroll{
				max-height: 600upx;
				overflow: scroll;
			}
			.popup-item {
				padding: 20upx 30upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				&:not(:last-child){
					border-bottom: 2upx solid #f1f1f1;
				}
				.popup-item-key {
					font-size: 28upx;
				}
			}
			.popup-confirm{
				width: 80%;
				margin: 60upx auto 0;
				text-align: center;
				border-radius: 50upx;
				padding: 20upx;
				color: #fff;
				background-color: #ff384f;
				
			}
		}
	}
</style>