<template>
	<view>
		<yijia-panel title='规格参数' :panelData="panelData" @panelClick="panelClick"></yijia-panel>
	</view>
</template>

<script>
	import yijiaPanel from '../../components/yijia-panel.vue'
	export default {
		components:{
			yijiaPanel
		},
		data() {
			return {
				panelData:[
					{name:'分类标签1',value:'type1'},
					{name:'分类标签2',value:'type2'},
					{name:'分类标签3',value:'type3'},
					{name:'分类标签4',value:'type4'},
					{name:'分类标签5',value:'type5'},
					{name:'分类标签6',value:'type6'},
				]
			};
		},
		methods:{
			panelClick(e){
				console.log(e);
			}
		}
	}
</script>

<style lang="scss">

</style>
