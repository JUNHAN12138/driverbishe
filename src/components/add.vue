<template>
  <div>
    <el-page-header @back="goBack" content="车辆入库"></el-page-header>
    <el-card>
      <el-steps :active="active-0" finish-status="success" simple>
        <el-step title="填写信息" icon="el-icon-edit"></el-step>
        <el-step title="上传图片" icon="el-icon-picture"></el-step>
        <el-step title="审核" icon="el-icon-s-claim"></el-step>
        <el-step title="提交" icon="el-icon-success"></el-step>
      </el-steps>
      <el-tabs
        v-model="active"
        tab-position="left"
        style="height: 430px; margin-top: 20px"
        @tab-click="handleClick"
      >
        <el-tab-pane label="填写信息" name="0">
          <el-form ref="form" :model="form" label-width="80px">
            <el-row>
              <el-col :span="10">
                <el-form-item label="添加方式">
                  <el-radio-group v-model="form.repairCar">
                    <el-radio label="新车" border></el-radio>
                    <el-radio label="修理车" border></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="入库类型">
                  <el-radio-group v-model="form.wareHouse">
                    <el-radio label="采购"></el-radio>
                    <el-radio label="捐赠"></el-radio>
                    <el-radio label="下拨"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="省份">
                  <el-cascader
                    size="large"
                    :options="options"
                    v-model="selectedOptions"
                    @change="handleChange"
                  ></el-cascader>
                </el-form-item>
                <el-form-item label="具体来源">
                  <el-input v-model="form.company"></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                  <el-input v-model="form.charge"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                  <el-input v-model="form.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="2">
                <el-form-item label="车牌号">
                  <el-input v-model="form.plateId"></el-input>
                </el-form-item>
                <el-form-item label="车型号">
                  <el-input v-model="form.carId"></el-input>
                </el-form-item>
                <el-form-item label="车辆名称">
                  <el-input v-model="form.carname"></el-input>
                </el-form-item>
                <el-form-item label="单位">
                  <el-input v-model="form.unit"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="1">
          <el-upload
            class="upload-demo"
            drag
            action="http://localhost:3000/upload/car"
            multiple
            ref="upload"
            :on-remove="handleRemove"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
          <el-button @click="add()" type="primary">提交</el-button>
        </el-tab-pane>
        <el-tab-pane label="审核" name="2">
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
            <el-table-column prop="examine" label="审核" width="120"></el-table-column>
            <el-table-column fixed="right" label="操作" width="160">
              <template slot-scope="scope">
                <el-button  @click.native.prevent="update(scope.$index,tableData)" type="text" size="small"><i class="el-icon-s-claim"></i>通过</el-button>
                <el-tag type="success">审核通过</el-tag>
                <el-button
                  
                  @click.native.prevent="deletes(scope.row)"
                  type="text"
                  size="small"
                  ><i class="el-icon-delete"></i>删除</el-button
                >
                <el-tag type="error">删除成功</el-tag>
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
        </el-tab-pane>
        <el-tab-pane label="提交" name="3">
          <el-tag class="succ" type="success"><i class="el-icon-success"></i>车辆以入库</el-tag>
        </el-tab-pane>
      </el-tabs>
      <el-button v-if="active<3" style="margin-top: 12px;" @click="next">下一步</el-button>
      <el-button v-else-if="active==3" style="margin-top: 12px;" @click="finish">完成</el-button>
    </el-card>
  </div>
</template>
<script>
import {
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
export default {
  data() {
    return {
      first:1,
      second:1,
      tableData: [],
      currentPage: 1,
      pagesize: 10, //每页的数据
      userList: [],
      list: [],
      tableData_length: "", //一共多少条数据
      options: regionDataPlus,
      selectedOptions: "",
      active: "0",
      form: {
        carId: "",
        plateId: "",
        wareHouse: "采购",
        unit: "",
        carname: "",
        charge: "",
        repairCar: "新车",
        place: "",
        company: "",
        email: "",
        phone: "",
      },
      examiness:{
        plateId: "",
      }
    };
  },
  methods: {
    next() {
        if(this.active=='0'){
          this.active='1'
        }else if(this.active=='1'){
          this.active='2'
        }else if(this.active=='2'){
          this.active='3'
        }
    },
    finish(){
      this.active='0'
    },
    handleClick(tab,event){
      if(tab.name=='2'){
        var that=this;
        setTimeout(function(){
          that.onQuery();
        },500);
      }
    },
    onQuery(){
      this.handleUserList();
    },
    goBack() {
      window.history.back();
    },
    //地址选取器调用此函数，然后将地址选取器中的地区号码转成地区名，赋值给addForm字符串中各变量
    handleChange(value) {
      this.form.place =
        CodeToText[value[0]] +
        "/" +
        CodeToText[value[1]] +
        "/" +
        CodeToText[value[2]];
    },
    async handleRemove(file) {
      const result = await this.$axios.post("upload/car_delete", file);
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
      const { data: res } = await this.$axios.get("queryExamine/info");
      this.tableData = res.data;
      this.list = this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
      this.tableData_length = this.tableData.length;
      this.userList = this.tableData;
      this.getList();
    },
    getList(){
      this.list = this.tableData.slice(
          (this.currentPage - 1) * this.pagesize,
          this.currentPage * this.pagesize
        );
        this.tableData_length = this.tableData.length;
    },
    update(index,rows){
      this.examiness.plateId=this.tableData[index].plateId;
      this.$message({
        showClose:true,
        message:'审核通过，请刷新页面',
        type:'success'
      })
      this.examines();
      console.log(index)
    },
    async examines(){
      const result = await this.$axios.post("examine/info",this.examiness)
    },
    async deleteRow(rows) {
      const result = await this.$axios.post("deleteCar/info", rows);
    },
    async add(){
      const result=await this.$axios.post("addCar/info",this.form);
    }
  }
};
</script>
<style>
.el-tag.succ{
  position: relative;
  margin-top: 100px;
  margin-left: 300px;
  width: 400px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  font-size: 20px;
}
</style>