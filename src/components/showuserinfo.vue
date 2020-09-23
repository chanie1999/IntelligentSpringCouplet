<template>
    <div style="margin-top:4%">
        <!-- 
            获取用户信息
            name = user_name
            id = user_id
            number = user_number
         -->
       <div>姓名：{{ name }}</div><br>
       <div>I D：{{ id }}</div> <br>
       <div>电话：{{ number }}</div><br><br><br>
	   <el-button type="primary" @click="addRoute" >修改</el-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name:' ',
            id:' ',
            number:' '
        }
    },
    created(){        
        var i = JSON.parse(localStorage.getItem('login-data')).userId ;
        this.id = i;
        // console.log(i);
        // console.log(window.localStorage['token'])
        this.$axios.get('/user/get-info?id='+i,
                        {
                            headers: {
                                'token':window.localStorage['token']}
                        })
                   .then(
                       res => {
                           if(res.data.code === 1){
                            this.name = res.data.data.name;
                            this.number = res.data.data.tel;
                            // console.log(res.data.data.name + res.data.data.tel)  
                           }
                       }
                   );
    },
    methods: {
        addRoute(){
            this.$router.push('/changeuserinfo')
        }
    }
}
</script>