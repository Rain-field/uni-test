<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			getDatas() {
				var dataA = {
					userName:'19981239321',
					password:'123456'
				};
				var dataB = {
					userKey:"M1pwbDJiSGRzSzYxZDVlSWJpSUlLakw2Q2haR1JwYkIxdFJBZUJsdXZQS1FQYk9hcXhITWJ4RlNqOGlWaVY2QWdLU0N5b2pacXU5WmhtTml5YW4za2c9PQ=="
				}
				// this.apis.test(dataA).then(res => {
				// 	console.log(res);
				// })
				this.apis.user(dataB).then(res => {
					console.log(res);
				}).catch(res2 => {
					uni.reLaunch({
						url: '../index/index',
					});
				})
			}
		},
		onLoad() {
			this.getDatas();
		}
	}
</script>

<style lang="scss">

</style>
