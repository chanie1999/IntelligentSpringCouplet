<template>
<div class="container" style="margin: 10% auto;">
<el-row class="tac">
 <el-col :span="24">
 <elmenu
  default-active="2"
  class="el-menu-vertical-demo"
  :default-openeds="['1','2']"
  >
  <el-submenu index="1">
  <template slot="title">
   <i class="el-icon-s-custom"></i>
   <span>用户</span>
  </template>
  <el-menu-item-group>
  <template slot="title"></template>
  <el-menu-item @click="goTo('/userinfo')">用户个资</el-menu-item>
  <el-menu-item @click="goTo('/xiugaimima')">修改密码</el-menu-item>
  <el-menu-item @click="goTo('/yonghufankui')">用户反馈</el-menu-item>
  </el-menu-item-group>
  </el-submenu>
  <el-submenu index="2">
  <template slot="title">
   <i class="el-icon-menu"></i>
   <span>业务</span>
  </template>
  <el-menu-item-group>
  <template slot="title"></template>
  <!-- <el-menu-item @click="goTo('/springcouplet')">智能春联</el-menu-item>  -->
  <el-menu-item @click="goTo('/swiper')">智能春联</el-menu-item> 
  </el-menu-item-group>
  </el-submenu>
 </elmenu>
 </el-col>
 <div class="page">
   <el-button circle type="danger" icon="el-icon-switch-button" @click="logout"></el-button>
   <router-view></router-view>
 </div>
</el-row>
</div>

</template>

<script>
import elmenu from '@/components/menu1';

export default {
  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    goTo(path) {
      this.$router.replace(path);
    },
    logout(){
      this.$axios.post('/user/logout',
      {
        "userId":JSON.parse(localStorage.getItem('login-data')).userId
      },
      {
        headers: {'token':window.localStorage['token']}
      })
      .then( res =>{
        console.log(res);
        if (res.data.code === 1) {
          this.$message({
            type:'success',
            message:'成功退出系统'
          });
          this.$router.push('login');
        }
      })
    }
  },
  components: {
    elmenu
  }
}
</script>

<style scoped>
.el-col {
  width: 20%;
}
.el-menu .el-submenu .el-submenu__title .el-submenu__icon-arrow
{
  visibility: hidden;
}      
.el-submenu
{
  background: rgb(245, 65, 65);
}

.page{
    width: 100%;
    height: 340px;
    background:  rgba(255, 255, 255, 0.671);
    /* background: white; */
}    
.el-button.is-circle {
    border-radius: 50%;
    padding: 5px;
    margin-left: 77%;
}
</style>