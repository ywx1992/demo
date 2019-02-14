// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/styles/reset.css'
import './assets/styles/border.css'

import fastClick from 'fastclick'
fastClick.attach(document.body)

//按需导入mint-ui插件
import 'mint-ui/lib/style.css'
import { Header, Tabbar, TabItem, Button } from 'mint-ui'
Vue.component(Button.name, Button)
Vue.component(Header.name, Header)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)

//导入mui样式表
import '../static/mui/css/mui.min.css'

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {App},
	template: '<App/>'
})
