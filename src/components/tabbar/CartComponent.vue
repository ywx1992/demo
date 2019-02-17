<template>
    <div class="cart-container">
        
        <div class="goods-list">
            <!--商品列表区-->
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner" v-for="(item,index) in cartlist" :key="item.id">
                        <mt-switch
                        v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="selectedChange(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div>
                            <h3>{{item.title}}</h3>
                            <p>
                                <span class="price">&yen{{item.sell_price}}</span>
                                <cnb class="numbox" :initcount="$store.getters.getGoodsCount[item.id]" :id="item.id"></cnb>
                                <span class="del" @click="remove(item.id,index)">删除</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!--结算区-->
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选商品<span class="red"> {{$store.getters.getCountAndAmount['count']}} </span>件，
                            总价：<span class="red">&yen;{{$store.getters.getCountAndAmount.amount}}</span></p>
                        </div>
                        <mt-button type="danger" size="small">结算</mt-button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    import CartNumberBox from '../subcomponent/CarNumberBox'
    export default {
        data(){
            return {
                cartlist:[]
            }
        },
        components:{
            cnb: CartNumberBox
        },
        created(){
            this.getCartList()
        },
        methods: {
            getCartList(){
                var idArr = []
                this.$store.state.cart.forEach(item=>{
                    idArr.push(item.id)
                })
                if(idArr.length==0) return
                
                this.$axios.get('/api/goods/getshopcarlist/'+idArr.join(','))
                    .then(res=>{
                        if(res.data.status===0){
                            this.cartlist = res.data.message
                        }
                    })
            },
            remove(id, index){
                this.cartlist.splice(index,1)
                this.$store.commit('removeGoods', id)
        
            },
            selectedChange(id, val){
                this.$store.commit('updateSelected',{id, selected:val})
            }
        },
        
    }
</script>

<style lang="less" scoped>
    .cart-container{
        background-color: #eee;
        overflow: hidden;
        .mui-card:first-child{
        .mui-card-content-inner{
            display: flex;
            padding: 10px;
            align-items: center;
            img{
                width: 40px;
                height: 50px;
                margin: 0 10px;
                
            }
            h3{
                font-size: 13px;
            }
            p{
                display: flex;
                align-items: center;
                margin-top: 10px;
                margin-bottom: 0;
                .numbox{
                    margin: 0 5px;
                }
                .price{
                    color: red;
                }
                .del{
                    font-size: 13px;
                    color: #0062cc;
                }
            }
            
        }
        }
        .mui-card:last-child{
            .mui-card-content-inner{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                .red {
                    color: red;
                }
            }
        }
    }
</style>
