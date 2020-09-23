<template>
    <div class="container" style="width:100%;height:340px">
        
       <el-form style="width: 480px; margin-left: 650px; margin-right: 0;" label-width="100px">
           <el-form-item style="height: 40px;" label="类别"><el-input v-model="category"></el-input></el-form-item>
           <el-form-item style="height: 40px;" label="组别"><el-input v-model="group"></el-input></el-form-item>
           <el-form-item style="height: 40px;" label="上联"><el-input  v-model="question"></el-input></el-form-item>
           <el-form-item style="height: 40px;" label="下联"><el-input v-model="answer"></el-input></el-form-item>
           <el-form-item style="height: 40px;">
               <el-button type="primary" @click="submit">提交</el-button>
               <el-button type="primary" @click="comeback">返回</el-button>
           </el-form-item>
       </el-form> 
    </div>
</template>

<script>
export default {
    data(){
        return{
            category:"",
            group:"",
            question:"",
            answer:""
        }
    },
    methods:{
        comeback(){
            this.$router.push('swiper');
        },
        submit(){
            //添加菜单(春联类别和组别)
            // this.$axios.post('/menu/add',
            // {
            //     "category":this.category,
            //     "group":this.group
            // },
            // {
            //     headers: {'token':window.localStorage['token']}
            // })
            // .then(
            //     res => {
            //         console.log(res)
            //     if (res.data.code === 1) {
            //         console.log('添加菜单成功');
            //     }
            //     else{
            //         console.log('添加菜单失败');
            //     }
            // })

            //提交并保存春联
            this.$axios.post('/chunlian/add',
            {
                "category": this.category,
                "group": this.group,
                "question": this.question,
                "answer": this.answer
            },
            {
                headers: {'token':window.localStorage['token']}
            })
            .then(
                res => {
                    console.log(res);
                    if(res.data.code === 1){
                        this.$message({
                            type: 'success',
                            message: '春联添加成功'
                        });
                        //跳转回春联页面
                        this.$router.push('swiper');
                    }else{
                        this.$message({
                            type: 'error',
                            message: '春联添加失败'
                        });
                    }
                }
            );
            
        }
    }
}
</script>