<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :inline="true" class="demo-form-line">
        <el-form-item label="查找项">
          <el-input
            placeholder="请输入查找项"
            v-model="searchModel"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">查询</el-button>
          <el-button type="primary" @click="addDialog = true">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="list" style="width: 100%" max-height="450">
        <el-table-column
          fixed
          prop="userId"
          label="用户号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="账号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="realname"
          label="姓名"
          width="100"
        ></el-table-column>
        <el-table-column prop="role" label="角色" width="150"></el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="autograph"
          label="个性签名"
          width="300"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deletes(scope.row)"
              type="text"
              size="small"
              >删除</el-button
            >
            <el-button
              @click.native.prevent="
                lookUp(scope.$index, tableData), (showdialog = true)
              "
              type="text"
              size="small"
              >查看</el-button
            >
            <el-button
              @click.native.prevent="
                update(scope.$index), (updatedialog = true)
              "
              type="text"
              size="small"
              >更改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total,sizes,prev,pager,next,jumper"
        :total="parseInt(tableData_length)"
      ></el-pagination>
    </el-card>
    <el-drawer
      title="查看信息"
      :visible.sync="showdialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="14">
              <el-form-item label="用户号" prop="userId">
                <el-col :span="20">
                  <el-input v-model="form.userId"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="账号" prop="username">
                <el-col :span="20">
                  <el-input v-model="form.username"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="姓名" prop="realname">
                <el-col :span="20">
                  <el-input v-model="form.realname"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <img v-if="form.photo" :src="form.photo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-col>
            <el-col :span="20">
              <el-form-item label="电话号码" prop="phone">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
            </el-col>
            <el-form-item label="备注" prop="exp">
              <el-input
                type="textarea"
                v-model="form.autograph"
                :rows="6"
              ></el-input>
            </el-form-item>
          </el-row>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button type="primary" @click="showdialog = false"
            >确 定</el-button
          >
          <el-button @click="cancelForm">取 消</el-button>
        </div>
      </div>
    </el-drawer>
    <el-drawer
      title="更改信息"
      :before-close="handleClose"
      :visible.sync="updatedialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="14">
              <el-form-item label="用户号" prop="userId">
                <el-col :span="23">
                  <el-input v-model="form.userId"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="账号" prop="username">
                <el-col :span="23">
                  <el-input v-model="form.username"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="姓名" prop="realname">
                <el-input v-model="form.realname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :span="20">
              <el-form-item label="电话号码" prop="phone">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="备注" prop="exp">
                <el-input
                  type="textarea"
                  v-model="form.autograph"
                  :rows="6"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button
            type="primary"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
            >{{ loading ? "提交中 ..." : "确 定" }}</el-button
          >
          <el-button @click="cancelForm">取 消</el-button>
        </div>
      </div>
    </el-drawer>
    <el-dialog :visible.sync="addDialog" @close="resetForm('addform')">
      <div slot="title">添加新成员</div>
      <el-form ref="addform" :model="addform" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="14">
            <el-form-item label="用户号" prop="userId">
              <el-col :span="20">
                <el-input v-model="addform.userId"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="账号" prop="username">
              <el-col :span="20">
                <el-input v-model="addform.username"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="姓名" prop="realname">
              <el-col :span="20">
                <el-input v-model="addform.realname"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              list-type="picture-card"
            >
              <img v-if="addform.photo" :src="addform.photo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div class="el-upload__tip" slot="tip">请先填写用户号</div>
            </el-upload>
          </el-col>
          <el-col :span="20">
            <el-form-item label="电话号码" prop="phone">
              <el-input v-model="addform.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addform.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="备注" prop="exp">
              <el-input
                type="textarea"
                v-model="addform.autograph"
                :rows="6"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="open()">保存</el-button>
        <el-button type="primary" @click="resetForm('addform')">重置</el-button>
        <el-button @click="addDialog = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //查找项
      searchModel: "",
      //添加项
      addDialog: false,
      //表格数组
      tableData: [],
      currentPage: 1,
      pagesize: 10, //每页的数据
      userList: [],
      list: [],
      tableData_length: "", //一共多少条数据
      imageUrl: "",
      uploadUrl: "http://localhost:3000/upload/user",
      //抽屉
      showdialog: false,
      updatedialog: false,
      loading: false,
      form: {
        userId: "",
        username: "",
        password: "",
        realname: "",
        phone: "",
        email: "",
        photo: "",
        autograph: "",
      },
      addform: {
        userId: "",
        username: "",
        password: "",
        realname: "",
        phone: "",
        email: "",
        photo: "",
        autograph: "",
      },
      rules: {
        userId: [
          { required: true, message: "请输入用户号", trigger: "blur" },
          { min: 2, max: 2, message: "长度为2个字符", trigger: "blur" },
        ],
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号为11位", trigger: "blur" },
        ],
        email: [{ required: true, message: "请输入邮箱账号", trigger: "blur" }],
      },
    };
  },
  methods: {
    //搜索数据
    search() {
      this.currentPage = 1;
      this.getList;
      let lists = this.userList.filter(
        (item, index) =>
          item.userId.includes(this.searchModel) ||
          item.username.includes(this.searchModel) ||
          item.realname.includes(this.searchModel)
      );
      this.list = lists.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
      this.tableData_length = lists.length;
    },
    //查看数据详情
    lookUp(index) {
      this.form.userId = this.tableData[index].userId;
      this.form.username = this.tableData[index].username;
      this.form.realname = this.tableData[index].realname;
      this.form.phone = this.tableData[index].phone;
      this.form.email = this.tableData[index].email;
      this.form.photo =
        "http://localhost:3000/images/user/" + this.tableData[index].photo;
      this.form.autograph = this.tableData[index].autograph;
    },
    //更改数据
    update(index) {
      this.form.userId = this.tableData[index].userId;
      this.form.username = this.tableData[index].username;
      this.form.realname = this.tableData[index].realname;
      this.form.password = this.tableData[index].password;
      this.form.phone = this.tableData[index].phone;
      this.form.email = this.tableData[index].email;
      if (this.tableData[index].photo) {
        this.form.photo = this.tableData[index].photo;
        this.imageUrl =
          "http://localhost:3000/images/user/" + this.tableData[index].photo;
      } else {
        this.imageUrl = "";
      }
      this.form.autograph = this.tableData[index].autograph;
    },
    async updaterow() {
      const result = await this.$axios.post("updateUser", this.form);
      this.handleUserList();
    },
    //删除一条数据
    deletes(rows) {
      this.$confirm("此操作将永久删除此条数据，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功！",
          });
          this.deleteRow(rows);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async deleteRow(rows) {
      const result = await this.$axios.post("deleteUser", rows);
      this.handleUserList();
    },
    //添加一条新数据
    async addRow() {
      const result = await this.$axios.post("addUser", this.addform);
      this.handleUserList();
    },
    open() {
      this.$confirm("是否在离开页面前保存修改？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "保存",
        cancelButtonText: "放弃修改",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.addRow();
          this.addDialog = false;
        })
        .catch((action) => {
          this.$message({
            type: "info",
            message:
              action === "cancel" ? "放弃保存并离开页面" : "停留在当前页面",
          });
        });
    },
    //初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    async handleUserList() {
      const { data: res } = await this.$axios.get("queryUser");
      this.tableData = res.data;
      this.list = this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
      this.tableData_length = this.tableData.length;
      this.userList = this.tableData;
      this.getList();
    },
    getList() {
      if (this.searchModel) {
        // let lists = this.userList.filter(
        //   (item, index) =>
        //     item.userId.includes(this.searchModel) ||
        //     item.username.includes(this.searchModel) ||
        //     item.realname.includes(this.searchModel)
        // );
        // this.list = lists.slice(
        //   (this.currentPage - 1) * this.pagesize,
        //   this.currentPage * this.pagesize
        // );
        // this.tableData_length = lists.length;
      } else {
        this.list = this.tableData.slice(
          (this.currentPage - 1) * this.pagesize,
          this.currentPage * this.pagesize
        );
        this.tableData_length = this.tableData.length;
      }
    },
    // 上传头像
    handleAvatarSuccess(res, file) {
      this.imageUrl = "http://localhost:3000/images/user/" + file.name;
      this.addform.photo = file.name;
      this.form.photo = file.name;
      console.log(this.form.photo);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是jpg格式");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过2MB");
      }
      return isJPG && isLt2M;
    },
    // 抽屉
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm("确定要提交表单吗？")
        .then((_) => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
          this.updaterow();
        })
        .catch((_) => {});
    },
    cancelForm() {
      (this.loading = false),
        (this.showdialog = false),
        (this.updatedialog = false),
        clearTimeout(this.timer);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.imageUrl = "";
    },
  },
  created() {
    this.handleUserList();
  },
};
</script>

<style>
.el-breadcrumb {
  padding-bottom: 10px;
}
/* 上传头像 */
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

.el-drawer__body {
  padding: 20px;
}
.demo-drawer__content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.demo-drawer__content form {
  flex: 1;
}
.demo-drawer__footer {
  display: flex;
}
.demo-drawer__footer button {
  flex: 1;
}

.el-dialog__wrapper > .el-dialog {
  height: 500px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>