// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/styles/reset.css'
import './assets/styles/border.css'

// import fastClick from 'fastclick'
// fastClick.attach(document.body)

//按需导入mint-ui插件
import 'mint-ui/lib/style.css'
import { Header, Swipe, SwipeItem, Button, Lazyload} from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload)

//导入mui样式表
import '../static/mui/css/mui.min.css'
import '../static/mui/css/icons-extra.css'

//导入axios
import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = 'http://www.liulongbin.top:3005'
Vue.prototype.$axios = axios
Vue.prototype.qs = qs

//时间格式化过滤器
import moment from 'moment'
Vue.filter('dateFormat', function (dateStr, pattern='YYYY-MM-DD HH:mm:ss') {
    return moment(dateStr).format(pattern)
})

//导入缩略图插件 https://github.com/liulongbin1314/vue2-preview
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {App},
	template: '<App/>'
})
