<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多 ></div>
        </div>
        <div>
            <van-swipe :loop="false" :width="150" :show-indicators="false" class="mySwipe">
                <van-swipe-item v-for="item in musicList" :key="item">
                    <router-link :to="{path:'/itemMusic',query:{id:item.id}}">
                    <img :src="item.picUrl" alt="">
                    <span class="playNum">
                        <svg class="icon" aria-hidden="true" fill="white">
                            <use xlink:href="#icon-24gl-playCircle"></use>
                        </svg>
                        {{ Calcul(item.playCount) }}
                    </span>
                    <span class="name">{{ item.name }}</span>
                </router-link>
                </van-swipe-item>
              </van-swipe>
        </div>
    </div>
</template>

<script>
import { getMusicList } from '../../request/api/home';

export default{
    data(){
        return {musicList:[]}
    },
    methods:{
        async getList(){
            let res=await getMusicList();
            console.log(res);
            this.musicList=res.data.result;

        },
        Calcul:function(num){
            if(num>=100000000){
                return (num/100000000).toFixed(1)+"亿";
            }
            else if(num>=10000){
                return (num/10000).toFixed(1)+"万";
            }
        }
    },
    mounted(){
        this.getList();
    }
}
</script>

<style lang="less" scoped>
.musicList{
    width: 100%;
    height: 3rem;
    padding: 0.2rem 0.3rem;
    .musicTop{
        width: 100%;
        height: 0.5rem;
        display: flex;
        justify-content: space-between;
        .title{
            font-weight:900;
            font-size: large;
        }
        .more{
            border: 1px solid #d0c6c6;
            border-radius: 10px;
            text-align: center;
            padding: 0 0.15rem;
        }
    }
    .mySwipe{
        width: 100%;
        height: 4rem;
        img{
            width: 100%;
            height: 2.8rem;
            border-radius: 10%;
            padding-right: 4px;
        }
        .playNum{
            position: relative;
            left: 36%;
            top: -70%;
            color: white;
            display: flex;
            align-items: center;
        }
        .name{
            position: relative;
            top: -10%;
        }
    }
}

</style>