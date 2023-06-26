<template>
    <div>
        <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="image in state.images" :key="image">
          <img :src="image.pic" />
        </van-swipe-item>
      </van-swipe>    
    </div>
</template>

<script>
import axios from 'axios';
import {reactive, onMounted } from 'vue';
import {getBanner} from '@/request/api/home.js'
export default {
    setup() {
    const state=reactive({
      images:[
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ]
    })
    
    onMounted(async()=>{
        // axios.get("http://localhost:3000/banner?type=2").then((res)=>{
        //   console.log(res);
        //   state.images=res.data.banners;
        //   console.log(state.images);
        // })
        let res=await getBanner();
        state.images=res.data.banners;
    }
    )
    return {state};
  },
};

</script>

<style lang="less" scoped>
    .van-swipe{
        width: 100%;
        .van-swipe__track{
            .van-swipe-item{
              padding: 0 0.2rem;
                img{
                    width: 100%;
                    height: 3.5rem;
                    border-radius: 10px;
                }
            }
        }
    }
</style>