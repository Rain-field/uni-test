<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: current === index }" @click="tabClick(index)">{{ item }}</view>
		</view>
		<swiper :current="current" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				<scroll-view :scroll-top="scrollTop" class="list-scroll-content" scroll-y @scroll="scroll" @scrolltolower="loadData">
					<!-- 空白页 -->
					<empty v-if="orderList.length === 0"></empty>
					<view class="order-item" v-for="(item,index) in orderList" :key="index">
						<view class="order-top">
							<view class="order-t-left">{{item.add_time}}</view>
							<view class="order-t-right">
								<text>{{item.status_name}}</text>
								<uni-icon class="del" type="trash" size="18" color="#909399"></uni-icon>
							</view>
						</view>
						<scroll-view v-if="item.data.length > 1" class="goods-box" scroll-x>
							<view v-for="(goodsItem, goodsIndex) in item.data" :key="goodsIndex" class="goods-item">
								<image class="goods-img" :src="goodsItem.img_ur" mode="aspectFill"></image>
							</view>
						</scroll-view>
						<view 
							v-if="item.data.length  === 1" 
							class="goods-box-single"
							v-for="(goodsItem, goodsIndex) in item.data" :key="goodsIndex"
						>
							<image class="goods-img" :src="goodsItem.img_ur" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{goodsItem.title}}</text>
								<text class="attr-box">x {{goodsItem.quantity}}</text>
								<text class="price">{{goodsItem.real_price}}</text>
							</view>
						</view>
					</view>
					<uni-load-more :status="loadingType"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
		<view class="toTop" @longTap="goTop()" v-show='show'><image src="../../static/top.png" mode="aspectFill"></image></view>
	</view>
</template>

<script>
import uniIcon from "@/components/uni-icon.vue"
import uniLoadMore from '@/components/uni-load-more.vue';
import empty from "@/components/empty";
let page=1,count=0//分页中的第几页,数据总数
export default {
	components: {
		uniIcon,
		uniLoadMore,
		empty
	},
	data() {
		return {
			current: 0,
			show:false,//返回顶部按钮是否显示
			loadingType:'more',
			orderList:[],
			navList: ['全部', '已完成', '待付款', '待发货', '待收货'],
			scrollTop: 0,
            old: {
                scrollTop: 0
            }
		};
	},
	methods: {
		//顶部tab点击
		tabClick(index) {
			this.current = index;
		},
		//swiper 切换
		changeTab(e) {
			this.current = e.target.current;
			this.orderList = [];
			page = 1;
			this.getDatas(this.current+1);
		},
		getDatas(index){//index表示不同的选项卡数据
			let vm = this;
			var dataA = {
				userid: '26454',
				type:index,
				pageNo: page,
				pageSize: 5
			};
			let newIndex = 5*(page-1);//请求新一页的数据使用累加索引
			this.apis.order_list(dataA).then(res=>{
				count = res.count;
				res = res.data[0];
				// console.log(res);
				
				if(count>5){
					vm.loadingType = 'loading';
				}else{
					vm.loadingType = 'noMore';
				}
				
				// 处理数据为一个新数组
				res.oeder.forEach(function(item,index,_this){
					vm.orderList.push(item);
					vm.orderList[index+newIndex].data = [];
				})
				for (var i = 0; i < res.oeder.length; i++) {
					for (var j = 0; j < res.goods.length; j++) {
						if(res.oeder[i].id == res.goods[j].orderid){
							vm.orderList[i+newIndex].data.push(res.goods[j]);
						}
					}
				}
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 0);
				// console.log(vm.orderList);
			})
		},
		// 监听滑块滚动
		scroll: function(e) {
            this.old.scrollTop = e.detail.scrollTop;
			// 显示隐藏返回顶部按钮
			if(e.detail.scrollTop > 100){
				this.show = true;
			}else{
				this.show = false;
			}
        },
		// 返回顶部
		goTop: function(e) {
            this.scrollTop = this.old.scrollTop;
			this.scrollTop = 0;
            this.$nextTick(function() {
				//滚动到页面顶部
				uni.pageScrollTo({
					scrollTop: 0,
					duration:0
				});
				// 滚动到滑块顶部
                this.scrollTop = -1;
            });
			
        },
		// 加载更多页数据
		loadData(){
			page++;
			if(count <= this.orderList.length){
				this.loadingType = 'noMore';
				return false;
			}
			this.getDatas(this.current+1);
		}
	},
	onLoad() {
		this.getDatas(1);
	},
	// 下拉刷新
	onPullDownRefresh: function() {
		this.orderList = [];
		page = 1;
		this.getDatas(this.current+1);
	}
};
</script>

<style lang="scss">
	$border-color1:#DCDFE6;
page,
.content {
	position: relative;
	background: $page-color-base;
	height: 100%;
}
.navbar {
	display: flex;
	height: 40px;
	padding: 0 5px;
	background: #fff;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
	position: relative;
	z-index: 10;
	.nav-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: 15px;
		color: $font-color-dark;
		position: relative;
		&.current {
			color: $base-color;
			&:after {
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width: 44px;
				height: 0;
				border-bottom: 2px solid $base-color;
			}
		}
	}
}
.swiper-box {
	height: calc(100% - 40px);
}
.list-scroll-content {
	height: 100%;
}
.uni-swiper-item {
	height: auto;
}
.order-item{
	background-color: #fff;
	padding: 0 30upx;
	margin-top: 20upx;
	.order-top{
		height: 80upx;
		color: $font-color-dark;
		font-size: $font-base;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2upx solid $border-color1;
		.order-t-right{
			.del{
				vertical-align: baseline;
				    padding: 10upx 0 10upx 10upx;
			}
			text{
				padding: 10upx 16upx 10upx 0;
				position: relative;
				&::after{
					content: '';
					width: 0;
					height: 15px;
					border-right: 1px solid #DCDFE6;
					position: absolute;
					right: 0px;
					top: 30%;
				}
			}
		}
	}
	/* 多条商品 */
	.goods-box{
		height: 160upx;
		padding: 20upx 0;
		white-space: nowrap;
		.goods-item{
			width: 120upx;
			height: 120upx;
			display: inline-block;
			margin-right: 24upx;
		}
		.goods-img{
			display: block;
			width: 100%;
			height: 100%;
		}
	}
	/* 单条商品 */
	.goods-box-single{
		display: flex;
		padding: 20upx 0;
		.goods-img{
			display: block;
			width: 120upx;
			height: 120upx;
			border: 1px solid $border-color1;
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 0 30upx 0 24upx;
			overflow: hidden;
			.title{
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				line-height: 1;
			}
			.attr-box{
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				padding: 10upx 12upx;
			}
			.price{
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				&:before{
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
	}
}
.toTop{
	position: fixed;
	right: 20upx;
	bottom: 20upx;
	width: 90upx;
	height: 90upx;
	image{
		width: 100%;
		height: 100%;
	}
}
</style>
