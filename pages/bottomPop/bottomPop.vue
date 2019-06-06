<template>
	<view>
		<view class="" @click="togglePopup">点击弹窗</view>
		<yijia-popup :show="popShow" title="优惠券" @hidePopup="togglePopup" :popData="popData" @popConfirm="popConfirm"></yijia-popup>
	</view>
</template>

<script>
	import yijiaPopup from '@/components/yijia-bottom-popup.vue';
	export default {
		components:{
			yijiaPopup
		},
		data() {
			return {
				popShow:false,
				// popData:[
				// 	{title:'普通快递包邮',checked:true,value:'primary'},
				// 	{title:'顺丰快递(￥20)',checked:false,value:'shunfeng'},
				// ]
				popData:[
					{title:'XXX优惠券 ￥10',value:'No10'},
					{title:'XXX优惠券 ￥20',value:'No20'},
					{title:'XXX优惠券 ￥30',value:'No30'},
					{title:'不使用',value:'NoUse'},
				],
			};
		},
		methods:{
			togglePopup() {
				this.popShow = !this.popShow;
			},
			popConfirm(e){
				this.togglePopup();
				console.log(e);
			}
		},
		onBackPress() {
			if(this.popShow){
				this.popShow = ! this.popShow;
				return true;
			}
		}
	}
</script>

<style lang="scss">
.test{
	padding: 30upx;
}
</style>
