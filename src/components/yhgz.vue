<template>
    <div class="container"><br>
      <!-- <changeuserinfo></changeuserinfo> -->
      <!-- <showuserinfo></showuserinfo> -->
      <router-view></router-view>
    </div>
</template>

<script>
import changeuserinfo from '@/components/yonghugezi'
import showuserinfo from '@/components/showuserinfo'


export default {
    components:{
        changeuserinfo,
        showuserinfo
    }
}
</script>
