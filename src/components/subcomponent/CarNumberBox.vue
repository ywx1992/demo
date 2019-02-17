<template>
    <div>
        <div class="mui-numbox" data-numbox-min='1' style="height: 25px;">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" readonly
            :value="initcount" @change="numChange" ref="ipt"/>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>
<script>
    import mui from '../../../static/mui/js/mui'
    
    mui('body').on('tap', 'a', function () {
        document.location.href = this.href;
    });
    
    
    export default {
        mounted() {
            mui('.mui-numbox').numbox();
            
        },
        methods: {
            numChange() {
                this.$store.commit('updateGoodsInfo', {id: this.id, count:this.$refs.ipt.value})
            }
        },
        props: ['initcount', 'id'],
    }
</script>
<style>

</style>
