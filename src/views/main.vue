<template>
  <div id="app">
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="logo" :style="isCollapse?'font-size:0px':'font-size:16px'">
          <img src="../assets/logo.png" alt="" />
          驾校管理系统
        </div>
        <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse" :collapse-transition="false" :unique-opened="true" router>
          <el-menu-item index="/Home">
            <i class="el-icon-s-platform"></i>
            <span slot="title">系统数据</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/User">用户管理</el-menu-item>
              <el-menu-item index="/center">个人中心</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span slot="title">学员管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/stu_infor">学员信息管理</el-menu-item>
              <el-menu-item index="/stu_exam">学员考试管理</el-menu-item>
              <el-menu-item index="/stu_train">学员培训管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">教练管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/teacher_infor">教练信息管理</el-menu-item>
              <el-menu-item index="/teacher_wages">教练工资管理</el-menu-item>
              <el-menu-item index="/class_infor">教练课表计划</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-truck"></i>
              <span slot="title">驾校管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/car_info">车辆管理</el-menu-item>
              <el-menu-item index="/car_repair">车辆报修管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/webPage">
            <i class="el-icon-document"></i>
            <span slot="title">网页管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div>
            <el-button type="text" icon="el-icon-s-operation" style="color:#fff;" v-model="isCollapse" @click="isCollapses()"></el-button>
          </div>
          <div class="user">
            <el-popover class="data_button" placement="bottom" width="600" trigger="click">
              <el-calendar></el-calendar>
              <el-button type="text" style="color:#fff;" slot="reference" icon="el-icon-date">日历</el-button>
            </el-popover>
            <el-dropdown>
              <i class="el-icon-user" style="color:#fff;">用户</i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><router-link to="/center">个人中心</router-link></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button type="text" icon="el-icon-switch-button" @click="logout"
              >退出</el-button
            >
          </div>
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "app",
  data(){
    return{
      date:'1',
      //菜单水平折叠
      isCollapse:false,
    }
  },
  methods:{
    logout(){
        window.sessionStorage.clear();
        this.$router.push('/login');
    },
    isCollapses(){
      this.isCollapse=!this.isCollapse;
    },

  }
};
</script>

<style>
.el-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #409eff;
  color: #fff;
  line-height: 60px;
}
.el-icon-user {
  margin-right: 20px;
}
.el-dropdown-menu {
  width: 200px;
}
.el-icon-switch-button{
  color: #fff;
}
.el-header .user>.el-button{
  color: #fff;
}
.el-aside {
  background-color: #fff;
  color: #333;
  transition: width 0.4s;
}
.el-aside img {
  height: 30px;
  width: 30px;
  vertical-align: middle;
}
.logo {
  height: 60px;
  line-height: 60px;
  background: #409eff;
  color: #fff;
  border-right: 1px solid #e6e6e6;
  text-align: center;
}
.el-aside .el-menu{
  border-right: none;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.data_button{
  margin-right: 20px;
}
</style>
