<template>
    <div class="login_back">
        <el-card class="login_card">
            <h2 class="login_title">驾校综合管理系统</h2>
            <el-form :model="userList" :rules="loginListRules" ref="userList" label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="userList.username" auto-complete="off" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="userList.password" auto-complete="off" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="sidentify">
                    <!-- 注意：prop与input绑定的值一定要一致，否则验证规则中的value会报undefined，因为value即为绑定的input输入值 -->
                    <el-input v-model="userList.sidentify" placeholder="请输入验证码，并回车" class="identifyinput" @keyup.enter.native="submitForm(userList)"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="identifybox">
                        <div @click="refreshCode">
                            <s-identify :identifyCode="identifyCode"></s-identify>
                        </div>
                        <el-button @click="refreshCode" type='text' class="textbtn">看不清，换一张</el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import Sidentify from '../components/Sidentify'//引入验证码组件
export default {
    data(){
        return{
            userList:{
                userId:'',
                username:'',
                password:'',
                sidentify:''
            },
            identifyCodes:'1234567890ABCDEFGHiGKLMNOPQRSTUVWXYZ',
            identifyCode:'',
            loginListRules:{
                username:[
                    {required:true,message:"请输入用户名",trigger:"blur"},
                    {min:3,max:10,message:"长度在3到10个字符",trigger:"blur"}
                ],
                password:[
                    {required:true,message:"请输入密码",trigger:"blur"},
                    {min:6,max:15,message:"长度在6到15之间",trigger:"blur"}
                ],
                sidentify:[
                    {required:true,message:"请输入验证码",trigger:"blur"}
                ]
            }
        }
    },
    methods:{
        login(){
            this.$refs.userList.validate(async valid=>{
                if(!valid) return;
                const {data:res} =await this.$axios.post("login",this.userList);
                if(res.status!==200) return this.$message.error("登录失败！！！账号或密码错误");
                this.$message.success("登录成功！！！");
                window.sessionStorage.setItem("token",res.token);
                this.$router.push('/main')
                localStorage.setItem('userId',res.data[0].userId)
            })
            this.$refs.userList.resetFields();
        },
        submitForm(formname){
            if(formname.sidentify.toUpperCase()==this.identifyCode){
                this.$message.success("验证码正确");
            }else{
                this.$message.error("验证码错误")
            }
        },
        //生成随机数
        randomNum(min,max){
            return Math.floor(Math.random()*(max-min)+min)
        },
        //切换验证码
        refreshCode(){
            this.identifyCode=''
            this.makeCode(this.identifyCodes,4)
        },
        //生成四位数随机验证码
        makeCode(o,l){
            for(let i=0;i<l;i++){
                this.identifyCode+=this.identifyCodes[
                    this.randomNum(0,this.identifyCodes.length)
                ]
            }
        }
    },
    components:{
        's-identify':Sidentify
    },
    mounted(){
        this.makeCode(this.identifyCodes,4)
    }
}
</script>
<style>
.login_back{
    position: relative;
    height: 100%;
    background: url(../assets/images/login_bg.jpg) no-repeat center center;
}
.login_card{
    position: absolute;
    top: 120px;
    left: 50%;
    margin-left: -200px;
    width: 400px;
}
.login_title{
    text-align: center;
}

.identifybox{
    display: flex;
    justify-content: space-between;
    margin-top: 7px;
}
</style>