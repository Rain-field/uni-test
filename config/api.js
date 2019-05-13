import requestURL from './requestURL.js'
import request from './fetch.js'
/**
 * 请求API
 */
export default {
    /**
     * 
     * @param {*} 获取数据可以不入参
     */
    inputinfo: async function (prams) {
        let response = await request.POST(requestURL.getinfo,prams)
        return response;
    },
    /**
     * 列表请求
     */
     getinfo: async function(prams) {

        let response = await request.POST(requestURL.inputinfor,prams)
        return response;
    },
	
	login: async function(prams) {
	    let response = await request.Fetch(requestURL.login,prams,'POST')
	    return response;
	},
	hotList: async function(prams) {
	    let response = await request.Fetch(requestURL.hotList,prams,'POST')
	    return response;
	},
	secondary_class: async function(prams) {
	    let response = await request.Fetch(requestURL.secondary_class,prams,'POST')
	    return response;
	},
	order_list: async function(prams) {
	    let response = await request.Fetch(requestURL.order_list,prams,'POST')
	    return response;
	},
	

   

}