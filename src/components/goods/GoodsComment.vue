<template>
    <div class="goodscomment-container" >
        <comment :id="id"></comment>
    </div>
</template>
<script>
    import Comment from '../subcomponent/Comment'
    export default {
        data(){
            return {
                id: this.$route.params.id
            }
        },
        components: {
            'comment': Comment
        }
    }
</script>
<style lang="less" scoped>
    .goodscomment-container{
        padding: 3px;
    }
</style>
