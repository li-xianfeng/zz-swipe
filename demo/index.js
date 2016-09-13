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