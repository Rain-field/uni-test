import desStr from '../common/desStr.js';
/*
 * @parm url string  短url
 * @parm pram Object 传入参数
 * @parm CheckToken boolen 令牌验证
 * @parm ShowLoading  boolen 请请求是否显示loading
 * @parm Methods  string 请求协议默认为get
 * @pram ShowMsg 请求完成是否弹出提示信息
 */
const keynumber = '12345678';
export default {
	Fetch: function(url, data = {}, Methods = "GET", CheckToken = false, ShowLoading = true, ShowMsg = true) {
		if (ShowLoading) {
			uni.showLoading({
				title: '请稍候...'
			})
		}
		if (CheckToken) {
			this.CheckToken();
			data.token = store.state.$globalData.$userinfo.token;
		}
		data = JSON.stringify(data);
		data = desStr.jsencrypt(keynumber, data); //加密
		return new Promise(function(resolve, reject) {
			uni.request({
				url: url,
				data: {
					data: data
				},
				header: {
					'custom-header': 'Access-Control-Allow-Origin:*'
				},
				method: Methods,
				success: (res) => {
					if (ShowLoading) {
						uni.hideLoading();
					}
					if (res.statusCode == 200) {
						res = JSON.parse(res.data.d);
						if (res[0].statusCode != 0) {
							resolve(res[0]);
						} else {
							uni.showModal({
								title: '温馨提示',
								content: res[0].statusMessage,
								showCancel: false,
								success: function() {}
							});
						}
					} else if (res.statusCode == 404) {
						if (ShowMsg) {
							uni.showToast({
								title: '访问的资源不存在',
								icon: 'none'
							})
						}
					} else if (res.statusCode == 500) {
						if (ShowMsg) {
							uni.showToast({
								title: '服务器异常请稍后再试',
								icon: 'none'
							})
						}
					} else {
						if (ShowMsg) {
							uni.showToast({
								title: '未知错误请稍后重试',
								icon: 'none'
							})
						}
					}
				},
				fail: (res) => {
					if (ShowLoading) {
						uni.hideLoading();
					}
					if (ShowMsg) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
					reject(res.msg);
				}
			})
		})
	},
	/*
	 * 检查token 是否登录
	 */
	// 	CheckToken:function(){
	// 		let token = store.state.$globalData.$userinfo.token;
	// 		
	// 		if(token==''||token==undefined||token==null){
	// 			
	// 				uni.showToast({
	// 				title: '您还未登录',
	// 				duration: 2000
	// 			});
	// 			
	// 			// #ifdef APP-PLUS
	// 			uni.navigateTo({
	// 			url: '/pages/login/login'
	// 		});
	// 			// #endif
	// 			
	// 			// #ifdef MP-WEIXIN
	// 			uni.reLaunch({
	// 			url: '/pages/login/wxlogin'
	// 		});
	// 			// #endif
	// 	}		
	// 	}
}
