import Vue from 'vue'
import Router from 'vue-router'

//导入tabbar组件
import HomeComponent from '../components/tabbar/HomeComponent'
import MemberComponent from '../components/tabbar/MemberComponent'
import CartComponent from '../components/tabbar/CartComponent'
import SearchComponent from '../components/tabbar/SearchComponent'
//导入news组件
import NewsList from '../components/news/NewsList'
import NewsInfo from '../components/news/NewsInfo'
import PictureList from '../components/pictures/PictureList'
import PictureInfo from '../components/pictures/PictureInfo'
import GoodsList from '../components/goods/GoodsList'
import GoodsInfo from '../components/goods/GoodsInfo'
import GoodsDesc from '../components/goods/GoodsDesc'
import GoodsComment from '../components/goods/GoodsComment'

Vue.use(Router)

export default new Router({
	routes: [
        {path:'/', redirect:'/home'},
        {path:'/home', component:HomeComponent},
        {path:'/member', component:MemberComponent},
        {path:'/cart', component:CartComponent},
        {path:'/search', component: SearchComponent},
        {path:'/home/newslist', component:NewsList},
        {path:'/home/newslist/newsinfo/:id', component:NewsInfo},
        {path:'/home/picturelist', component: PictureList},
        {path:'/home/pictureinfo/:id', component: PictureInfo},
        {path:'/home/goodslist', component:GoodsList},
        {path:'/home/goodsinfo/:id', component:GoodsInfo},
        {path:'/home/goodsdesc/:id', component:GoodsDesc},
        {path:'/home/goodscomment/:id', component:GoodsComment}
	
	],
    linkActiveClass: 'mui-active'
})
