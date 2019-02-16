<template>
    <div class="goods-list">
        <router-link class="goods-item" v-for="item in goods"
        :key="item.id" :to="'/home/goodsinfo/'+item.id">
            <img :src="item.img_url" alt="">
            <h3 class="title">{{item.title}}</h3>
            <div class="info">
                <p class="price">
                    <span class="now">&yen;{{item.sell_price}}</span>
                    <span class="old">&yen;{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                pageIndex: 1,
                goods:[]
            }
        },
        created(){
            this.getGoodsList()
        },
        methods: {
            getGoodsList(){
                this.$axios.get('/api/getgoods?pageindex='+this.pageIndex).then(res=>{
                    if(res.data.status===0){
                        this.goods = this.goods.concat(res.data.message)
                    }
                })
            },
            getMore(){
                this.pageIndex++
                this.getGoodsList()
            }
            
        }
    }
</script>
<style lang="less" scoped>
    .goods-list {
        padding: 6px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .goods-item {
            width: 49%;
            border: 1px solid #ccc;
            margin-bottom: 6px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            img {
                width: 100%;
                padding: 5px;
            }
            .title {
                font-size: 14px;
                padding: 0 2px;
            }
            .info {
                padding: 0 6px;
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 5px;
                }
                .price {
                   
                    .now{
                        color: red;
                        margin-right: 5px;
                        font-size: 14px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
    
                    }
                    
                }
                .sell {
                    font-size: 12px;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>
