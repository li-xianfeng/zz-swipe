<template>
    <p>＊自动轮播；<br>＊不显示小圆点；<br>＊图片居中显示［图2显示不全］；</p>
    <zz-swipe :imgs="imgs" :show-indicators="false" :auto="3000"></zz-swipe>
    
    <p class="not-first">＊同上；<br>＊添加禁止手动滑动；<br>＊显示整个图片［图2变形］；</p>
    <zz-swipe :imgs="imgs" :show-indicators="false" :show-whole-img="true" :auto="3000" :disable-custom="true"></zz-swipe>

    <p class="not-first">＊手动播放；<br>＊非默认高度</p>
    <zz-swipe :imgs="imgs" :height="'13rem'"></zz-swipe>

</template>
<style lang="less">
    @import "Swipe.less";
</style>
<script type="text/javascript">
    import Swipe from '../../components/Swipe/Swipe.vue';
    export default{
        data(){
            return {    
                imgs: [
                    'http://pic1.58cdn.com.cn//p1/big/n_v1bl2lwkoytsuvomigzu2q_d016075a4f426d09.png', 
                    'http://pic1.58cdn.com.cn//p1/big/n_v1bj3gzsbikdhfp2rxejra_e219ad2f289ed6de.jpg?width=750&height=2113?w=360&h=1014.24',
                    'http://pic1.58cdn.com.cn//p1/big/n_v1bl2lwklxlxlvooxwzzaq_d016075a4f426d09.png']
            }
        },
        components:{
            'zz-swipe': Swipe
        }
    }
</script>