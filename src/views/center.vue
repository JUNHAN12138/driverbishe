<template>
  <div>
    <el-card class="center-card">
      <el-tabs tab-position="left">
        <el-tab-pane label="个人信息">
          <el-form ref="form" :model="userlist" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="用户号">
                  <el-input v-model="userlist.userId"></el-input>
                </el-form-item>
                <el-form-item label="用户账号">
                  <el-input v-model="userlist.username"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名">
                  <el-input v-model="userlist.realname"></el-input>
                </el-form-item>
                <el-form-item label="用户身份">
                  <el-input v-model="userlist.role"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                  <el-input v-model="userlist.phone"></el-input>
                </el-form-item>
                <el-form-item label="E-mail">
                  <el-input v-model="userlist.demail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <span>用户头像</span>
                  <img v-if="userlist.photo" :src="imgUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改密码">
          <el-form ref="form" :model="userlist" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="新密码">
                  <el-input v-model="userlist.password"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码">
                  <el-input v-model="newPassword"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-button type="primary" @click="quit">确认</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userlist: {
        userId: "",
        username: "",
        password: "",
        realname: "",
        role: "",
        phone: "",
        email: "",
        photo: "",
      },
      data1: {
        userId: "",
      },
      imgUrl: "",
      newPassword: "",
    };
  },
  methods: {
    async test() {
      this.data1.userId = localStorage.getItem("userId");
      const { data: res } = await this.$axios.post("queryId", this.data1);
      this.userlist = res.data[0];
      this.imgUrl = "http://localhost:3000/images/user/" + this.userlist.photo;
    },
    quit() {
      if (this.userlist.password == this.newPassword) {
        this.userlist.password=this.newPassword;
        this.$message({
          message: "成功修改密码！！！",
          type: "success",
        });
        this.updaterow()
      } else {
        this.$message({
          message: "密码修改失败！！！",
          type: "error",
        });
      }
    },
    async updaterow() {
      const result = await this.$axios.post("updateUser", this.userlist);
    },
  },
  created() {
    this.test();
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.center-card {
  height: 600px;
}
</style>