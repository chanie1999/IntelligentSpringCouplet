<template>
	<div class="login">
		<p>欢迎使用智能春联</p><hr>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="登录" name="first">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="用户" prop="name"><el-input v-model="ruleForm.name"></el-input></el-form-item>
 
					<el-form-item label="密码" prop="pass"><el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input></el-form-item>

					<el-form-item label="验证码" prop="code">
						<el-row :span="24">
 						<el-col :span="12">
						  <el-input v-model="ruleForm.code" auto-complete="off" placeholder="请输入验证码" size=""
						  @keyup.enter.native="submitForm('ruleForm')"></el-input>
						</el-col>
 						<el-col :span="12">
 						  <div class="login-code" @click="refreshCode">
 						  <s-identify :identifyCode="identifyCode" divId="s-canvas1"></s-identify>
 						  </div>
 						</el-col>
 						</el-row>
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
 
						<el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>
 
			<el-tab-pane label="注册" name="second">
				<register></register>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
 
<script>
import register from '@/components/register';
import SIdentify from '@/components/SIdentify'; 
export default {
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				if (this.ruleForm.checkPass !== '') {
					this.$refs.ruleForm.validateField('checkPass');
				}
 
				callback();
			}
		};
	    var validateCode = (rule, value, callback) => {
            let newVal = value.toLowerCase()
            let identifyStr = this.identifyCode.toLowerCase()
            if (newVal === '') {
                callback(new Error('请输入验证码'))
            } else if (newVal !== identifyStr) {
				console.log('validateVerifycode:', value)
				console.log('ifycode:', identifyStr)
				callback(new Error('验证码不正确'))
				this.refreshCode()
            } else {
                callback()
            }
        };
		return {
			activeName: 'first',
			ruleForm: {
				name: '',
				pass: '',
				code: ''
			},
			identifyCodes: '123456789abcdefghijklmnopqrstuvwxyz',
			identifyCode: '',
			rules: {
				name: [{ required: true, message: '请输入您的名称', trigger: 'blur' }, { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }],
				pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
				code: [{ required: true, validator: validateCode,trigger: 'blur'}]
			}
		};
	},
    mounted () {
     // 初始化验证码
     this.identifyCode = ''
	 this.makeCode(this.identifyCodes, 4)
	 localStorage.clear()
    },
	methods: {
		//选项卡切换
		handleClick(tab, event) {},
		//重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		//提交表单
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.$axios.post('/user/login',{
						"userId":this.ruleForm.name,
						"userPassword":this.ruleForm.pass
					})
					.then(res => {
						console.log(res.data);
						if( res.data.code === 1 ){
							this.$message({
							type: 'success',
							message: '登录成功'
							});
							localStorage.setItem('login-data',JSON.stringify(res.data.data.user));
							localStorage.setItem('token',JSON.stringify(res.data.data.token));
							/*2.登录成功跳转的路由  --- 菜单页面*/
							this.$router.push('home');
						}
						else{
							this.$message({
							type: 'error',
							message: '用户不存在或密码错误'
							});
						}
					})
					

				} else {
					console.log('error submit!!');
					return false;
				}
			});

		},
		//验证码
		randomNum (min, max) {
          return Math.floor(Math.random() * (max - min) + min)
        },
 		refreshCode () {
 		  this.identifyCode = ''
          this.makeCode(this.identifyCodes, 4)
 		},
 		makeCode (o, l) {
 		  for (let i = 0; i < l; i++) {
 		  this.identifyCode += this.identifyCodes[
  		  this.randomNum(0, this.identifyCodes.length)]}
		}
	},
	components: {
		register,SIdentify
	}
};
</script>
 
<style lang="scss">
.login {
	width: 400px;
	margin: 0 auto;
	margin-top: 14%;
	background: rgba(255, 255, 255, 0.671);
	padding: 10px;
	border-radius: 2%;
}
 
.el-tabsitem {
	text-align: center;
	width: 60px;
}
</style>
