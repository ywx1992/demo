<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media"  v-for="item in newsList" :key="item.id">
                <router-link :to="'/home/newslist/newsinfo/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h3>{{item.title}}</h3>
                        <p class='mui-ellipsis'>
                            <span>发表时间: {{item.add_time | dateFormat}}</span>
                            <span>点击次数: {{item.click}}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>

import {Toast} from 'mint-ui'

export default {
    data() {
        return {
            newsList: []
        }
    },
    created() {
        this.getNewsList()
    },
    methods: {
        getNewsList() {
            this.$axios.get('/api/getnewslist').then(res=>{
                if(res.data.status===0){
                    this.newsList = res.data.message
                } else {
                    Toast('获取新闻列表失败失败')
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .mui-table-view {
        h3 {
            font-size: 14px;
            height: 20px;
        }
        .mui-ellipsis {
            font-size: 12px;
            display: flex;
            justify-content: space-between;
        }
        
    }
</style>
