/**
 * 基础的页面请求地址
 */
const baseurl = "http://120.78.6.157:8010";//测试
// const baseurl = "http://ceshiyijia.com.h001.webe7.com/topgrade_new.asmx";//测试
// const baseurl = "http://192.168.0.233:10010/topgrade_new.asmx";// 本地
// const baseurl = "http://yjsp.leyong.com.cn/topgrade_new.asmx";//新正式
// const baseurl = "http://yijia.com.h001.webe7.com/topgrade_new.asmx";//原正式

export default {
    login: `${baseurl}/Login`,
	hotList: `${baseurl}/hot_list`,
	secondary_class:`${baseurl}/secondary_class`,
	order_list:`${baseurl}/order_list`,
	test:`${baseurl}/api/Login/GetUser`,
	user:`${baseurl}/api/UserCenter/GetUser`,
}