<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>学员管理</el-breadcrumb-item>
      <el-breadcrumb-item>学员培训管理</el-breadcrumb-item>
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
        </el-form-item>
      </el-form>
      <el-table :data="list" style="width: 100%" max-height="450">
        <el-table-column
          fixed
          prop="stuId"
          label="学号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="stuAdmi"
          label="考试号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="stuName"
          label="学员姓名"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="stuSex"
          label="性别"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="ID"
          label="身份证号"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="trainingMode"
          label="培训方式"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="trainingCar"
          label="培训车型"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="trainingTeacher"
          label="培训教练"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="examPay"
          label="补考缴费"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="trainingID"
          label="培训科目"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="trainingTime"
          label="培训时间"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="trainingPlace"
          label="培训地点"
          width="300"
        ></el-table-column>
        <el-table-column prop="isExam" label="是否补考"></el-table-column>
        <el-table-column
          prop="tuition"
          label="学费"
          width="100"
        ></el-table-column>
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
      :visible.sync="showdialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="14">
              <el-form-item label="学员号" prop="stuId">
                <el-col :span="23">
                  <el-input v-model="form.stuId"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="考试号" prop="stuAdmi">
                <el-col :span="23">
                  <el-input v-model="form.stuAdmi"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="姓名" prop="stuName">
                <el-col :span="23">
                  <el-input v-model="form.stuName"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="性别" prop="stuSex">
                <el-col :span="23">
                  <el-select v-model="form.stuSex" placeholder="请选择">
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
              <el-form-item label="培训方式" prop="trainingMode">
                <el-col :span="20">
                  <el-input v-model="form.trainingMode"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="培训车型" prop="trainingCar">
                <el-col :span="20">
                  <el-input v-model="form.trainingCar"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="培训教练" prop="trainingTeacher">
                <el-col :span="20">
                  <el-input v-model="form.trainingCar"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="培训科目" prop="trainingID">
                <el-col :span="20">
                  <el-input v-model="form.trainingID"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否补考" prop="isExam">
                <el-col :span="20">
                  <el-input v-model="form.isExam"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="补考缴费" prop="examPay">
                <el-col :span="20">
                  <el-input v-model="form.examPay"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学费" prop="tuition">
                <el-col :span="20">
                  <el-input v-model="form.trainingCar"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="培训时间" prop="trainingTime">
                <el-date-picker
                  v-model="form.trainingTime"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="培训地点" prop="trainingPlace">
                <el-input v-model="form.trainingPlace"></el-input>
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
              <el-form-item label="学员号" prop="stuId">
                <el-col :span="23">
                  <el-input v-model="form.stuId"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="考试号" prop="stuAdmi">
                <el-col :span="23">
                  <el-input v-model="form.stuAdmi"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="姓名" prop="stuName">
                <el-col :span="23">
                  <el-input v-model="form.stuName"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="性别" prop="stuSex">
                <el-col :span="23">
                  <el-select v-model="form.stuSex" placeholder="请选择">
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
              <el-form-item label="培训方式" prop="trainingMode">
                <el-col :span="20">
                  <el-input v-model="form.trainingMode"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="培训车型" prop="trainingCar">
                <el-col :span="20">
                  <el-input v-model="form.trainingCar"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="培训教练" prop="trainingTeacher">
                <el-col :span="20">
                  <el-input v-model="form.trainingCar"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="培训科目" prop="trainingID">
                <el-col :span="20">
                  <el-input v-model="form.trainingID"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否补考" prop="isExam">
                <el-col :span="20">
                  <el-input v-model="form.isExam"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="补考缴费" prop="examPay">
                <el-col :span="20">
                  <el-input v-model="form.examPay"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学费" prop="tuition">
                <el-col :span="20">
                  <el-input v-model="form.trainingCar"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="培训时间" prop="trainingTime">
                <el-date-picker
                  v-model="form.trainingTime"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="培训地点" prop="trainingPlace">
                <el-input v-model="form.trainingPlace"></el-input>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      //查找项
      searchModel: "",
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
        stuId: "",
        stuName: "",
        stuAdmi: "",
        stuSex: "",
        ID: "",
        trainingMode: "",
        trainingCar: "",
        phone: "",
        trainingTeacher: "",
        trainingID: "",
        trainingTime: "",
        trainingPlace: "",
        examPay: "",
        isExam: "",
        tuition: "",
      },
      rules: {
        stuId: [
          { required: true, message: "请输入学员号", trigger: "blur" },
          { min: 6, max: 6, message: "长度为6个字符", trigger: "blur" },
        ],
        stuName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        stuSex: [{ required: true, message: "请选择性别", trigger: "blur" }],
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
      let lists = this.userList.filter(
        (item, index) =>
          item.stuId.includes(this.searchModel) ||
          item.stuName.includes(this.searchModel) ||
          item.stuAdmi.includes(this.searchModel) ||
          item.stuSex.includes(this.searchModel)
      );
      this.list = lists.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
      this.tableData_length = lists.length;
    },
    //查看数据详情
    lookUp(index) {
      this.form.stuId = this.tableData[index].stuId;
      this.form.stuName = this.tableData[index].stuName;
      this.form.stuAdmi = this.tableData[index].stuAdmi;
      this.form.stuSex = this.tableData[index].stuSex;
      this.form.ID = this.tableData[index].ID;
      this.form.phone = this.tableData[index].phone;
      this.form.trainingMode = this.tableData[index].trainingMode;
      this.form.trainingCar = this.tableData[index].trainingCar;
      this.form.trainingTeacher = this.tableData[index].trainingTeacher;
      this.form.trainingID = this.tableData[index].trainingID;
      this.form.trainingTime = this.tableData[index].trainingTime;
      this.form.trainingPlace = this.tableData[index].trainingPlace;
      this.form.examPay = this.tableData[index].examPay;
      this.form.isExam = this.tableData[index].isExam;
      this.form.tuition = this.tableData[index].tuition;
      this.form.stuPhoto = this.tableData[index].stuPhoto;
    },
    //更改数据
    update(index) {
      this.form.stuId = this.tableData[index].stuId;
      this.form.stuName = this.tableData[index].stuName;
      this.form.stuAdmi = this.tableData[index].stuAdmi;
      this.form.stuSex = this.tableData[index].stuSex;
      this.form.ID = this.tableData[index].ID;
      this.form.phone = this.tableData[index].phone;
      this.form.trainingMode = this.tableData[index].trainingMode;
      this.form.trainingCar = this.tableData[index].trainingCar;
      this.form.trainingTeacher = this.tableData[index].trainingTeacher;
      this.form.trainingID = this.tableData[index].trainingID;
      this.form.trainingTime = this.tableData[index].trainingTime;
      this.form.trainingPlace = this.tableData[index].trainingPlace;
      this.form.examPay = this.tableData[index].examPay;
      this.form.isExam = this.tableData[index].isExam;
      this.form.tuition = this.tableData[index].tuition;
      this.form.stuPhoto = this.tableData[index].stuPhoto;
    },
    async updaterow() {
      const result = await this.$axios.post("updateStu/train", this.form);
      this.handleUserList();
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
      const { data: res } = await this.$axios.get("queryStu/train");
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
            item.stuId.includes(this.searchModel) ||
            item.stuName.includes(this.searchModel) ||
            item.stuAdmi.includes(this.searchModel) ||
            item.stuSex.includes(this.searchModel)
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
      console.log(this.addform);
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

.el-dialog__wrapper > .el-dialog {
  height: 500px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>