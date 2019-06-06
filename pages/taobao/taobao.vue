<!-- <template>
    <view class="button-sp-area">
        <button type="primary" plain="true" @click="btnclick(0)">初始化</button>
        <button type="primary" plain="true" @click="btnclick(1)">授权登录</button>
        <button type="primary" plain="true" @click="btnclick(2)">是否已经登录</button>
    </view>
</template>

<script>
	// #ifdef APP-PLUS
    const bcPlugin = uni.requireNativePlugin('dahui-alibaichuan');
	
    export default {
        data() {
            return {
                title: ''
            }
        },
        methods: {
            btnclick: function(e) {
                const bcPlugin = uni.requireNativePlugin('dahui-alibaichuan');
                switch (e) {
                    case 0:
                        if (plus.device.vendor == 'Apple') {
                            bcPlugin.BCSDKInitWithAppkey('25254125', result => {
                                uni.showModal({
                                    title: '百川初始化',
                                    content: 'code:' + result['code'] + '\nmessage:' + result['message']
                                })
                            });
                        }
                        this.result = '点击了：' + this.btnTitles[e];
                        break;
                    case 1:
                        if (plus.device.vendor == 'Apple') {
                            bcPlugin.BCAuth(result => {
                                uni.showModal({
                                    title: '授权登录',
                                    content: 'code:' + result['code'] + '\nmessage:' + result['message']
                                })
                            });
                        } else {
                            bcPlugin.login(result => {
                                if (result.type == "success") {
                                    uni.showToast({
                                        title: '授权成功'
                                    });
                                } else {
                                    //授权失败，包括用户取消登录 
                                    uni.showToast({
                                        title: '授权失败,如有异常，请联系客服。'
                                    });
                                }
                            });
                        }
                        this.result = '点击了：' + this.btnTitles[e];
                        break;
                    case 2:
                        if (plus.device.vendor == 'Apple') {
                            bcPlugin.BCIsUserLogin(result => {
                                uni.showModal({
                                    title: '用户是否登录',
                                    content: 'code:' + result['code'] + '\nmessage:' + result['message']
                                })
                            });
                        } else {
                            bcPlugin.checkSession(reg => {
                                if (reg) {
                                    //reg 存在 获取seesion
                                        uni.showModal({
                                        title: 'session',
                                        content: 'reg:'+reg
                                    })
                                } else {
                                    //reg过期 获取session
                                    bcPlugin.getSession(result => {});
                                }
                            });
                        }
                        this.result = '点击了：' + this.btnTitles[e];
                        break;

                }
            } 
        }
    }
	// #endif
</script>



<style>
    button {
        margin-top: 30upx;
        margin-bottom: 30upx;
    }

    .button-sp-area {
        margin: 0 auto;
        width: 60%;
    }

    .content {
        text-align: center;
        height: 400upx;
    }

    .wrapper {
        flex-direction: column;
        justify-content: center;
    }

    .button {
        width: 200px;
        margin-top: 30px;
        margin-left: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        border-width: 2px;
        border-style: solid;
        border-color: #458B00;
        background-color: #458B00;
    }

    .text {
        font-size: 30px;
        color: #666666;
        text-align: center;
    }
</style> -->


<template>
    <view class="button-sp-area">
        <button type="primary" plain="true" @click="init">初始化</button>
        <button type="primary" plain="true" @click="login">登录</button>
    </view>
</template>

<script>
	 const hjAlibc = uni.requireNativePlugin('HJ-AliBC');
	
	export default {
	    data() {
	        return {
	            title: ''
	        }
	    },
	    methods: {
	        init() {
	            hjAlibc.init(res => uni.showToast({
	                title: JSON.stringify(res),
	                mask: false,
	                duration: 1500
	            }))
	        },
	        login() {
	            hjAlibc.login(res => {
	                if (res.success) {
	                    uni.showToast({
	                        title: res.data,
	                        mask: false,
	                        duration: 1500
	                    })
	                }
	            })
	        }
	    }
	}
</script>
   


<style>
    button {
        margin-top: 30upx;
        margin-bottom: 30upx;
    }

    .button-sp-area {
        margin: 0 auto;
        width: 60%;
    }

    .content {
        text-align: center;
        height: 400upx;
    }

    .wrapper {
        flex-direction: column;
        justify-content: center;
    }

    .button {
        width: 200px;
        margin-top: 30px;
        margin-left: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        border-width: 2px;
        border-style: solid;
        border-color: #458B00;
        background-color: #458B00;
    }

    .text {
        font-size: 30px;
        color: #666666;
        text-align: center;
    }
</style>