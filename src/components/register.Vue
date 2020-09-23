<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<el-form-item label="用户名" prop="name"><el-input v-model="ruleForm.name"></el-input></el-form-item>
		<el-form-item label="密码" prop="pass"><el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input></el-form-item>
		<el-form-item label="确认密码" prop="checkPass"><el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input></el-form-item>
		<el-form-item label="验证码" prop="code">
				<el-row :span="24">
 				<el-col :span="12">
					<el-input v-model="ruleForm.code" auto-complete="off" placeholder="请输入验证码" size=""
					@keyup.enter.native="submitForm('ruleForm')"></el-input>
					</el-col>
 				<el-col :span="12">
 				<div class="register-code" @click="refreshCode">
 				<sidf :identifyCode="identifyCode" divId="s-canvas2"></sidf>
 				</div>
 			</el-col>
 		</el-row>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>
</template>
 
<script>
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
 
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.ruleForm.pass) {
				callback(new Error('两次输入密码不一致!'));
			} else {
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
			activeName: 'second',
			ruleForm: {
				name: '',
				pass: '',
				checkPass: '',
				code: ''
			},
			identifyCodes: '123456789abcdefghijklmnopqrstuvwxyz',
			identifyCode: '',
			rules: {
				name: [{ required: true, message: '请输入您的名称', trigger: 'blur' }, { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }],
				pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
				checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
				code: [{required:true, validator: validateCode, trigger: 'blur'}]
			}
		};
	},
	mounted () {
    // 初始化验证码
	 this.identifyCode = ''
     this.makeCode(this.Codes, 4)
    },
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
				    this.$axios.post('/user/register',
						{
							"userId":this.ruleForm.name,
							"userPassword":this.ruleForm.pass,
							"userName": " ",
							"userRole": " "
						 }).then(res => {
										if(res.data.code === 1){
											this.$message({
												type: 'success',
												message: '注册成功'	
										     });
										 }
										else{
											this.$message({
												type: 'error',
												message: '该用户名已存在'	
										     });
										}				
										});
				} 
			});
		},
 
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		//验证码
		randomNum (min, max) {
          return Math.floor(Math.random() * (max - min) + min)
        },
 		refreshCode () {
		  this.identifyCode = ''
		  this.makeCode(this.identifyCodes, 4)
		//   console.log('1111');
 		},
 		makeCode (o, l) {
 		  for (let i = 0; i < l; i++) {
 		  this.identifyCode += this.identifyCodes[
  		  this.randomNum(0, this.identifyCodes.length)]}
        }
	},
	components: {
		"sidf":SIdentify
	}
};
</script>
