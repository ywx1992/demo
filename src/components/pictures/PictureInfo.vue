<template>
    <div class="picinfo-container">
        <h3>{{info.title}}</h3>
        <p>
            <span>发表时间：{{info.add_time}}</span>
            <span>点击：{{info.click}}</span>
        </p>
        <hr>
        <vue-preview
            :list="list"
            :thumbImageStyle="{width: '100px', height: '100px', margin: '10px'}"
            :previewBoxStyle="{border: '1px solid #eee'}"
            :tapToClose="true"
        />
        
        <div v-html="info.content" class="content"></div>
        <!--评论-->
        <comment-box :id="id"></comment-box>
    </div>
</template>
<script>
    import Comment from '../subcomponent/Comment'
    
    export default {
        data() {
            return {
                id: this.$route.params.id,
                list: [],
                info: ''
            }
        },
        components: {
            'comment-box': Comment
        },
        created(){
            this.getThumbs()
            this.getInfo()
        },
        methods: {
            getThumbs(){
                this.$axios.get('/api/getthumimages/'+this.id).then(res=>{
                    if(res.data.status===0){
                        res.data.message.forEach(item=>{
                            item.w = 1200
                            item.h = 900
                        })
                        this.list = res.data.message
                    }
                })
            },
            getInfo(){
                this.$axios.get('/api/getimageInfo/'+this.id).then(res=>{
                    if(res.data.status===0){
                        this.info = res.data.message[0]
                        console.log(res)
                    }
                })
            }
        }
    }
    
</script>
<style lang="less" scoped>
    .picinfo-container {
        padding: 5px;
        h3 {
            font-size: 16px;
            text-align: center;
            margin-bottom: 10px;
        }
        p {
            font-size: 12px;
            display: flex;
            justify-content: space-between;
        }
        .content {
            font-size: 14px;
            text-indent: 2em;
            margin: 10px 0;
        }
    }
</style>
