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
import { Header, Swipe, SwipeItem, Button, Lazyload, Switch} from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload)
Vue.component(Switch.name, Switch)

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

//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

var cart = JSON.parse(localStorage.getItem('cart') || '[]')
//创建一个store
const store = new Vuex.Store({
    state: {
        cart: cart
    },
    mutations: {
        addToCart(state, goodsinfo){
            var flag = false
            state.cart.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })
            if(!flag){
                state.cart.push(goodsinfo)
            }
            localStorage.setItem('cart',JSON.stringify(state.cart))
        },
        updateGoodsInfo(state, goodsinfo){
            state.cart.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            localStorage.setItem('cart',JSON.stringify(state.cart))
        },
        removeGoods(state,id){
            state.cart.some((item,index)=>{
                if(item.id==id){
                    state.cart.splice(index,1)
                    return true
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        updateSelected(state, info){
            state.cart.some(item=>{
                if(item.id==info.id){
                    item.selected=info.selected
                    return true
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cart))
        }
    },
    getters: {
        getAllCount(state){
            var count = 0
            state.cart.forEach(item=>{
                count += item.count
            })
            return count
        },
        getGoodsCount(state){
            var obj = {}
            state.cart.forEach(item=>{
                obj[item.id] = item.count
            })
            return obj
        },
        getGoodsSelected(state){
            var obj = {}
            state.cart.forEach(item=>{
                obj[item.id] = item.selected
            })
            return obj
        },
        getCountAndAmount(state){
            var obj={count:0, amount:0}
            state.cart.forEach(item=>{
                if(item.selected){
                    obj.count += item.count
                    obj.amount += item.price * item.count
                }
            })
            return obj
        }

    }
})

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
    store,
	components: {App},
	template: '<App/>'
})
