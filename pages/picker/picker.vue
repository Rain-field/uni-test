<template>
	<view class="content">
		<view class="tab" :class="[{'active':index==tabIndex}]" @tap="toggleTab(index)" v-for="(item,index) in tabList" :key="index">{{item.name}}</view>
		<w-picker :mode="mode" startYear="2016" endYear="2030" :defaultVal="defaultVal" @confirm="onConfirm" ref="picker"></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components:{
			wPicker
		},
		data() {
			return {
				title: 'Hello',
				tabList:[{
					mode:"date",
					name:"日期选择",
					value:[0,1,0]
				},{
					mode:"yearMonth",
					name:"年月",
					value:[0,1]
				},{
					mode:"dateTime",
					name:"日期时间选择",
					value:[0,1,0,1,0]
				},{
					mode:"time",
					name:"时间选择",
					value:[1,1]
				},
				{
					mode:"region",
					name:"省市区",
					value:[10,0,5]
				}],
				tabIndex:0
			}
		},
		computed:{
			mode(){
				return this.tabList[this.tabIndex].mode
			},
			defaultVal(){
				return this.tabList[this.tabIndex].value
			}
		},
		onLoad() {

		},
		methods: {
			toggleTab(index){
				this.tabIndex=index;
				this.$refs.picker.show();
			},
			onConfirm(val){
				console.log(JSON.stringify(val));
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
	.tab{
		padding:20upx 0;
		font-size: 32upx;
	}
	.tab.active{
		color:#f00;
	}
</style>
