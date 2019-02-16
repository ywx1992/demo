<template>
    <div class="goodsinfo-container">
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：
                        <del>&yen;{{goodsinfo.market_price}}</del>&nbsp;&nbsp;
                        销售价：<span class="now">&yen;{{goodsinfo.sell_price}}</span>
                    </p>
                    
                    <p class="num">购买数量：<number-box @getCount="getSelectedCount" :max="goodsinfo.stock_quantity"></number-box></p>
                    
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button type="danger" size="small" @click="addGoods">加入购物车</mt-button>
                </div>
            
            
            </div>
        </div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsinfo.goods_no}}</p>
                    <p>库存情况：剩余{{goodsinfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(goodsinfo.id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(goodsinfo.id)">商品评论</mt-button>
            </div>
        </div>
        
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        >
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
    
    </div>
</template>
<script>
    import Swiper from '../subcomponent/Swiper'
    import NumberBox from '../subcomponent/NumberBox'
    
    export default {
        data() {
            return {
                id: this.$route.params.id,
                lunbotuList: [],
                goodsinfo: '',
                ballFlag:false,
                selectedCount: 1
            }
        },
        components: {
            'swiper': Swiper,
            'number-box': NumberBox
        },
        created() {
            this.getLunbotu()
            this.getGoodsInfo()
        },
        methods: {
            getLunbotu() {
                this.$axios.get('/api/getthumimages/' + this.id)
                    .then(res => {
                        if (res.data.status === 0) {
                            res.data.message.forEach(item => {
                                item.img = item.src
                            })
                            this.lunbotuList = res.data.message
                        }
                    })
            },
            getGoodsInfo() {
                this.$axios.get('/api/goods/getinfo/' + this.id)
                    .then(res => {
                        if (res.data.status === 0) {
                            this.goodsinfo = res.data.message[0]
                        }
                    })
            },
            goDesc(id) {
                this.$router.push('/home/goodsdesc/' + this.id)
            },
            goComment(id) {
                this.$router.push('/home/goodscomment/' + this.id)
            },
            beforeEnter(el){
                el.style.transform='translate(0,0)'
            },
            enter(el,done){
                el.offsetWidth
                //小球在页面中的位置
                var ballPosition = this.$refs.ball.getBoundingClientRect()
                //购物车徽标在页面中的位置
                var badgePosition = document.getElementById('badge').getBoundingClientRect()
                //小球到徽标的距离
                var distX = badgePosition.left - ballPosition.left
                var distY = badgePosition.top - ballPosition.top
                
                el.style.transform=`translate(${distX}px,${distY}px)`
                el.style.transition='all 0.6s cubic-bezier(0.35,-0.36, 0.25, 1)'
                done()
            },
            afterEnter(el){
                this.ballFlag = !this.ballFlag
            },
            addGoods(){
                this.ballFlag = !this.ballFlag
            },
            getSelectedCount(count) {
                this.selectedCount = count
                console.log(count)
            }
            
        },
        
    }
</script>
<style lang="less" scoped>
    .goodsinfo-container {
        background-color: #eee;
        overflow: hidden;
        .num {
            display: flex;
            justify-content: left;
        }
        .now {
            color: red;
            font-size: 16px;
            font-weight: bold;
        }
        
        .mui-card-footer {
            display: block;
            
            button {
                margin: 15px 0;
            }
        }
        
        .ball {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            z-index: 99;
            top: 372px;
            left: 151px;
        }
    }
</style>
