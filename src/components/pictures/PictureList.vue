<template>
    <div>
            <ul class="cate-content">
                <li v-for="(item,index) in cate" :key="item.id">
                    <span href="" :class="{active: selected==index}"
                    @click.prevent="change(index);getPicList(item.id)">
                        {{item.title}}
                    </span>
                </li>
            </ul>

        <ul class="pic-list">
            <router-link v-for="item in picList" :key="item.id"
            :to="'/home/pictureinfo/' + item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h3>{{item.title}}</h3>
                    <p>{{item.zhaiyao}}</p>
                </div>
            </router-link>
        </ul>
    </div>
    
</template>
<script>
    export default {
        data() {
            return {
                cate: [],
                selected: 0,
                picList: []
            }
        },
        created() {
            this.getCate()
            this.getPicList()
        },
        methods: {
            getCate() {
                this.$axios.get('/api/getimgcategory').then(res => {
                    if (res.data.status === 0) {
                        this.cate = res.data.message
                    }
                })
            },
            change(index) {
                this.selected = index
            },
            getPicList(id) {
                this.$axios.get('/api/getimages/'+id).then(res=>{
                    if(res.data.status===0){
                        this.picList = res.data.message
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .cate-content {
        height: 40px;
        border-bottom: 1px solid #ccc;
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
        &::-webkit-scrollbar {
            display: none;
        }
        li {
            display: inline-block;
            font-size: 14px;
            line-height: 40px;
            margin:0 10px;
            a {
                color: #666;
            }
            .active {
                color: #007aff ;
            }
        }
        
    }
    .pic-list {
        padding: 5px;
        li {
            position: relative;
            margin-bottom: 5px;
            box-shadow: 0 0 5px #ccc;
            img{
                width: 100%;
                height: 250px;
                vertical-align: middle;
            }
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .info {
                position: absolute;
                bottom: 0;
                left: 0;
                background-color: rgba(0,0,0,.3);
                max-height: 110px;
                
                h3 {
                    font-size: 14px;
                    color: #fff;
                }
                p {
                    font-size: 12px;
                    color: #fff;
                }
            }
        }
    }
</style>
