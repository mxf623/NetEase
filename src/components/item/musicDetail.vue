<template>
    <img :src="musicList.al.picUrl" alt="" class="pic">
    <div class="top">
        <div class="TopLeft">
            <svg class="icon0" aria-hidden="true" @click="backHome">
                <use xlink:href="#icon-arrowLeft"></use>
            </svg>
            <div class="detail">
                <Vue3Marquee class="name">
                    {{ musicList.name }}
                </Vue3Marquee>
                <div class="auth">
                    <span v-for="item in musicList.ar" :key="item" class="author">
                        {{ item.name }}
                    </span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="TopRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
        </div>
    </div>
    <div class="content" v-show="!isLyricShow">
        <img src="@/assets/needle-ab.png" alt="" class="img_ab" :class="{img_ab_:!isbtnShow}">
        <img src="@/assets/circle.png" alt="" class="img_cd">
        <img :src="musicList.al.picUrl" alt="" class="cover" :class="{img_c_:!isbtnShow,img_c__:isbtnShow}" @click="isLyricShow=true">
    </div>
    <div class="lyrics" ref="lyrics" v-show="isLyricShow">
        <p v-for="item in lyric_func" :key="item" 
        :class="{active:(currentTime*1000>=item.time&&currentTime*1000<item.pre)}">
            {{ item.lrc }}
        </p>
    </div>
    <div class="bottom">
        <div class="one">
            <div>
                <svg class="icon1" aria-hidden="true">
                    <use xlink:href="#icon-xihuan"></use>
                </svg>
            </div>
            <div>
                <svg class="icon1" aria-hidden="true">
                    <use xlink:href="#icon-download"></use>
                </svg>
            </div>
            <div>
                <svg class="icon1" aria-hidden="true">
                    <use xlink:href="#icon-yinlechangpian"></use>
                </svg>
            </div>
            <div>
                <svg class="icon1" aria-hidden="true">
                    <use xlink:href="#icon-xiaoxi"></use>
                </svg>
            </div>
            <div>
                <svg class="icon1" aria-hidden="true">
                    <use xlink:href="#icon-liebiao"></use>
                </svg>
            </div>
        </div>
        
        <div class="footer">
            <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
        </div>
        <div class="three">
            <div>
                <svg class="icon1" aria-hidden="true">
                    <use xlink:href="#icon-24gl-repeatOnce2"></use>
                </svg>
            </div>
            <div>
                <svg class="icon1" aria-hidden="true" @click="goPlay(-1)">
                    <use xlink:href="#icon-shangyishoushangyige"></use>
                </svg>
            </div>
            <div>
                <svg class="icon1" aria-hidden="true" v-if="isbtnShow" @click="play">
                    <use xlink:href="#icon-bofang" ></use>
                </svg>
                <svg class="icon1" aria-hidden="true" v-else @click="play">
                    <use xlink:href="#icon-zanting" ></use>
                </svg>
            </div>
            <div>
                <svg class="icon1" aria-hidden="true" @click="goPlay(1)">
                    <use xlink:href="#icon-xiayigexiayishou"></use>
                </svg>
            </div>
            <div>
                <svg class="icon1" aria-hidden="true">
                    <use xlink:href="#icon-zu"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import {Vue3Marquee} from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations,mapState } from 'vuex';

    export default{
        data(){
            return{
                isLyricShow:false
            }
        },
        props:['musicList','play','isbtnShow','addDuration'],
        mounted(){
        console.log(this.musicList);
        console.log(this.lyricList.lyric);
        this.addDuration();
        },
        computed:{
            ...mapState(['lyricList','currentTime','playlistIndex','playlist','duration']),
            lyric_func:function(){
                let arr;
                if(this.lyricList.lyric){
                    arr=this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{
                        let min=item.slice(1,3);
                        let sec=item.slice(4,6);
                        let mill=item.slice(7,10);
                        let lrc=item.slice(11,item.length)
                        let time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill);

                        if(isNaN(Number(mill))){
                            mill=item.slice(7,9);
                            lrc=item.slice(11,item.length);
                            time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill);
                        }
                        //console.log(min,sec,mill,lrc);
                        return {min,sec,mill,lrc,time};
                    })
                    arr.forEach((item,i)=>{
                        if(i===arr.length-1){
                            item.pre=0;
                        }
                        else{
                            item.pre=arr[i+1].time;
                        }
                    })
                }
                //console.log(arr.time);
                return arr;
            }
        },
        components:{
            Vue3Marquee
        },
        methods:{
            ...mapMutations(['updateDetailShow','updatePlaylistIndex']),
            backHome:function(){
                this.isLyricShow=false;
                this.updateDetailShow();
            },
            goPlay:function(num){
                let index=this.playlistIndex+num;
                if(index<0){
                    index=this.playlist.length-1;
                    console.log(this.playlist.length);
                    console.log(index);
                }
                else if(index==this.playlist.length){
                    index=0;
                }
                this.updatePlaylistIndex(index);
            }
        },
        watch:{
            currentTime:function(newValue){
                let p=document.querySelector("p.active");
                console.log([p]);
                if(p&&p.offsetTop>300){
                    this.$refs.lyrics.scrollTop=p.offsetTop-300;
                }
                if(newValue===this.duration){
                    if(this.playlistIndex===this.playlist.length-1){
                        this.updatePlaylistIndex(0);
                        this.play();
                    }
                    else{
                        this.updatePlaylistIndex(this.playlistIndex+1);
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.pic{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(90px);
}
.top{
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .TopLeft{
        display: flex;
        align-items: center;
        .icon{
            width: 0.3rem;
            height: 0.3rem;
            fill: rgb(175, 170, 170);
        }
        .icon0{
            width: 0.63rem;
            height: 0.63rem;
            fill: white;
        }
        .auth{
            display: flex;
            align-items: center;
        }
        .name{
            width: 2rem;
            margin-top: 15px;
            margin-left: 10px;
            font-size: large;
            color: rgb(78, 77, 77);
        }
        .author{
            margin-left: 10px;
            font-size: small;
            color: rgb(106, 104, 104);
        }
    }
}
.content{
    width: 100%;
    height: 12rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: 25px;
    .img_ab{
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-12deg);
        transition: all 2s;
    }
    .img_ab_{
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(0deg);
        transition: all 2s;
    }
    .img_cd{
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 5.35rem;
        z-index: -1;
    }
    .cover{
        width: 3.2rem;
        height: 3.2rem;
        position: absolute;
        border-radius: 50%;
        bottom: 6.2rem;
        animation: rotate_ar 10s linear infinite;
    }
    .img_c_{
        animation-play-state: running;
    }
    .img_c__{
        animation-play-state: paused;
    }
    @keyframes rotate_ar {
        0%{
            transform: rotateZ(0deg);
        }
        100%{
            transform: rotateZ(360deg);
        }
    }
}
.lyrics{
    width: 100%;
    height: 12rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    overflow: scroll;
    p{
        color: rgb(160, 159, 159);
        margin-bottom: 10px;
    }
    .active{
        color: white;
        font-size: 30px;
    }
}
.bottom{
    width: 100%;
    height: 7rem;
    padding-bottom: 20px;
    //display: flex;
    // flex-direction: column;        
    //align-items: center;
    .one{
        display: flex;        
        align-items: center;
        justify-content: space-between;
        color: black;
        //margin-left: 30px;
        padding-top: 10px;
    }
    .footer{
        margin-top: 0px;
    }
    .range{
        width: 100%;
        height: 0.06rem;
    }
    .three{
        display: flex;        
        justify-content: space-between;
        align-items: center;
        fill: black;
        //margin-left: 30px;
        padding-top: 15px;
    }
    .icon1{
        width: 0.6rem;
        height: 0.6rem;
    }
}
</style>