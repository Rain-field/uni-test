<template>
	<view class="tabs">
		<view class="active-switch">
			<view class="switch-container">
				<view v-for="(item, index) in TabList" :key="index" :class="['active-item', currentTab == index && 'focus']" @click="tabChange(index)">
					<view class="item">{{ item.title }}</view>
				</view>
				<view class="focus-line" :style="{ transform: transformX }"></view>
			</view>
		</view>
		<view class="tab-pane-view">
			<view class="tab-pane-group" :style="{ transform: transformXx }"><slot></slot></view>
		</view>
	</view>
</template>
<script>
export default {
	name: 'Tabs',
	props: {
		TabList: {
			type: Array,
			default() {
				return ['test1', 'test2', 'test3'];
			}
		},
		currentTab: {
			type: Number,
			default: 0
		}
	},
	computed: {
		transformX() {
			let currentTab = this.currentTab;
			return `translate3d(${currentTab * 100}%, 0px, 0px)`;
		},
		transformXx() {
			let currentTab = this.currentTab;
			return `translate3d(-${currentTab * 100}%, 0px, 0px)`;
		}
	},
	methods: {
		tabChange(index) {
			this.$emit('tabs', index);
		}
	}
};
</script>
<style lang="scss">
.tabs {
	position: relative;
	.active-switch {
		overflow: scroll;
		.switch-container {
			position: relative;
			display: flex;
			flex-direction: row;
			border-bottom: 1upx solid rgba(0, 0, 0, 0.5);
			.focus-line {
				flex: 1;
				min-width: 150upx;
				position: absolute;
				bottom: 0;
				border-bottom: 4upx solid #f07;
				transition: 0.3s;
			}
		}
		.active-item {
			position: relative;
			min-width: 150upx;
			flex: 1;
			height: 100upx;
			transition: 0.3s;
			background-color: #fff;
			color: #000;
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			&.focus {
				background: #fff;
				color: #f07;
				font-size: 32upx;
				transition-duration: 0.3s;
				.item {
					font-size: 32upx;
				}
			}
			.item {
				// width: 220upx
				padding: 0 5upx;
				overflow: hidden;
				font-size: 24upx;
			}
		}
	}
	.tab-pane-view {
		overflow: hidden;
		background-color: #f7f7f7;
		.tab-pane-group {
			display: block;
			white-space: nowrap;
			transition: all 0.3s;
			width: 100%;
			overflow: visible;
			will-change: transform, left, top;
			min-height: 100upx;
			.tab-pane-item {
				width: 100%;
				min-height: 100upx;
				display: inline-block;
				white-space: initial;
				vertical-align: top;
				font-size: 24upx;
				box-sizing: border-box;
				overflow: auto;
			}
		}
	}
}
</style>
