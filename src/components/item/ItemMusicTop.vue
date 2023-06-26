<template>
    <div class="ItemMusicTop">
        <img :src="playlist.coverImgUrl" alt="" class="bg">
        <div class="ItemLeft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-arrowLeft"></use>
            </svg>
            <span class="content">歌单</span>
        </div>
        <div class="ItemRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao2"></use>
            </svg>
        </div>
    </div>
    <div class="Mid">
        <img :src="playlist.coverImgUrl" alt="" class="cover">
        <div class="Intro">
            <div class="name">{{ playlist.name }}</div>
            <div class="author">
                <img :src="playlist.creator.avatarUrl" alt="" class="avatar">
                <span class="nickname">{{playlist.creator.nickname}} ></span>
            
            </div>
            <div class="description">
                {{ playlist.description }}
            </div>
        </div>
    </div>
    <div class="bottom">
        <div>
            <svg aria-hidden="true" class="comment">
                <use xlink:href="#icon-xiaoxi"></use>
            </svg>
        </div>
        <div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
        </div>
        <div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-download"></use>
            </svg>
        </div>
        <div>
            <svg class="choice" aria-hidden="true">
                <use xlink:href="#icon-checkbox"></use>
            </svg>
        </div>
    </div>
</template>

<script>
    export default{
        setup(props){
            // console.log(props);
            //如果props获取不到就取session中的
            if(props.playlist.creator=""){
                props.playlist.creator=JSON.parse(sessionStorage.getItem().playlist).creator;
            }
        },
        props:['playlist']
    }
</script>

<style lang="less" scoped>
.ItemMusicTop{
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    //padding: 0.2rem;
    position: relative;
    .ItemLeft,.ItemRight{
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        margin: 10px;
        align-items: center;
        .content{
            font-size: large;
            font-family: fantasy;
            color: rgb(99, 96, 96);
        }
        .icon{
            fill: #fff;
        }
    }
    .bg{
        width: 100%;
        height: 7rem;
        position: fixed;
        z-index: -1;
        filter: blur(30px);
        
    }
}
.Mid{
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    .cover{
        width: 40%;
        height: 100%;
        border-radius: 10%;
        z-index: -1;
        padding-left: 10px;
    }
    .Intro{
        width: 100%;
        padding-right: 10px;
        .name{
            width: 100%;
            padding: 10px;
            color: white;
        }
        .description{
            width: 100%;
            padding: 10px;
            color: rgb(177, 173, 173);
            font-size: small;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 6;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            max-height: 30%;
        }
        .author{
            display: flex;
            align-items: center;
            .avatar{
            border-radius: 100%;
            width: 25%;
            padding: 10px;
            }
            .nickname{
                color: white;
            }
        }
        
    }
}
.bottom{
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding-top: 20px;
    .comment,.choice{
        width: 30px;
        height: 30px;
    }
}
</style>