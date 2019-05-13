<template>
	<view class="tab-pane-item">
		<Tabs :TabList="TabList" :currentTab="current" @tabs="tabsChange">
			<TabPane :order="orderList">
			    
			</TabPane>
			<TabPane>
			    <view>2</view>
			</TabPane>
			<TabPane>
			    <view>3</view>
			</TabPane>
			<TabPane>
			    <view>4</view>
			</TabPane>
			<TabPane>
			    <view>5</view>
			</TabPane>
		</Tabs>
		<uni-popup :show="show" position="middle" mode="insert" @hidePopup="togglePopup">
			<view class="setting_popup">
				<view class="setting_title">下载进度</view>
				<view class="progress-box"><progress :percent="percent" show-info stroke-width="20" /></view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
import Tabs from '@/components/tabs.vue';
import TabPane from '@/components/tabPane.vue';
import uniPopup from '@/components/uni-popup.vue';
export default {
	name: 'tabPane',
	components: {
		Tabs,
        TabPane,
		uniPopup
	},
	data() {
		return {
			show:true,
			percent:20,
			current: 0,
			lastClick:0,//上一次点击
			TabList: [{ title: '全部' },{ title: '已完成' }, { title: '待付款' }, { title: '待发货' }, { title: '待收货' }],
			orderList:[]
		};
	},
	methods: {
		tabsChange(index) {
			this.current = index;
			if(this.lastClick !== index){//防止点击多次当前选项卡请求多次数据
				this.getDatas(index+1);
			}
			this.lastClick = index;
		},
		getDatas(index){
			let vm = this;
			vm.orderList = [];
			var dataA = {
				userid: '26454',
				type:index,
				pageNo: 1,
				pageSize: 10
			};
			this.apis.order_list(dataA).then(res=>{
				res = res.data[0];
				console.log(res);
				res.oeder.forEach(function(item,index){
					vm.orderList.push(item);
					vm.orderList[index].data = [];
				})
				for (var i = 0; i < res.oeder.length; i++) {
					for (var j = 0; j < res.goods.length; j++) {
						if(res.oeder[i].id == res.goods[j].orderid){
							vm.orderList[i].data.push(res.goods[j]);
						}
					}
				}
				console.log(vm.orderList);
			})
		},
	},
	onLoad() {
		// this.getDatas(1);
	}
};
</script>
<style lang="scss">
.tab-pane-item{
	width: 100%;
	height: 100%;
	display: inline-block;
	white-space: initial;
	vertical-align: top;
	font-size: 24upx;
	box-sizing: border-box;
	overflow: auto
}
    
	
.setting_popup{
	width: 600upx;
	.setting_title{
		text-align: center;
		border-bottom: 2upx solid #eee;
	}
	
}
</style>
