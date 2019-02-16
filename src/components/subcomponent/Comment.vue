<template>
    <div class="cmt-container">
        <h3>评论</h3>
        <hr>
        <textarea name="comment" placeholder="请输入评论(120字以内)"
        maxlength="120" v-model="cmtText">
        </textarea>
        
        <mt-button type="primary" size="large" @click="postCmt">发表评论</mt-button>
        <div class="cmt-list" v-for="(item, index) in cmtList" :key="item.add_time">
            <div class="cmt-title">
                <span>第{{index+1}}楼  用户：{{item.user_name}} </span>
                <span>发表时间：{{item.add_time | dateFormat}}</span>
            </div>
            <div class="cmt-body">{{item.content}}</div>
        </div>
        <mt-button type="danger" plain="" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            pageIndex: 1, //评论页码
            cmtList: [], //评论列表
            cmtText: '' //评论内容
        }
    },
    created() {
        this.getCmtList()
    },
    props: ['id'],
    methods: {
        getCmtList() {
            this.$axios.get('/api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then(res=>{
                if(res.data.status===0){
                    //新加载的评论数组合并到已存在的评论数组中
                   this.cmtList =  this.cmtList.concat(res.data.message)
                }else{
                    Toast('加载评论失败')
                }
            })
            
        },
        //加载更多评论
        getMore() {
            this.pageIndex++
            this.getCmtList()
        },
        //发表评论
        postCmt() {
            if(this.cmtText.trim().length===0){
                Toast('评论内容不能为空')
                return
            }
            this.$axios.post('/api/postcomment/'+this.id, this.qs.stringify({content: this.cmtText})).then(res=>{
                if(res.data.status===0){
                    var cmt = {
                        user_name: '匿名用户',
                        add_time: Date.now(),
                        content: this.cmtText.trim()
                    }
                    this.cmtList.unshift(cmt)
                    this.cmtText = ''
                }
            }).catch(err=>{
                Toast('评论失败')
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .cmt-container {
        h3 {
            font-size: 16px;
        }
        textarea {
            font-size: 14px;
            height: 90px;
            margin-bottom: 0;
        }
        .cmt-list {
            margin: 8px 0;
            font-size: 14px;
            .cmt-title{
                background-color: #ccc;
                line-height: 30px;
                display: flex;
                justify-content: space-between;
                padding: 0 3px;
            }
            .cmt-body {
                text-indent: 2em;
                padding: 5px 0;
            }
        }
    }
    
</style>
