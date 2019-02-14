<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img :src="item.img" alt="轮播图">
            </mt-swipe-item>
        </mt-swipe>
        <!--六宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../assets/images/menu1.png" alt="">
                <div class="mui-media-body">新闻资讯</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../assets/images/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../assets/images/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../assets/images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../assets/images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../assets/images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>
    </div>
    
</template>

<script>
    import { Toast } from 'mint-ui'
    
    export default ({
        data() {
            return {
                lunbotuList: []
            }
        },
        created() {
            this.getLunbotu()
        },
        methods: {
            getLunbotu() {
                this.$axios.get('http://www.liulongbin.top:3005/api/getlunbo')
                    .then(res=>{
                        if(res.data.status===0){
                            this.lunbotuList = res.data.message
                        } else {
                            Toast('图片加载失败')
                        }
                })
            }
        }
    })
</script>

<style lang="less" scoped>
    .mint-swipe {
        height: 180px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border: none;
        .mui-table-view-cell {
            border: none;
            img {
                width: 60px;
                height: 60px;
            }
            .mui-media-body {
                font-size: 14px;
            }
        }
    }
</style>
