<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{
 background-size: 100% 100%;
 background-repeat: no-repeat;
 background-attachment: fixed;
 background-image: url(./assets/SpringFestival.jpg); 
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 14%; 
  
}
</style>
