<template>
    <div class="zzui-swipe-container" v-touch:swipeleft="swipeleftHandler" v-touch:swiperight="swiperightHandler" :style="{height: height}">
        <div class="zzui-swipe-imgs" :style="{width: imgsWidth, left: initLeft}" v-el:swipe>
            <!-- 最后一张，左滑到头时替补 -->
            <div :class="{'zzui-swipe-item': true, 'zzui-show-whole': showWholeImg}" :style="{width: width + 'px', backgroundImage: 'url(' + imgs[imgs.length-1] + ')'}" @click="clickHandler(imgs.length-1)">
            </div>
            
            <!-- 真正显示的列表 -->
            <div v-for="item in imgs" :class="{'zzui-swipe-item': true, 'zzui-show-whole': showWholeImg}" @click="clickHandler($index)" :style="{width: width + 'px', backgroundImage: 'url(' + item + ')'}">
            </div>
            
            <!-- 最后一张，右滑到尾时替补 -->
            <div :class="{'zzui-swipe-item': true, 'zzui-show-whole': showWholeImg}" @click="clickHandler(0)" :style="{width: width + 'px', backgroundImage: 'url(' + imgs[0] + ')'}">
            </div>
        </div>

        <!-- 小圆点 -->
        <div class="zzui-swipe-points" v-if="showIndicators && isMultiple" :style="{bottom: indicatorsPosition}">
            <span class="zzui-swipe-point" v-for="item in imgs" :style="{backgroundColor: ($index == currentIndex ? indicatorsActiveColor : indicatorsColor), width: indicatorsSize, height: indicatorsSize, margin: spacingVal}"></span>
        </div>
    </div>
</template>
<style lang="less" >
    .zzui-swipe-container{
        width: 100%;
        overflow: hidden;
        position: relative;
    }
    .zzui-swipe-imgs{
        height:100%;
        position: absolute;
        left: 0;
    }
    .zzui-swipe-item{
        height: 100%;
        float: left;
        position: relative;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
    }
    .zzui-show-whole{
        background-size: 100% 100%;
    }
    .zzui-swipe-points{
        position: absolute;
        bottom: 0.53rem;
        left: 50%;
        z-index: 10;
        transform: translate(-50%, 0);
    }
    .zzui-swipe-point{
        display:inline-block;
        width: 0.53rem;
        height: 0.53rem;
        border-radius: 50%;
        margin: 0 0.1325rem 0 0.1325rem;
    }
