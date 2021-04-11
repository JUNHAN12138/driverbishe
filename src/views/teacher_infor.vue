<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>教练管理</el-breadcrumb-item>
      <el-breadcrumb-item>教练信息管理</el-breadcrumb-item>
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
          <el-button type="success" @click="addDialog = true">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="list" style="width: 100%" max-height="450">
        <el-table-column
          fixed
          prop="teacherId"
          label="教工号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="teacherName"
          label="教练姓名"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="teacherSex"
          label="性别"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="ID"
          label="身份证号"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="IsHealthy"
          label="是否健康"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="Phone"
          label="联系电话"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="nativePlace"
          label="籍贯"
          width="300"
        ></el-table-column>
        <el-table-column
          prop="currentPlace"
          label="现居住地"
          width="300"
        ></el-table-column>
        <el-table-column
          prop="teachYear"
          label="教龄"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="driverYear"
          label="驾龄"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="praise"
          label="好评"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="driverCar"
          label="准驾车型"
          width="100"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deletes(scope.row)"
              type="text"
              size="small"
              ><i class="el-icon-delete"></i>删除</el-button
            >
            <el-button
              @click.native.prevent="
                lookUp(scope.$index, tableData), (showdialog = true)
              "
              type="text"
              size="small"
              ><i class="el-icon-view"></i>查看</el-button
            >
            <el-button
              @click.native.prevent="
                update(scope.$index), (updatedialog = true)
              "
              type="text"
              size="small"
              ><i class="el-icon-edit"></i>更改</el-button
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
      :before-close="handleClose"
      :visible.sync="showdialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="14">
              <el-form-item label="教工号" prop="teacherId">
                <el-col :span="23">
                  <el-input v-model="form.teacherId"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="教练姓名" prop="teacherName">
                <el-col :span="23">
                  <el-input v-model="form.teacherName"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="性别" prop="teacherSex">
                <el-col :span="23">
                  <el-select v-model="form.teacherSex" placeholder="请选择">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item label="身份证" prop="ID">
                <el-col :span="23">
                  <el-input v-model="form.ID"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <img v-if="form.photo" :src="form.photo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-col>
            <el-col :span="12">
              <el-form-item label="健康状况" prop="IsHealthy">
                <el-col :span="20">
                  <el-input v-model="form.IsHealthy"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="教龄" prop="teachYear">
                <el-col :span="20">
                  <el-input v-model="form.teachYear"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="驾龄" prop="driverYear">
                <el-col :span="20">
                  <el-input v-model="form.driverYear"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="好评" prop="praise">
                <el-col :span="20">
                  <el-input v-model="form.praise"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="准驾车型" prop="driverCar">
                <el-col :span="20">
                  <el-input v-model="form.driverCar"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="电话号码" prop="Phone">
                <el-input v-model="form.Phone"></el-input>
              </el-form-item>
              <el-form-item label="籍贯" prop="nativePlace">
                <el-input v-model="form.nativePlace"></el-input>
              </el-form-item>
              <el-form-item label="现居住地" prop="currentPlace">
                <el-input v-model="form.currentPlace"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button
            type="primary"
            @click="showdialog = false"
            :loading="loading"
            >{{ loading ? "提交中 ..." : "确 定" }}</el-button
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
              <el-form-item label="教工号" prop="teacherId">
                <el-col :span="23">
                  <el-input v-model="form.teacherId"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="教练姓名" prop="teacherName">
                <el-col :span="23">
                  <el-input v-model="form.teacherName"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="性别" prop="teacherSex">
                <el-col :span="23">
                  <el-select v-model="form.teacherSex" placeholder="请选择">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item label="身份证" prop="ID">
                <el-col :span="23">
                  <el-input v-model="form.ID"></el-input>
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
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :span="12">
              <el-form-item label="健康状况" prop="IsHealthy">
                <el-col :span="20">
                  <el-input v-model="form.IsHealthy"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="教龄" prop="teachYear">
                <el-col :span="20">
                  <el-input v-model="form.teachYear">0</el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="驾龄" prop="driverYear">
                <el-col :span="20">
                  <el-input v-model="form.driverYear"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="好评" prop="praise">
                <el-col :span="20">
                  <el-input v-model="form.praise"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="准驾车型" prop="driverCar">
                <el-col :span="20">
                  <el-input v-model="form.driverCar"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="电话号码" prop="Phone">
                <el-input v-model="form.Phone"></el-input>
              </el-form-item>
              <el-form-item label="籍贯" prop="nativePlace">
                <el-input v-model="form.nativePlace"></el-input>
              </el-form-item>
              <el-form-item label="现居住地" prop="currentPlace">
                <el-input v-model="form.currentPlace"></el-input>
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
    <el-dialog title="添加新成员" :visible.sync="addDialog">
      <el-form ref="addform" :model="addform" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="14">
            <el-form-item label="教工号" prop="teacherId">
              <el-col :span="23">
                <el-input v-model="addform.teacherId"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="教练姓名" prop="teacherName">
              <el-col :span="23">
                <el-input v-model="addform.teacherName"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="性别" prop="teacherSex">
              <el-col :span="23">
                <el-select v-model="addform.teacherSex" placeholder="请选择">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="身份证" prop="ID">
              <el-col :span="23">
                <el-input v-model="addform.ID"></el-input>
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
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
          <el-col :span="12">
            <el-form-item label="健康状况" prop="IsHealthy">
              <el-col :span="20">
                <el-input v-model="addform.IsHealthy"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="教龄" prop="teachYear">
              <el-col :span="20">
                <el-input v-model="addform.teachYear"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="驾龄" prop="driverYear">
              <el-col :span="20">
                <el-input v-model="addform.driverYear"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="好评" prop="praise">
              <el-col :span="20">
                <el-input v-model="addform.praise"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="准驾车型" prop="driverCar">
              <el-col :span="20">
                <el-input v-model="addform.driverCar"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="电话号码" prop="Phone">
              <el-input v-model="addform.Phone"></el-input>
            </el-form-item>
            <el-form-item label="籍贯" prop="nativePlace">
              <el-input v-model="addform.nativePlace"></el-input>
            </el-form-item>
            <el-form-item label="现居住地" prop="currentPlace">
              <el-input v-model="addform.currentPlace"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="open()">保存</el-button>
          <el-button type="primary" @click="resetForm('addform')"
            >重置</el-button
          >
          <el-button @click="addDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
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
      //头像地址
      imageUrl: "",
      uploadUrl: "http://localhost:3000/upload/teacher",
      //抽屉
      showdialog: false,
      updatedialog: false,
      loading: false,
      form: {
        teacherId: "",
        teacherName: "",
        teacherSex: "",
        ID: "",
        IsHealthy: "",
        Phone: "",
        nativePlace: "",
        currentPlace: "",
        teachYear: "",
        driverYear: "",
        praise: "",
        driverCar: "",
        photo: "",
      },
      addform: {
        teacherId: "",
        teacherName: "",
        teacherSex: "",
        ID: "",
        IsHealthy: "",
        Phone: "",
        nativePlace: "",
        currentPlace: "",
        teachYear: "",
        driverYear: "",
        praise: "",
        driverCar: "",
        photo: "",
      },
      rules: {
        teacherId: [
          { required: true, message: "请输入教练号", trigger: "blur" },
          { min: 6, max: 6, message: "长度为6个字符", trigger: "blur" },
        ],
        teacherName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        teacherSex: [
          { required: true, message: "请选择性别", trigger: "blur" },
        ],
        ID: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { max: 18, message: "长度为18个字符", trigger: "blur" },
        ],
        IsHealthy: [
          { required: true, message: "请输入身体健康信息", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号为11位", trigger: "blur" },
        ],
        nativePlace: [
          { required: true, message: "请输入籍贯", trigger: "blur" },
        ],
        currentPlace: [
          { required: true, message: "请输入现居住地址", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //搜索数据
    search() {
      this.currentPage = 1;
      this.getList;
      let lists = this.userList.filter((item, index) =>
        item.teacherId.includes(this.searchModel) ||
        item.teacherName.includes(this.searchModel) ||
        item.teacherSex.includes(this.searchModel)
      );
      this.list = lists.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
      this.tableData_length = lists.length;
    },
    //查看数据详情
    lookUp(index) {
      this.form.teacherId = this.tableData[index].teacherId;
      this.form.teacherName = this.tableData[index].teacherName;
      this.form.teacherSex = this.tableData[index].teacherSex;
      this.form.ID = this.tableData[index].ID;
      this.form.IsHealthy = this.tableData[index].IsHealthy;
      this.form.phone = this.tableData[index].phone;
      this.form.nativePlace = this.tableData[index].nativePlace;
      this.form.currentPage = this.tableData[index].currentPage;
      this.form.teachYear = this.tableData[index].teachYear;
      this.form.driverYear = this.tableData[index].driverYear;
      this.form.driverCar = this.tableData[index].driverCar;
      this.form.praise = this.tableData[index].praise;
      this.form.photo =
        "http://localhost:3000/images/teacher/" + this.tableData[index].photo;
    },
    //更改数据
    update(index) {
      this.form.teacherId = this.tableData[index].teacherId;
      this.form.teacherName = this.tableData[index].teacherName;
      this.form.teacherSex = this.tableData[index].teacherSex;
      this.form.ID = this.tableData[index].ID;
      this.form.IsHealthy = this.tableData[index].IsHealthy;
      this.form.Phone = this.tableData[index].Phone;
      this.form.nativePlace = this.tableData[index].nativePlace;
      this.form.currentPlace = this.tableData[index].currentPlace;
      this.form.teachYear = this.tableData[index].teachYear;
      this.form.driverYear = this.tableData[index].driverYear;
      this.form.driverCar = this.tableData[index].driverCar;
      this.form.praise = this.tableData[index].praise;
      if (this.tableData[index].photo) {
        this.form.photo = this.tableData[index].photo;
        this.imageUrl =
          "http://localhost:3000/images/teacher/" + this.tableData[index].photo;
      } else {
        this.imageUrl = "";
      }
    },
    async updaterow() {
      console.log(this.form);
      const result = await this.$axios.post("updateTeacher/infor", this.form);
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
      const result = await this.$axios.post("deleteTeahcer/infor", rows);
      this.handleUserList();
    },
    //添加一条新数据
    async addRow() {
      console.log(this.addform);
      const result = await this.$axios.post("addTeacher/infor", this.addform);
      console.log(result);
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
            type: "info",
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
      const { data: res } = await this.$axios.get("queryTeacher/infor");
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
      if (this.searchModel != null) {
        let lists = this.userList.filter((item, index) =>
          item.teacherId.includes(this.searchModel)
        );
        console.log(this.lists);
        this.list = lists.slice(
          (this.currentPage - 1) * this.pagesize,
          this.currentPage * this.pagesize
        );
        this.tableData_length = lists.length;
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
      this.imageUrl = "http://localhost:3000/images/teacher/" + file.name;
      this.addform.photo = file.name;
      this.form.photo = file.name;
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
.avator {
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

.el-drawer__container .el-drawer {
  overflow-y: scroll;
}

.el-dialog__wrapper > .el-dialog {
  height: 500px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>