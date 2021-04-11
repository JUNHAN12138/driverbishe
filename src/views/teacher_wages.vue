<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>教练管理</el-breadcrumb-item>
      <el-breadcrumb-item>教练工资管理</el-breadcrumb-item>
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
          prop="phone"
          label="联系电话"
          width="120"
        ></el-table-column>
        <el-table-column prop="teacherNum" label="教学人数" width="120"></el-table-column>
        <el-table-column prop="passNum" label="通过人数" width="120"></el-table-column>
        <el-table-column prop="failNum" label="失败人数" width="120"></el-table-column>
        <el-table-column prop="month" label="月份" width="120"></el-table-column>
        <el-table-column prop="wages" label="工资" width="120"></el-table-column>
        <el-table-column prop="deduction" label="扣费" width="120"></el-table-column>
        <el-table-column prop="bonus" label="奖金" width="120"></el-table-column>
        <el-table-column prop="totalWages" label="总工资" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
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
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :span="12">
              <el-form-item label="教学人数" prop="teacherNum">
                <el-col :span="20">
                  <el-input v-model="form.teacherNum"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="通过人数" prop="passNum">
                <el-col :span="20">
                  <el-input v-model="form.passNum"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="失败人数" prop="failNum">
                <el-col :span="20">
                  <el-input v-model="form.failNum"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="月份" prop="month">
                <el-col :span="20">
                  <el-input v-model="form.month"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工资" prop="wages">
                <el-col :span="20">
                  <el-input v-model="form.wages"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="扣费" prop="deduction">
                <el-col :span="20">
                  <el-input v-model="form.deduction"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="奖金" prop="bonus">
                <el-col :span="20">
                  <el-input v-model="form.bonus"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总工资" prop="totalWages">
                <el-col :span="20">
                  <el-input v-model="form.totalWages"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="电话号码" prop="phone">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button
            type="primary"
            @click="showdialog=false"
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
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :span="12">
              <el-form-item label="教学人数" prop="teacherNum">
                <el-col :span="20">
                  <el-input v-model="form.teacherNum"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="通过人数" prop="passNum">
                <el-col :span="20">
                  <el-input v-model="form.passNum"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="失败人数" prop="failNum">
                <el-col :span="20">
                  <el-input v-model="form.failNum"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="月份" prop="month">
                <el-col :span="20">
                  <el-input v-model="form.month"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工资" prop="wages">
                <el-col :span="20">
                  <el-input v-model="form.wages"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="扣费" prop="deduction">
                <el-col :span="20">
                  <el-input v-model="form.deduction"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="奖金" prop="bonus">
                <el-col :span="20">
                  <el-input v-model="form.bonus"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总工资" prop="totalWages">
                <el-col :span="20">
                  <el-input v-model="form.totalWages"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="电话号码" prop="phone">
                <el-input v-model="form.phone"></el-input>
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
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :span="12">
              <el-form-item label="教学人数" prop="teacherNum">
                <el-col :span="20">
                  <el-input v-model="addform.teacherNum"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="通过人数" prop="passNum">
                <el-col :span="20">
                  <el-input v-model="addform.passNum"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="失败人数" prop="failNum">
                <el-col :span="20">
                  <el-input v-model="addform.failNum"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="月份" prop="month">
                <el-col :span="20">
                  <el-input v-model="addform.month"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工资" prop="wages">
                <el-col :span="20">
                  <el-input v-model="addform.wages"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="扣费" prop="deduction">
                <el-col :span="20">
                  <el-input v-model="addform.deduction"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="奖金" prop="bonus">
                <el-col :span="20">
                  <el-input v-model="addform.bonus"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总工资" prop="totalWages">
                <el-col :span="20">
                  <el-input v-model="addform.totalWages"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="电话号码" prop="phone">
                <el-input v-model="addform.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        <el-form-item>
          <el-button type="primary" @click="open()">保存</el-button>
          <el-button type="primary" @click="resetForm('addform')">重置</el-button>
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
      //抽屉
      showdialog: false,
      updatedialog: false,
      loading: false,
      form: {
        teacherId: "",
        teacherName: "",
        teacherSex: "",
        ID: "",
        phone: "",
        teacherNum:"",
        passNum:"",
        failNum:"",
        month:"",
        wages:"",
        deduction:"",
        bonus:"",
        totalWages:""
      },
      addform: {
        teacherId: "",
        teacherName: "",
        teacherSex: "",
        ID: "",
        phone: "",
        teacherNum:"",
        passNum:"",
        failNum:"",
        month:"",
        wages:"",
        deduction:"",
        bonus:"",
        totalWages:""
      },
      rules: {
        teacherId: [
          { required: true, message: "请输入学员号", trigger: "blur" },
          { min: 6, max: 6, message: "长度为6个字符", trigger: "blur" },
        ],
        teacherName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        teacherSex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        ID: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { max: 18, message: "长度为18个字符", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号为11位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //搜索数据
    search() {
      this.currentPage = 1;
      this.getList;
    },
    //查看数据详情
    lookUp(index) {
      this.form.teacherId = this.tableData[index].teacherId;
      this.form.teacherName = this.tableData[index].teacherName;
      this.form.teacherSex = this.tableData[index].teacherSex;
      this.form.ID = this.tableData[index].ID;
      this.form.phone = this.tableData[index].phone;
      this.form.teacherNum=this.tableData[index].teacherNum;
      this.form.passNum=this.tableData[index].passNum;
      this.form.failNum=this.tableData[index].failNum;
      this.form.month=this.tableData[index].month;
      this.form.wages=this.tableData[index].wages;
      this.form.deduction=this.tableData[index].deduction;
      this.form.bonus=this.tableData[index].bonus;
      this.form.totalWages=this.tableData[index].totalWages;
    },
    //更改数据
    update(index) {
      this.form.teacherId = this.tableData[index].teacherId;
      this.form.teacherName = this.tableData[index].teacherName;
      this.form.teacherSex = this.tableData[index].teacherSex;
      this.form.ID = this.tableData[index].ID;
      this.form.phone = this.tableData[index].phone;
      this.form.teacherNum=this.tableData[index].teacherNum;
      this.form.passNum=this.tableData[index].passNum;
      this.form.failNum=this.tableData[index].failNum;
      this.form.month=this.tableData[index].month;
      this.form.wages=this.tableData[index].wages;
      this.form.deduction=this.tableData[index].deduction;
      this.form.bonus=this.tableData[index].bonus;
      this.form.totalWages=this.tableData[index].totalWages;
    },
    async updaterow() {
      const result = await this.$axios.post("updateTeacher/wages", this.form);
      this.handleUserList();
    },
    //添加一条新数据
    async addRow() {
      const result = await this.$axios.post("addTeacher/wages", this.addform);
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
          this.addDialog=false;
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
      const { data: res } = await this.$axios.get("queryTeacher/wages");
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
        let lists = this.userList.filter(
          (item, index) =>
            item.teacherId.includes(this.searchModel) ||
            item.teacherName.includes(this.searchModel) ||
            item.teacherSex.includes(this.searchModel) ||
            item.ID.includes(this.searchModel) ||
            item.phone.includes(this.searchModel) ||
            item.teacherNum.includes(this.searchModel) ||
            item.passNum.includes(this.searchModel) ||
            item.failNum.includes(this.searchModel) ||
            item.month.includes(this.searchModel) ||
            item.wages.includes(this.searchModel) ||
            item.deduction.includes(this.searchModel) ||
            item.bonus.includes(this.searchModel) ||
            item.totalWages.includes(this.searchModel)
        );
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
      this.imageUrl = URL.createObjectURL(file.raw);
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
    resetForm(formName){
      this.$refs[formName].resetFields();
      console.log(this.addform)
    }
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

.el-drawer__container .el-drawer{
    overflow-y: scroll;
}

.el-dialog__wrapper>.el-dialog{
  height: 500px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>