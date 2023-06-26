<template>
    <div class="topnav">
        <div class="topLeft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao2"></use>
            </svg>
        </div>
        <div class="topContent">
            <span>我的</span>
            <span class="active">发现</span>
            <span>云村</span>
            <span>视频</span>
            
        </div>
        <div class="topRight">
            <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
    </div>
</template>

<script>

</script>

<style lang="less" scoped>
    .topnav{
        width: 100%;
        height: 1rem;;
        padding: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .topContent{
        width: 70%;
        height: 100%;
        display:flex;
        justify-content: space-around;
        align-items: center;
        font-size: 18px;
        .active{
            font-weight: 900;
        }
    }
        .topLeft{
            height: -0.5rem;
        }
        .topRight{
            height: -0.5rem;
        }
    }
    
</style>