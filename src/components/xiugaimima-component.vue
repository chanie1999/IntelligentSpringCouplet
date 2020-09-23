<template>
    <el-form style="width: 480px; margin-left: 600px; margin-right: 0;" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<el-form-item style="margin-top: 50px; height: 40px;" label="旧密码" prop="oldpass"><el-input type="password" v-model="ruleForm.oldpass" auto-complete="off"></el-input></el-form-item>
		<el-form-item style="height: 40px;" label="新密码" prop="pass"><el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input></el-form-item>
        <el-form-item style="height: 40px;" label="确认新密码" prop="checkPass"><el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input></el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
    data() {

		var validatePass1 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				if (this.ruleForm.checkPass !== '') {
					this.$refs.ruleForm.validateField('checkPass');
				}
				callback();
			}
		};
 
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.ruleForm.pass) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
        };
        return{
            ruleForm: {
				oldpass: '',
				pass: '',
				checkPass: '',
				code: ''
			},
			rules: {
				pass: [{ required: true, validator: validatePass1, trigger: 'blur' }],
				checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
			}   
        }
    },
    methods:{
		//重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
        submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid
				//&&获取旧密码与输入的密码比较   prePwd === user_pwd
				//&&获取输入的新密码与重新输入的密码比较 newPwd1 === newPwd2 
				) {
					var i = JSON.parse(localStorage.getItem('login-data')).userId;
					console.log(i)
					this.$axios
						.put('/user/update-pw',
						 {
						  "id":i,
						  "oldPW":this.ruleForm.oldpass,
						  "newPW":this.ruleForm.pass
						 },
						 {
                            headers: {'token':window.localStorage['token']}
                         }
						 )
						.then(res => {
							console.log(res)
							if(res.data.code === 1){
								var local = JSON.parse(localStorage.getItem('login-data'));
								local.userPassword = this.ruleForm.pass;
								console.log(local.userPassword);
								localStorage.setItem('login-data',JSON.stringify(local));

								this.$message({
								type: 'success',
								message: '修改成功,请重新登录'
								});
								
								this.$router.push('login');
							}
							else{
								this.$message({
								type: 'error',
								message: '修改失败'
								});
							}
						});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		}
    }
}
</script>
