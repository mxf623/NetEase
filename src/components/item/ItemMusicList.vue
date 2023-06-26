<template>
    <div class="list">
        <div class="top">
            <svg class="icon1" aria-hidden="true">
            <use xlink:href="#icon-bofang1"></use>
        </svg>
        <p class="playAll">播放全部</p>
        </div>
        
        <div v-for="(song,i) in ItemList" :key="i" class="songList">
            <div class="left" @click="playmusic(i)">
                {{ i+1 }}
                {{song.name}}
            </div>
            <div class="right">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liebiao2"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

    export default{
        setup(props){
            console.log(props);
            // if(props.songs.ar=""){
            //     props.songs.ar=JSON.parse(sessionStorage.getItem().songs).ar;
            // }
        },
        props:['ItemList','subscribedCount'],
        methods:{
            playmusic:function(i){
                this.updatePlaylist(this.ItemList);
                this.updatePlaylistIndex(i);
            }, 
            ...mapMutations(['updatePlaylist','updatePlaylistIndex'])
        }
    }
</script>

<style lang="less" scoped>
.list{
    width: 100%;
    padding: 10px;
    border-top: solid;
    border-color: rgb(180, 179, 179);
    border-width: 1px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    .top{
        width: 100%;
        display: flex;
        align-items: center;
        .playAll{
            padding-left: 10px;
            font-size: large;
        }
        .icon1{
            width: 30px;
            height: 30px;
        }
    }
    .songList{
        width: 100%;
        padding-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left{
            color: rgb(63, 63, 64);
        }
    }
}
</style>