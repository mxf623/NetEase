import { createStore } from 'vuex'
import {getLyrics} from '@/request/api/item.js'

export default createStore({
  state: {
    playlist:[{
      al:{
        //默认值
        id:131787524,
        name:"故事该从何说起",
        pic:109951166604153980,
        picUrl:"https://p2.music.126.net/Rkq3enCjxi42WfG0fF3LcA==/109951166604153981.jpg",
        pic_str:"109951166604153981"
      },
      id:1869529716,
      name:"故事该从何说起"
    }],
    playlistIndex:0,
    isbtnShow:true,//暂停按钮
    detailShow:false,
    lyricList:{

    },//歌词
    currentTime:0,//当前时间
    duration:0,//总时长
  },
  mutations: {
    updateIsbtnShow:function(state,value){
      state.isbtnShow=value;
    },
    updatePlaylist:function(state,value){
      state.playlist=value;
    },
    updatePlaylistIndex:function(state,value){
      state.playlistIndex=value;
    },
    updateDetailShow:function(state){
      state.detailShow=!state.detailShow;
    },
    updateLyricList:function(state,value){
      state.lyricList=value;
    },
    updateCurrentTime:function(state,value){
      state.currentTime=value;
      console.log(state.currentTime);
    },
    updateDuration:function(state,value){
      state.duration=value;
    },
    pushPlayList:function(state,value){
      state.playlist.push(value);
    },
  },
  actions: {
    getLyric:async function(context,value){
      let lyric=await getLyrics(value);
      console.log(lyric);
      context.commit("updateLyricList",lyric.data.lrc);
    }
  },
  modules: {
  }
})
