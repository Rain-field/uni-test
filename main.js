import Vue from 'vue'
import App from './App'
import apis from './config/api1.js';
import uniIcon from './components/uni-icon.vue';

Vue.config.productionTip = false
Vue.prototype.apis = apis;
App.mpType = 'app'

Vue.component('uni-icon', uniIcon);

const app = new Vue({
    ...App
})
app.$mount()
