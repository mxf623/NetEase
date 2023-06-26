<template>
  <div class="home">
    <div>
      <TopNav/>
      <SwpierTop/>
      <IconList/>
      <musicList/>
    </div>

  </div>
</template>

<script>

import TopNav from '../components/home/TopNav.vue';
import SwpierTop from '../components/home/SwpierTop.vue';
import musicList from '../components/home/MusicList.vue';
import IconList from '../components/home/IconList.vue';
export default {
  name: 'Home',
  components: {
    TopNav,SwpierTop,IconList,musicList
  }
}
</script>
