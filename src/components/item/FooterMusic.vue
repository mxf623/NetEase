<template>
    <div class="footer">
        <div class="left" @click="updateDetailShow">
            <img :src="playlist[playlistIndex].al.picUrl" alt="" class="img">
            <div class="song">
                <p class="name">{{ playlist[playlistIndex].name }}</p>
                <span class="change">横划切换上下首歌曲</span>
            </div>
        </div>
        <div class="right">
            <svg class="icon1" aria-hidden="true" v-if="isbtnShow" @click="play">
                <use xlink:href="#icon-bofang" ></use>
            </svg>
            <svg class="icon1" aria-hidden="true" v-else @click="play">
                <use xlink:href="#icon-zanting" ></use>
            </svg>
            <svg class="icon2" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playlist[playlistIndex].id}.mp3`"></audio>
        <!-- 底部弹出 -->
        <van-popup
        v-model:show="detailShow"
        position="right"
        :style="{ height: '100%',width:'100%' }"
        >
        <musicDetail :musicList="playlist[playlistIndex]" :play="play" :isbtnShow="isbtnShow" :addDuration="addDuration"></musicDetail>
        </van-popup>
    </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex';
import musicDetail from '@/components/item/musicDetail.vue';

export default{
    data(){
        return {
            interVal:0
        }
    },
    computed:{
        
    ...mapState(['playlist','playlistIndex','isbtnShow','detailShow'])
    },
    mounted(){
        console.log(this.$refs);
        //console.log(this.isbtnShow);
        this.$store.dispatch("getLyric",this.playlist[this.playlistIndex].id);
        //this.updateTime();
    },
    updated(){
        this.$store.dispatch("getLyric",this.playlist[this.playlistIndex].id);
        this.addDuration();
    },
    methods:{
        play:function(){
            if(this.$refs.audio.paused){
                this.$refs.audio.play();
                this.updateIsbtnShow(false);
                this.updateTime();
            }
            else{
                this.$refs.audio.pause();
                this.updateIsbtnShow(true);
                clearInterval(this.interVal);
            }
        },
        addDuration:function(){
            this.updateDuration(this.$refs.audio.duration)
        },

        /*定时器*/
        updateTime:function(){
            this.interVal=setInterval(() => {
                this.updateCurrentTime(this.$refs.audio.currentTime)
            }, 1000);
        },
        ...mapMutations(['updateIsbtnShow','updateDetailShow','updateCurrentTime','updateDuration'])
    },
    watch:{
        playlistIndex:function(){
            //监听下标是否发生改变
            //this.$refs.audio.autoplay=true;
            if(this.$refs.audio.paused){
                this.updateIsbtnShow(false);
                this.$refs.audio.autoplay=true;
            }
            else{
                this.$refs.audio.autoplay=true;
            }
        },
        // playlist:function(){
        //     if(isbtnShow){
        //         this.$refs.audio.autoplay=true;
        //         this.updateIsbtnShow(false);
        //     }
        // }
    },
    components:{
        musicDetail
    }
}
</script>

<style lang="less" scoped>
.footer{
    width: 100%;
    height: 50px;
    background-color: white;
    position: fixed;
    bottom: 0;
    border-top: solid 0.5px;
    display: flex;
    justify-content: space-between;
    .left{
        width: 70%;
        height: 100%;
        display: flex;
        padding-left: 10px;
        padding-top: 5px;
        .img{
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 100%;
        }
        .song{
            padding-left: 10px;
            .name{
                font-weight: 900;
            }
            .change{
                font-weight: 100;
                font-size: small;
            }
        }
    }
    .right{
        padding-top: 5px;
        padding-right: 5px;
        .icon1,.icon2{
            width: 37px;
            height: 37px;
        }
        .icon1{
            padding-right: 5px;
        }
    }
}
</style>