</style>
<script>
import vueTouch from 'vue-touch';
export default {
    data (){
        return {
            currentIndex: 0,
            currenTranslateX: 0,
            isAmaniting: false
        }
    },

    props: {
        imgs: {
            type: Array,
            default: ()=>{
                return []
            }
        },
        /*
         * 是否开启自动轮播
         */
        auto: {
            type: Number,
            default: 0
        },
        /*
         * 是否禁用手动轮播
         */
        disableCustom: {
            type: Boolean,
            default: false
        },
        /*
         * 轮播滑动过程耗时
         * 单位：ms
         */
        duration: {
            type: Number,
            default: 600
        },
        /*
         * 轮播框高度
         * 单位：rem || px
         */
        height: {
            type: String,
            default: '8rem'
        },
        /*
         * 针对不规则图片（长宽比不等于container长宽比）
         * false默认居中显示，只显示图片中间部分；
         * true图片长宽设为100%，显示全貌，但图片变形，不建议使用
         */
        showWholeImg: {
            type: Boolean,
            default: false
        },
        /*
         * 是否显示底部小圆点
         */
        showIndicators: {
            type: Boolean,
            default: true
        },
        /*
         * 圆点默认颜色
         */
        indicatorsColor: {
            type: String,
            default: '#dbd8d8'
        },
        /*
         * 正在展示的图片对应圆点的颜色
         */
        indicatorsActiveColor: {
            type: String,
            default: '#ffffff'
        },
        /*
         * 圆点位置（离底部高度）
         */
        indicatorsPosition: {
            type: String,
            default: '0.53rem'
        },
        /*
         * 圆点尺寸
         */
        indicatorsSize: {
            type: String,
            default: '0.53rem'
        },
        /*
         * 圆点之间的距离
         */
        indicatorsSpacing: {
            type: String,
            default: '0.53rem'
        }
    },

    computed: {
        /*
         * 单张图片宽度（占满整行）
         */
        width(){
            return document.documentElement.clientWidth;
        },
        initLeft (){
            return -this.width + 'px';
        },
        /*
         * 图片容器总宽度
         */
        imgsWidth (){
            let length = this.imgs.length;
            return this.width * (length+2) + 'px';
        },
        /*
         * 是否多张图片
         */
        isMultiple (){
            return this.imgs.length > 1;
        },
        /*
         * 图片容器总宽度
         */
        spacingVal (){
            let val = this.indicatorsSpacing,
                num = /^[\d\.]+/g.exec(val)[0],
                unit = val.replace(num, '');

            return '0 ' + parseFloat(num)/2 + unit + ' 0 ' + parseFloat(num)/2 + unit;
        }
    },

    watch: {
        /*
         * 每次滑动为transform属性设置新的translate值
         */
        currenTranslateX (val){
            this.setTransform(this.$els.swipe, 'translate3d(' + val + ',0,0)');
        }
    },

    ready (){
        /*
         * 初始化自动轮播功能
         */
        if(this.auto)this.initAuto();
    },

    methods: {
        swipeleftHandler (e){
            if(this.disableCustom)return;
            this.swipeImg('left');
        },
        swiperightHandler (e){
            if(this.disableCustom)return;
            this.swipeImg('right');
        },
        /*
         * 父组件可监听clickswipe事件处理图片点击
         * @params [Number] index 目标图片的index
         */
        clickHandler (index){
            this.$dispatch('clickswipe', index);
        },
        initAuto(){
            setInterval(()=>{
                this.swipeImg('left');
            }, this.auto);
        },
        /*
         * 通过translate移动图片container实现图片切换效果
         */
        swipeImg (type){
            if(this.isAmaniting)return;

            let swipeWidth = this.width,
                currentIndex = this.currentIndex,
                childrenCount = this.imgs.length,
                swipe = this.$els.swipe;

            this.setTransition(swipe, 'transform ' + this.duration + 'ms ease-in-out');

            if(type=='left'){
                this.currentIndex += 1;
            }else{
                this.currentIndex -= 1;

            }

            this.isAmaniting = true;
            this.currenTranslateX = -1 * (this.currentIndex) * swipeWidth + 'px';
            setTimeout(()=>{
                this.isAmaniting = false;
            },this.duration);

            // 滑到最后一张替补图切换第一张
            if(this.currentIndex == childrenCount)this.resetBoundaryImg('left');

            // 换到开始一张替补图切换最后一张
            if(this.currentIndex < 0)this.resetBoundaryImg('right');
        },
        /*
         * 边界图片设置
         * transform同
         */
        resetBoundaryImg (direction){
            let newIndex = 0,
                swipe = this.$els.swipe,
                childrenCount = this.imgs.length;

            if(direction === 'right')newIndex = childrenCount-1;

            this.currentIndex = newIndex;
            setTimeout(()=>{
                this.setTransition(swipe, 'transform 0ms ease-in-out');
                this.currenTranslateX = (-this.width) * newIndex + 'px';
            },this.duration);

        },
        /*
         * transition添加浏览器前缀
         * transform同
         */
        setTransition (ele, val){
            ele.style.transition = val;
            ele.style.WebkitTransition = '-webkit-' + val;
            ele.style.MozTransition = '-moz-' + val;
            ele.style.OTransition = '-o-' + val;
        },
        setTransform (ele, val){
            ele.style.transform = val;
            ele.style.WebkitTransform = val;
            ele.style.MozTransform = val;
            ele.style.OTransform = val;
        }
    }
}
</script>
