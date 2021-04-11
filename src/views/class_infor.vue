<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>学员管理</el-breadcrumb-item>
      <el-breadcrumb-item>学员信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :inline="true" class="demo-form-line">
        <el-form-item label="查找项">
          <el-input
            placeholder="请输入课号、课程名称、课程教练"
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
          prop="classId"
          label="课程号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="className"
          label="课程名称"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="classTeacher"
          label="课程教练"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="timeSlot"
          label="时间段"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="numbers"
          label="报名人数"
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
      :visible.sync="showdialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="14">
              <el-form-item label="课程号" prop="classId">
                <el-col :span="23">
                  <el-input v-model="form.classId"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="课程名称" prop="className">
                <el-col :span="23">
                  <el-input v-model="form.className"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="课程教练" prop="classTeacher">
                <el-col :span="23">
                  <el-input v-model="form.classTeacher"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="开始时间" prop="startTime">
                <el-date-picker
                  v-model="form.startTime"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="开始日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间" prop="endTime">
                <el-date-picker
                  v-model="form.endTime"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="时间段" prop="timeSlot">
                <el-input v-model="form.timeSlot"></el-input>
              </el-form-item>
              <el-form-item label="报名人数" prop="numbers">
                <el-input v-model="form.numbers"></el-input>
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
              <el-form-item label="课程号" prop="classId">
                <el-col :span="23">
                  <el-input v-model="form.classId"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="课程名称" prop="className">
                <el-col :span="23">
                  <el-input v-model="form.className"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="课程教练" prop="classTeacher">
                <el-col :span="23">
                  <el-input v-model="form.classTeacher"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="开始时间" prop="startTime">
                <el-date-picker
                  v-model="form.startTime"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="开始日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间" prop="endTime">
                <el-date-picker
                  v-model="form.endTime"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="时间段" prop="timeSlot">
                <el-input v-model="form.timeSlot"></el-input>
              </el-form-item>
              <el-form-item label="报名人数" prop="numbers">
                <el-input v-model="form.numbers"></el-input>
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
            <el-form-item label="课程号" prop="classId">
              <el-col :span="23">
                <el-input v-model="addform.classId"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="课程名称" prop="className">
              <el-col :span="23">
                <el-input v-model="addform.className"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="课程教练" prop="classTeacher">
              <el-col :span="23">
                <el-input v-model="addform.classTeacher"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="addform.startTime"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="开始日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="addform.endTime"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间段" prop="timeSlot">
              <el-input v-model="addform.timeSlot"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报名人数" prop="numbers">
              <el-input v-model="addform.numbers"></el-input>
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
      //抽屉
      showdialog: false,
      updatedialog: false,
      loading: false,
      form: {
        classId: "",
        className: "",
        classTeacher: "",
        startTime: "",
        endTime: "",
        timeSlot: "",
        numbers: "",
      },
      addform: {
        classId: "",
        className: "",
        classTeacher: "",
        startTime: "",
        endTime: "",
        timeSlot: "",
        numbers: "",
      },
      rules: {
        classId: [
          { required: true, message: "请输入课程号", trigger: "blur" },
          { min: 2, max: 2, message: "长度为2个字符", trigger: "blur" },
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
            item.classId.includes(this.searchModel) ||
            item.className.includes(this.searchModel) ||
            item.classTeacher.includes(this.searchModel)
        );
        this.list = lists.slice(
          (this.currentPage - 1) * this.pagesize,
          this.currentPage * this.pagesize
        );
        this.tableData_length = lists.length;
    },
    //查看数据详情
    lookUp(index) {
      this.form.classId = this.tableData[index].classId;
      this.form.className = this.tableData[index].className;
      this.form.classTeacher = this.tableData[index].classTeacher;
      this.form.startTime = this.tableData[index].startTime;
      this.form.endTime = this.tableData[index].endTime;
      this.form.timeSlot = this.tableData[index].timeSlot;
      this.form.numbers = this.tableData[index].numbers;
    },
    //更改数据
    update(index) {
      this.form.classId = this.tableData[index].classId;
      this.form.className = this.tableData[index].className;
      this.form.classTeacher = this.tableData[index].classTeacher;
      this.form.startTime = this.tableData[index].startTime;
      this.form.endTime = this.tableData[index].endTime;
      this.form.timeSlot = this.tableData[index].timeSlot;
      this.form.numbers = this.tableData[index].numbers;
    },
    async updaterow() {
      const result = await this.$axios.post("updateClass/infor", this.form);
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
      const result = await this.$axios.post("deleteClass/infor", rows);
      this.handleUserList();
    },
    //添加一条新数据
    async addRow() {
      const result = await this.$axios.post("addClass/infor", this.addform);
      console.log(this.addform);
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
      const { data: res } = await this.$axios.get("queryClass/infor");
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
            item.classId.includes(this.searchModel) ||
            item.className.includes(this.searchModel) ||
            item.classTeacher.includes(this.searchModel)
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