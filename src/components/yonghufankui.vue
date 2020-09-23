<template>
    <div>用户反馈<br>
        <textarea placeholder="请输入..."
        maxlength="120" v-model="msg"></textarea>
        <br>
        <el-button style="margin-top: 20px;margin-left:auto;" type="primary" size="large" @click="postComment">发表评论</el-button>
        <el-button style="margin-top: 20px;margin-left:auto;" type="primary" size="large" @click="gotoCommentarea">查看评论</el-button>
    </div>
</template>
<script>
export default {
     data(){
        return {
            msg: " "
        };
    },
    methods: {
        gotoCommentarea(){
            this.$router.push('commentarea');
        },
        postComment(){
            //校验是否为空内容
            if(this.msg.trim().length === 0){
                this.$message({
                     type:'error',
                     message:'内容为空，无法提交'
                 });
            }
            else{
                let i = JSON.parse(localStorage.getItem('login-data')).userId
                this.$axios.post('/feedback/add',
                            {
                             "userId": i,
                             "feedbackText": this.msg,
                             "feedbackVisible": "true"
                            }
                            ,{
                               headers: {'token':window.localStorage['token']}
                            }
                            )
                           .then(
                               res => {
                                   console.log(res)
                               if(res.data.code === 1){
                                   this.$message(
                                       {
                                           type:'success',
                                           message:'提交反馈成功'
                                       });
                               }else{
                                   this.$message(
                                       {
                                           type:'error',
                                           message:'提交反馈失败'
                                       });
                               }
                           });
            }    
        }
    }
}
</script>


<style>
    textarea{
        font-size: 14px;
        width: 539px;
        height: 175px;
        margin-top: 30px;
        /* margin-left: 20px; */
    }

</style>