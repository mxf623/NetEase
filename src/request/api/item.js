import service from '..';

//获取歌单详情页
export function getMusicItemList(data){
    return service({
        method:"GET",
        url:`/playlist/detail?id=${data}`
    })
}

//歌单详情内容
export function getMusicItem(data){
    return service({
        method:"GET",
        url:`/playlist/track/all?id=${data}&limit=20&offset=0`
    })
}

//获取歌词
export function getLyrics(data){
    return service({
        method:"GET",
        url:`/lyric?id=${data}`
    })
}