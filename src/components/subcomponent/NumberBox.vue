<template>
    <div>
        <div class="mui-numbox" data-numbox-min='1' >
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" value="1" @change="numChange" ref="ipt"/>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>
<script>
    import mui from '../../../static/mui/js/mui'
    mui('body').on('tap','a',function(){document.location.href=this.href;});
    
    
    export default {
        mounted(){
            mui('.mui-numbox').numbox();

        },
        methods:{
            numChange(){
                this.$emit('getCount', parseInt(this.$refs.ipt.value))
            }
        },
        props:['max'],
        watch: {
            'max': function (newVal, oldVal) {
                mui('.mui-numbox').numbox().setOption('max', newVal)
            }
        }
    }
</script>
<style>

</style>
