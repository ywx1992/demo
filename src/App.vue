<template>
    <div id="app">
        <!--header-->
        <mt-header fixed title="固定在顶部"></mt-header>
        <!--router-view-->
        <h1>hello</h1>
        <!--tabBar-->
        <nav class="mui-bar mui-bar-tab">
            <a class="mui-tab-item mui-active" href="#">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </a>
            <a class="mui-tab-item" href="#">
                <span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>
                <span class="mui-tab-label">消息</span>
            </a>
            <a class="mui-tab-item" href="#">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">通讯录</span>
            </a>
            <a class="mui-tab-item" href="#">
                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">设置</span>
            </a>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style lang="less" scoped>
    #app {
        padding-top: 40px;
        padding-bottom: 50px;
        .mui-bar {
            box-shadow: none;
            border-top: 1px solid #ccc;
        }
    }
</style>
