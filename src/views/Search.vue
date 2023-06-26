<template>
    <div class="top">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-arrowLeft"></use>
        </svg>
        <input type="text" name="" id="" v-model="searchKey" placeholder="汪苏泷" @keydown.enter="enterKey">
    </div>
    <div class="history">
        <p>搜索历史</p>
        <span v-for="item in keyWordList" :key="item" @click="searchHistory(item)">
            {{item}}
        </span>
        <svg class="delete" aria-hidden="true" @click="delHistory">
            <use xlink:href="#icon-shanchu"></use>
        </svg>
    </div>
    <div v-for="(song,i) in searchList" :key="i" class="songList">
            <div class="left" @click="updateIndex(song)">
                {{ i+1 }}
                {{song.name}}
            </div>
            <div class="right">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liebiao2"></use>
                </svg>
            </div>
        </div>
</template>

<script>
import { getSearchList } from "@/request/api/home.js";
export default{
    data(){
        return{
            keyWordList:[],
            searchKey:"",
            searchList:[]
        }
    },
    mounted(){
        this.keyWordList=JSON.parse(localStorage.getItem('keyWordList'))?JSON.parse(localStorage.getItem('keyWordList')):[];
    },
    methods:{
        enterKey:async function(){
            if(this.searchKey!=""){
                this.keyWordList.unshift(this.searchKey);
                this.keyWordList=[...new Set(this.keyWordList)];
                if(this.keyWordList.length>7){
                    this.keyWordList.splice(this.keyWordList.length-1);
                }
                localStorage.setItem("keyWordList",JSON.stringify(this.keyWordList));
                //console.log(this.searchKey);
                let res=await getSearchList(this.searchKey);
                this.searchList=res.data.result.songs;
                this.searchKey="";
                console.log(res);
            }
        },
        delHistory:function(){
            localStorage.removeItem("keyWordList");
            this.keyWordList=[];
        },
        searchHistory:async function(item){
            let res=await getSearchList(item);
            console.log(res);
            this.searchList=res.data.result.songs;
        },
        updateIndex:function(item){
            item.al=item.album;
            item.al.picUrl=item.album.artist.img1v1Url;
            this.$store.commit("pushPlayList",item);
            this.$store.commit("updatePlaylistIndex",this.$store.state.playlist.length-1);
        }
    }
}
</script>
<style lang="less" scoped>
.top{
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    input{
        margin-left: 20px;
        border: none;
        border-bottom: 1px solid #999;
        width: 95%;
        padding: 5px;
    }
}
.history{
    width: 100%;
    padding: 10px;
    position: relative;
    // display: flex;
    // align-items: center;
    p{
        font-size: 15px;
        font-weight: 600;
    }
    span{
        padding: 5px 10px;
        background-color: #cfbebe;
        border-radius: 20px;
        margin: 7px;
        display: inline-block;
    }
    .delete{
        width: 25px;
        height: 25px;
        position: absolute;
        right: 10px;
    }
}
.songList{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        .left{
            color: rgb(63, 63, 64);
        }
    }
</style>