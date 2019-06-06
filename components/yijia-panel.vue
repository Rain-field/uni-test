<template>
	<view class="ypanel-main">
		<view class="ypanel-title">{{title}}</view>
		<view class="ypanel-list">
			<view class="ypanel-item" v-for="(item,index) in panelData" :key="index" @click="itemClick(item,index)" :class="{'active-ypanel': index == activeCurrent}">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type: String,
				default:'标题'
			},
			panelData:{
				
			}
		},
		data() {
			return {
				activeCurrent: 0 
			};
		},
		methods:{
			itemClick(item,index){
				this.activeCurrent = index;
				this.$emit('panelClick',item.value);
			}
		}
	}
</script>

<style lang="scss">
	.ypanel-main{
		padding: 20upx 40upx;
		font-size: 28upx;
		.ypanel-list{
			display: flex;
			flex-wrap: wrap;
			.ypanel-item{
				text-align: center;
				padding: 10upx 0;
				margin-top: 30upx;
				border-radius: 10upx;
				width: 26%;
				margin-right: 30upx;
				background-color: #f1f1f1;
			}
		}
	}
	.active-ypanel{
		background-color: #ff384f !important;
		color: #fff;
	}
</style>
