<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
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
          <el-button type="success" @click="addCarInfo()"
            >入库<i class="el-icon-upload el-icon--right"></i
          ></el-button>
        </el-form-item>
      </el-form>
      <el-table :data="list" style="width: 100%" max-height="450">
        <el-table-column
          fixed
          prop="plateId"
          label="车牌号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="carId"
          label="车型号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="repairCar"
          label="添加方式"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="wareHouse"
          label="入库类型"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="unit"
          label="单位（辆）"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="carname"
          label="车辆名称"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="charge"
          label="负责人"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="place"
          label="地址"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="company"
          label="公司"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="电子邮件"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式"
          width="180"
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
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="车牌号" prop="plateId">
                <el-col :span="23">
                  <el-input v-model="form.plateId"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="车型号" prop="carId">
                <el-col :span="23">
                  <el-input v-model="form.carId"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="负责人" prop="charge">
                <el-input v-model="form.charge"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="添加方式" prop="repairCar">
                <el-col :span="23">
                  <el-input v-model="form.repairCar"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="入库类型" prop="wareHouse">
                <el-col :span="23">
                  <el-input v-model="form.wareHouse"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="单位" prop="unit">
                <el-input v-model="form.unit"></el-input>
              </el-form-item>
              <el-form-item label="车辆名称" prop="carname">
                <el-input v-model="form.carname"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="place">
                <el-input v-model="form.place"></el-input>
              </el-form-item>
              <el-form-item label="公司" prop="company">
                <el-input v-model="form.company"></el-input>
              </el-form-item>
              <el-form-item label="电子邮件" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" prop="phone">
                <el-input v-model="form.phone"></el-input>
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
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="车牌号" prop="plateId">
                <el-col :span="23">
                  <el-input v-model="form.plateId"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="车型号" prop="carId">
                <el-col :span="23">
                  <el-input v-model="form.carId"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="添加方式" prop="repairCar">
                <el-col :span="23">
                  <el-input v-model="form.repairCar"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="入库类型" prop="wareHouse">
                <el-col :span="23">
                  <el-select v-model="form.wareHouse" placeholder="请选择">
                    <el-option label="采购" value="采购"></el-option>
                    <el-option label="捐赠" value="捐赠"></el-option>
                    <el-option label="下拨" value="下拨"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item label="负责人" prop="charge">
                <el-input v-model="form.charge"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="单位（辆）" prop="unit">
                <el-input v-model="form.unit"></el-input>
              </el-form-item>
              <el-form-item label="车辆名称" prop="carname">
                <el-input v-model="form.repairPay"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="place">
                <el-input v-model="form.place"></el-input>
              </el-form-item>
              <el-form-item label="公司" prop="company">
                <el-input v-model="form.company"></el-input>
              </el-form-item>
              <el-form-item label="电子邮件" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" prop="phone">
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
        carId: "",
        plateId: "",
        wareHouse: "",
        unit: "",
        carname: "",
        charge: "",
        repairCar: "",
        place: "",
        company: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {
    addCarInfo() {
      this.$router.push("/components/add");
    },
    //搜索数据
    search() {
      this.currentPage = 1;
      this.getList;
      let lists = this.userList.filter(
        (item, index) =>
          item.carId.includes(this.searchModel) ||
          item.plateId.includes(this.searchModel) ||
          item.charge.includes(this.searchModel) ||
          item.wareHouse.includes(this.searchModel) ||
          item.unit.includes(this.searchModel) ||
          item.carname.includes(this.searchModel) ||
          item.repairCar.includes(this.searchModel) ||
          item.email.includes(this.searchModel) ||
          item.plateId.includes(this.searchModel)
      );
      this.list = lists.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
      this.tableData_length = lists.length;
    },
    //查看数据详情
    lookUp(index) {
      this.form.carId = this.tableData[index].carId;
      this.form.plateId = this.tableData[index].plateId;
      this.form.wareHouse = this.tableData[index].wareHouse;
      this.form.charge = this.tableData[index].charge;
      this.form.unit = this.tableData[index].unit;
      this.form.carname = this.tableData[index].carname;
      this.form.repairCar = this.tableData[index].repairCar;
      this.form.place = this.tableData[index].place;
      this.form.company = this.tableData[index].company;
      this.form.email = this.tableData[index].email;
      this.form.phone = this.tableData[index].phone;
    },
    //更改数据
    update(index) {
      this.form.carId = this.tableData[index].carId;
      this.form.plateId = this.tableData[index].plateId;
      this.form.wareHouse = this.tableData[index].wareHouse;
      this.form.charge = this.tableData[index].charge;
      this.form.unit = this.tableData[index].unit;
      this.form.carname = this.tableData[index].carname;
      this.form.repairCar = this.tableData[index].repairCar;
      this.form.place = this.tableData[index].place;
      this.form.company = this.tableData[index].company;
      this.form.email = this.tableData[index].email;
      this.form.phone = this.tableData[index].phone;
    },
    async updaterow() {
      const result = await this.$axios.post("updateCar/info", this.form);
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
      const result = await this.$axios.post("deleteCar/info", rows);
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
      const { data: res } = await this.$axios.get("queryCar/info");
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
            item.carId.includes(this.searchModel) ||
            item.plateId.includes(this.searchModel) ||
            item.isFault.includes(this.searchModel) ||
            item.charge.includes(this.searchModel) ||
            item.repairParts.includes(this.searchModel) ||
            item.repairPay.includes(this.searchModel)
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
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
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