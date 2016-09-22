
# ZZ-Swipe

基于 `Vue` 的 `swipe` 组件，依赖`vue-touch`

## Demo
``` 
1. npm install  
2. npm run demo
3. 浏览器运行dist/index.html
```
## Usage

``` 
1. 安装：npm install zz-swipe
2. 项目使用： 
import VueTouch from 'vue-touch';
import Swipe from 'zz-swipe';
Vue.use(VueTouch); 
new Vue({
    el: '#app',
    components: {
        'zz-swipe': Swipe
    },
    data: function(){
        return {    
            imgs: [
                'http://pic1.58cdn.com.cn/1.png', 
                'http://pic1.58cdn.com.cn/2.xpng',
                'http://pic1.58cdn.com.cn/3.png'
                ]
        }
    },
    template: '<div><zz-swipe :imgs="imgs" height="13rem"></zz-swipe></div>'
});
```

##Config(props)
  
| Name          | Type          | Default  | Description |
|:-------------:|:-------------:|:--------:|:-----------:|
| imgs     | `Array`  | `[]` | 图片url，单张图片不建议使用本组件 |
| auto     | `Number`| `0`| 设置自动轮播interval时间，<=duration不启用自动轮播(建议auto > duration+500) |
| disableCustom | `Boolean` | `false`| 是否禁用手动轮播 |
| duration | `Number` | `600` | 轮播滑动过程耗时，毫秒 |
| height | `String` | `8rem` | 轮播框高度,需带上单位 |
| showIndicators | `Boolean` | `true` | 是否显示底部小圆点 |
| indicatorsColor | `String` | `#dbd8d8` | 圆点默认颜色 |
| indicatorsActiveColor | `String` | `#ffffff` | 正在展示的图片对应圆点的颜色 |
| indicatorsPosition | `String` | `0.53rem` | 圆点位置（离图片底部距离）|
| indicatorsSize | `String` | `0.53rem` | 圆点尺寸（直径） |
| indicatorsSpacing | `String` | `0.53rem` | 圆点之间的距离 |
| showWholeImg | `Boolean` | `false` | false默认图片居中显示；true图片长宽设为100%，显示全图，但图片变形，不建议使用 |