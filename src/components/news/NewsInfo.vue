<template>
    <div class="newsinfo-container">
        <!--标题-->
        <h3 class="title">{{newsinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间: {{newsinfo.add_time}}</span>
            <span>点击次数: {{newsinfo.click}}</span>
        </p>
        <hr>
        <!--正文-->
        <div class="content" v-html="newsinfo.content"></div>
        <!--评论-->
        <comment-box :id="id"></comment-box>
    </div>
</template>

<script>
    import Comment from '../subcomponent/Comment'
    import {Toast} from 'mint-ui'
    
    export default {
        data() {
            return {
                id: this.$route.params.id,
                newsinfo: {} //新闻对象
            }
        },
        components: {
            'comment-box': Comment
        },
        created() {
            this.getNewsInfo()
        },
        methods: {
            getNewsInfo() {
                this.$axios.get('/api/getnew/' + this.id).then(res => {
                    if (res.data.status === 0) {
                        this.newsinfo = res.data.message[0]
                    } else {
                        Toast("获取新闻失败")
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .newsinfo-container {
        padding: 5px;
        
        .title {
            font-size: 16px;
            padding: 8px 0 16px 0;
            text-align: center;
        }
        
        .subtitle {
            font-size: 12px;
            line-height: 8px;
            display: flex;
            justify-content: space-between;
        }
        
    }
</style>
