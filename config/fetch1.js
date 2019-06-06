import MD5 from '../common/md5.js';
/*
 * @parm url string  短url
 * @parm pram Object 传入参数
 * @parm CheckToken boolen 令牌验证
 * @parm ShowLoading  boolen 请请求是否显示loading
 * @parm Methods  string 请求协议默认为get
 * @pram ShowMsg 请求完成是否弹出提示信息
 */
var app_key='ec1c8da6d54a7772e1caa6a0f06e878e',
	app_secret = '123456789';
	
Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
}

//参数加密
const md5Data=function(oldData){
		var data=JSON.parse(JSON.stringify(oldData||{})) //保存原始数据
		data=data||{};
		data.app_key=app_key;
		data.timestamp =new Date().Format("yyyy-MM-dd hh:mm:ss");
		var keys=[];
		for(var k in data){
			if(data[k]===0||data[k]===false||data[k]){
				keys.push(k);
			}else{
				delete data[k];
			}
		}
		
		keys=keys.sort();
		var signStr='';
		for(var i=0; i<keys.length; i++){
			signStr+=keys[i].toLowerCase()+data[keys[i]];
		}
		signStr += app_secret;
		data.sign=MD5.md5(signStr);
		return data;
		
	}
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
		data = md5Data(data) //加密
		return new Promise(function(resolve, reject) {
			uni.request({
				url: url,
				data: data,
				header: {
					'custom-header': 'Access-Control-Allow-Origin:*'
				},
				method: Methods,
				success: (res) => {
					console.log(res);
					if (ShowLoading) {
						uni.hideLoading();
					}
					if (res.statusCode == 200) {
						if(res.data.success){
							resolve(res.data);
						}else{
							uni.showModal({
								title: '温馨提示',
								content: res.data.msg,
								showCancel: false,
								success: function() {
									reject();
								}
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
}
