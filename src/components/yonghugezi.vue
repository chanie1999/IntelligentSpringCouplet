<template>
    <el-form style="width: 480px; margin-left: 650px; margin-right: 0;" label-width="100px" class="demo-ruleForm">
		<el-form-item style="margin-top: 50px; height: 40px;" label="姓名" prop="name"><el-input type="text" v-model="name" auto-complete="off"></el-input></el-form-item>
		<el-form-item style="height: 40px;" label="I D" prop="id"><el-input type="text" v-model="id" auto-complete="off"></el-input></el-form-item>
        <el-form-item style="height: 40px;" label="电话" prop="num"><el-input type="text" v-model="number" auto-complete="off"></el-input></el-form-item>
		<el-form-item>
			<el-button type="primary" @click="addRoute" >保存</el-button>
		</el-form-item>
	</el-form>
    <!-- 
        提交用户内容
     -->
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
        console.log(localStorage.getItem('token'));
        var i = JSON.parse(localStorage.getItem('login-data')).userId ;
        this.id = i;
        this.$axios.get('/user/get-info?id='+i,
                        {
                            headers: {'token':window.localStorage['token']}
                        })
                   .then(
                       res => {
                           if(res.data.code === 1){
                            this.name = res.data.data.name;
                            this.number = res.data.data.tel;  
                            // console.log(res.data.data.name + res.data.data.tel);
                           }
                       }
                   );
    },
    methods: {
        addRoute(){
            this.$axios.put('/user/update',
                {"id": this.id,
                 "name": this.name,
                 "tel": this.number,
                 "role":"1"
                },
                {
                  headers: {'token':window.localStorage['token']}
                }).then(
                 res => {
                     console.log(res);
                     if (res.data.code === 1) {
                        this.$message({
                            type:'success',
                            message:'修改成功'
                        });
                        this.$router.push('/showuserinfo');                       
                     }
                     else{
                        this.$message({
                            type:'error',
                            message:'修改失败'
                        })    
                     }
                 }
                );
            ;
            
        }
    }
}
</script>