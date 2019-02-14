import Vue from 'vue'
import Router from 'vue-router'

//导入tabbar组件
import HomeComponent from '../components/tabbar/HomeComponent'
import MemberComponent from '../components/tabbar/MemberComponent'
import CartComponent from '../components/tabbar/CartComponent'
import SearchComponent from '../components/tabbar/SearchComponent'


Vue.use(Router)

export default new Router({
	routes: [
        {path:'/', redirect:'/home'},
        {path:'/home', component:HomeComponent},
        {path:'/member', component:MemberComponent},
        {path:'/cart', component:CartComponent},
        {path:'/search', component: SearchComponent}
	
	],
    linkActiveClass: 'mui-active'
})
