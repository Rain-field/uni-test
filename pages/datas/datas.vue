<template>
	<view class="goods">
			<view class="list">
				<view class="lsita" v-for="(item, index) in goodsdatas" :key="index">
					<view class="listlef"><image :src="item.img_url" class="listimg"></image></view>
					<view class="lsitrig">
						<view class="title xshs">{{ item.title }}</view>
						<view class="ggm">
							<view class="pice">￥{{ item.sell_price }}</view>
							<view class="lggm">立即购买</view>
						</view>
					</view>
				</view>
			</view>
			<view class="fix" @click="toTop">
				上
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageNo:1,
				goodsdatas: [],
			}
		},
		onLoad() {
			this.getDatas();
		},
		onPullDownRefresh() {
			let vm = this;
			vm.getDatas();
			
		},
		methods: {
			getDatas(){
				var dataA = {
					id: '63',
					userid: '26454',
					pageNo: this.pageNo,
					pageSize: 10
				};
				this.apis.secondary_class(dataA).then(res=>{
					console.log(res.data[0].item);
					this.goodsdatas = res.data[0].item;
				})
				setTimeout(function () {
					uni.stopPullDownRefresh();
				}, 500);
			},
			toTop(){
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 100
				});
			}
		}
	}
</script>

<style lang="less">
	*{
		box-sizing: border-box;
	}
.goods {
	position: relative;
	.fix{
		position: fixed;
		right: 10upx;
		bottom: 80upx;
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
		background-color: rgba(0,0,0,.4);
		line-height: 60upx;
		text-align: center;
	}
	.mb {
		margin-bottom: 20upx;
	}
	//商品列表
	.list {
		padding: 10px;
		border-top: 1px solid #eee;
		.lsita {
			overflow: hidden;
			border: 1px solid #eee;
			border-radius: 5px;
			margin-bottom: 10px;
			.listlef {
				float: left;
				width: 30%;
				padding: 5px;
				line-height: 0;
				.listimg {
					width: 100px;
					height: 100px;
				}
			}
			.lsitrig {
				float: right;
				width: 70%;
				padding: 5px;
				.title {
					font-size: 16px;
					line-height: 1.5;
				}
				.ggm {
					overflow: hidden;
					margin-top: 20px;
					.pice {
						float: left;
						width: 60%;
						color: red;
						font-size: 16px;
					}
					.lggm {
						float: right;
						width: 35%;
						text-align: center;
						background: linear-gradient(to right, #ff704a, #fe5f5b);
						color: white;
						border-radius: 15px;
					}
				}
			}
		}
		/* 显示行数（两行） */
		.xshs {
			overflow: hidden;
			text-overflow: ellipsis;
			word-break: break-all;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
}
//加载动画
.loading {
	text-align: center;
	line-height: 80px;
}
//返回顶部
.return {
	position: fixed;
	z-index: 2;
	bottom: 40px;
	right: 20px;
	width: 50px;
	height: 50px;
}
</style>
