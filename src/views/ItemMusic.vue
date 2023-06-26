<template>
    <ItemMusicTop :playlist="state.playlist"/>
    <ItemMusicList :ItemList="state.ItemList" :subscribedCount="state.playlist.subscribedCount"/>
</template>

<script>
    import {useRoute} from 'vue-router'
    import {onMounted, reactive} from 'vue'
    import {getMusicItemList,getMusicItem} from '@/request/api/item.js'
    import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
    import ItemMusicList from '@/components/item/ItemMusicList.vue'
    export default{
        setup(){
            const state=reactive({
                playlist:{},
                ItemList:{}
            });
            onMounted(async()=>{
                let id=useRoute().query.id;
                console.log(id);
                let res=await getMusicItemList(id);
                console.log(res);
                state.playlist=res.data.playlist;
                //获取歌单歌曲
                let result=await getMusicItem(id);
                console.log(result);
                state.ItemList=result.data.songs;
                //防止刷新数据丢失
                sessionStorage.setItem('itemDetail',JSON.stringify(state));
            });
            return {state}
        },
        components:{
            ItemMusicTop,
            ItemMusicList
        }
    }
</script>
