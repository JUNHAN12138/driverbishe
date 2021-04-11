<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>学员管理</el-breadcrumb-item>
      <el-breadcrumb-item>学员考试信息管理</el-breadcrumb-item>
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
          prop="trainingCar"
          label="考试车型"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="exam"
          label="已考科目"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="appoint"
          label="预约考试科目"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="appointDate"
          label="预约考试时间"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="appointPlace"
          label="预约考试地点"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="score1"
          label="科目一分数"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="score1date"
          label="科目一考试时间"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="score1Place"
          label="科目一考试地点"
          width="200"
        ></el-table-column>
        <el-table-column label="科目一是否合格" width="120" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.score1 >= 90" class="el-icon-check"></i>
            <i v-else class="el-icon-close"></i>
          </template>
        </el-table-column>
        <el-table-column
          prop="score2"
          label="科目二分数"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="score2date"
          label="科目二考试时间"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="score2Place"
          label="科目二考试地点"
          width="200"
        ></el-table-column>
        <el-table-column label="科目二是否合格" width="120" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.score2 >= 80" class="el-icon-check"></i>
            <i v-else class="el-icon-close"></i>
          </template>
        </el-table-column>
        <el-table-column
          prop="score3"
          label="科目三分数"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="score3date"
          label="科目三考试时间"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="score3Place"
          label="科目三考试地点"
          width="200"
        ></el-table-column>
        <el-table-column label="科目三是否合格" width="120" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.score3 >= 80" class="el-icon-check"></i>
            <i v-else class="el-icon-close"></i>
          </template>
        </el-table-column>
        <el-table-column
          prop="score4"
          label="科目四分数"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="score4date"
          label="科目四考试时间"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="score4Place"
          label="科目四考试地点"
          width="200"
        ></el-table-column>
        <el-table-column label="科目四是否合格" width="120" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.score4 >= 90" class="el-icon-check"></i>
            <i v-else class="el-icon-close"></i>
          </template>
        </el-table-column>
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
              <el-form-item label="身份证号" prop="ID">
                <el-input v-model="form.ID"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" prop="phone">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
              <el-form-item label="考试车型" prop="trainingCar">
                <el-input v-model="form.trainingCar"></el-input>
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
            <el-col :span="20">
              <el-form-item label="已考科目" prop="exam">
                <el-col :span="20">
                  <el-input v-model="form.exam"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="预约科目" prop="appoint">
                <el-col :span="20">
                  <el-input v-model="form.appoint"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="预约时间" prop="appointDate">
                <el-date-picker
                  v-model="form.appointDate"
                  type="datetime"
                  placeholder="选择日期时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="预约地点" prop="appointPlace">
                <el-input v-model="form.appointPlace"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="科一分数" prop="score1">
                <el-col :span="16">
                  <el-input v-model="form.score1"></el-input>
                </el-col>
                <el-col :span="16">
                  <el-input v-model="form.score1date"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="科二分数" prop="score2">
                <el-col :span="16">
                  <el-input v-model="form.score2"></el-input>
                </el-col>
                <el-col :span="16">
                  <el-input v-model="form.score2date"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="科三分数" prop="score3">
                <el-col :span="16">
                  <el-input v-model="form.score3"></el-input>
                </el-col>
                <el-col :span="16">
                  <el-input v-model="form.score3date"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="科四分数" prop="score4">
                <el-col :span="16">
                  <el-input v-model="form.score4"></el-input>
                </el-col>
                <el-col :span="16">
                  <el-input v-model="form.score4date"></el-input>
                </el-col>
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
              <el-form-item label="身份证号" prop="ID">
                <el-input v-model="form.ID"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" prop="phone">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
              <el-form-item label="考试车型" prop="trainingCar">
                <el-input v-model="form.trainingCar"></el-input>
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
            <el-col :span="20">
              <el-form-item label="已考科目" prop="exam">
                <el-col :span="20">
                  <el-input v-model="form.exam"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="预约科目" prop="appoint">
                <el-col :span="20">
                  <el-input v-model="form.appoint"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="预约时间" prop="appointDate">
                <el-col :span="20">
                  <el-date-picker
                    v-model="form.appointDate"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="预约地点" prop="appointPlace">
                <el-input v-model="form.appointPlace"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="科目一" prop="score1">
                <el-col :span="10">
                  <el-input v-model="form.score1"></el-input>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-dialog
                    title="科目一分数录入"
                    :visible.sync="innerVisible1"
                    append-to-body
                  >
                    <el-form ref="form" :model="form" label-width="80px">
                      <el-row>
                        <el-col :span="14">
                          <el-form-item label="学员号" prop="stuId">
                            <el-input v-model="form.stuId"></el-input>
                          </el-form-item>
                          <el-form-item label="考试号" prop="stuAdmi">
                            <el-input v-model="form.stuAdmi"></el-input>
                          </el-form-item>
                          <el-form-item label="姓名" prop="stuName">
                            <el-input v-model="form.stuName"></el-input>
                          </el-form-item>
                          <el-form-item label="性别" prop="stuSex">
                            <el-select
                              v-model="form.stuSex"
                              placeholder="请选择"
                            >
                              <el-option label="男" value="男"></el-option>
                              <el-option label="女" value="女"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="身份证号" prop="ID">
                            <el-input v-model="form.ID"></el-input>
                          </el-form-item>
                          <el-form-item label="联系方式" prop="phone">
                            <el-input v-model="form.phone"></el-input>
                          </el-form-item>
                          <el-form-item label="考试车型" prop="trainingCar">
                            <el-input v-model="form.trainingCar"></el-input>
                          </el-form-item>
                          <el-form-item label="考试类型">
                            <el-input value="科目一"></el-input>
                          </el-form-item>
                          <el-form-item label="考试地点" prop="score1Place">
                            <el-input v-model="form.score1Place"></el-input>
                          </el-form-item>
                          <el-form-item label="考试成绩" prop="score1">
                            <el-input v-model="form.score1"></el-input>
                          </el-form-item>
                          <el-form-item label="考试时间" prop="score1date">
                            <el-date-picker
                              v-model="form.score1date"
                              type="datetime"
                              format="yyyy-MM-dd HH:mm:ss"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="选择日期时间"
                            ></el-date-picker>
                          </el-form-item>
                          <el-form-item label="科目一是否合格" width="120">
                            <el-input
                              v-if="form.score1 >= 90"
                              value="合格"
                            ></el-input>
                            <el-input v-else value="不合格"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="innerVisible1 = false"
                        >取 消</el-button
                      >
                      <el-button type="primary" @click="innerVisible1 = false"
                        >确 定</el-button
                      >
                    </div>
                  </el-dialog>
                  <el-button type="primary" @click="innerVisible1 = true"
                    >科目一录入</el-button
                  >
                </el-col>
              </el-form-item>
              <el-form-item label="科目二" prop="score2">
                <el-col :span="10">
                  <el-input v-model="form.score2"></el-input>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-dialog
                    title="科目二分数录入"
                    :visible.sync="innerVisible2"
                    append-to-body
                  >
                    <el-form ref="form" :model="form" label-width="80px">
                      <el-row>
                        <el-col :span="14">
                          <el-form-item label="学员号" prop="stuId">
                            <el-input v-model="form.stuId"></el-input>
                          </el-form-item>
                          <el-form-item label="考试号" prop="stuAdmi">
                            <el-input v-model="form.stuAdmi"></el-input>
                          </el-form-item>
                          <el-form-item label="姓名" prop="stuName">
                            <el-input v-model="form.stuName"></el-input>
                          </el-form-item>
                          <el-form-item label="性别" prop="stuSex">
                            <el-select
                              v-model="form.stuSex"
                              placeholder="请选择"
                            >
                              <el-option label="男" value="男"></el-option>
                              <el-option label="女" value="女"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="身份证号" prop="ID">
                            <el-input v-model="form.ID"></el-input>
                          </el-form-item>
                          <el-form-item label="联系方式" prop="phone">
                            <el-input v-model="form.phone"></el-input>
                          </el-form-item>
                          <el-form-item label="考试车型" prop="trainingCar">
                            <el-input v-model="form.trainingCar"></el-input>
                          </el-form-item>
                          <el-form-item label="考试类型">
                            <el-input value="科目二"></el-input>
                          </el-form-item>
                          <el-form-item label="考试地点" prop="score2Place">
                            <el-input v-model="form.score2Place"></el-input>
                          </el-form-item>
                          <el-form-item label="考试成绩" prop="score2">
                            <el-input v-model="form.score2"></el-input>
                          </el-form-item>
                          <el-form-item label="考试时间" prop="score2date">
                            <el-date-picker
                              v-model="form.score2date"
                              type="datetime"
                              format="yyyy-MM-dd HH:mm:ss"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="选择日期时间"
                            ></el-date-picker>
                          </el-form-item>
                          <el-form-item label="科目二是否合格" width="120">
                            <el-input
                              v-if="form.score2 >= 80"
                              value="合格"
                            ></el-input>
                            <el-input v-else value="不合格"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="innerVisible2 = false"
                        >取 消</el-button
                      >
                      <el-button type="primary" @click="innerVisible2 = false"
                        >确 定</el-button
                      >
                    </div>
                  </el-dialog>
                  <el-button type="primary" @click="innerVisible2 = true"
                    >科目二录入</el-button
                  >
                </el-col>
              </el-form-item>
              <el-form-item label="科目三" prop="score3">
                <el-col :span="10">
                  <el-input v-model="form.score3"></el-input>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-dialog
                    title="科目三分数录入"
                    :visible.sync="innerVisible3"
                    append-to-body
                  >
                    <el-form ref="form" :model="form" label-width="80px">
                      <el-row>
                        <el-col :span="14">
                          <el-form-item label="学员号" prop="stuId">
                            <el-input v-model="form.stuId"></el-input>
                          </el-form-item>
                          <el-form-item label="考试号" prop="stuAdmi">
                            <el-input v-model="form.stuAdmi"></el-input>
                          </el-form-item>
                          <el-form-item label="姓名" prop="stuName">
                            <el-input v-model="form.stuName"></el-input>
                          </el-form-item>
                          <el-form-item label="性别" prop="stuSex">
                            <el-select
                              v-model="form.stuSex"
                              placeholder="请选择"
                            >
                              <el-option label="男" value="男"></el-option>
                              <el-option label="女" value="女"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="身份证号" prop="ID">
                            <el-input v-model="form.ID"></el-input>
                          </el-form-item>
                          <el-form-item label="联系方式" prop="phone">
                            <el-input v-model="form.phone"></el-input>
                          </el-form-item>
                          <el-form-item label="考试车型" prop="trainingCar">
                            <el-input v-model="form.trainingCar"></el-input>
                          </el-form-item>
                          <el-form-item label="考试类型">
                            <el-input value="科目三"></el-input>
                          </el-form-item>
                          <el-form-item label="考试地点" prop="score3Place">
                            <el-input v-model="form.score3Place"></el-input>
                          </el-form-item>
                          <el-form-item label="考试成绩" prop="score3">
                            <el-input v-model="form.score3"></el-input>
                          </el-form-item>
                          <el-form-item label="考试时间" prop="score3date">
                            <el-date-picker
                              v-model="form.score3date"
                              type="datetime"
                              format="yyyy-MM-dd HH:mm:ss"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="选择日期时间"
                            ></el-date-picker>
                          </el-form-item>
                          <el-form-item label="科目三是否合格" width="120">
                            <el-input
                              v-if="form.score3 >= 80"
                              value="合格"
                            ></el-input>
                            <el-input v-else value="不合格"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="innerVisible3 = false"
                        >取 消</el-button
                      >
                      <el-button type="primary" @click="innerVisible3 = false"
                        >确 定</el-button
                      >
                    </div>
                  </el-dialog>
                  <el-button type="primary" @click="innerVisible3 = true"
                    >科目三录入</el-button
                  >
                </el-col>
              </el-form-item>
              <el-form-item label="科目四" prop="score4">
                <el-col :span="10">
                  <el-input v-model="form.score4"></el-input>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-dialog
                    title="科目四分数录入"
                    :visible.sync="innerVisible4"
                    append-to-body
                  >
                    <el-form ref="form" :model="form" label-width="80px">
                      <el-row>
                        <el-col :span="14">
                          <el-form-item label="学员号" prop="stuId">
                            <el-input v-model="form.stuId"></el-input>
                          </el-form-item>
                          <el-form-item label="考试号" prop="stuAdmi">
                            <el-input v-model="form.stuAdmi"></el-input>
                          </el-form-item>
                          <el-form-item label="姓名" prop="stuName">
                            <el-input v-model="form.stuName"></el-input>
                          </el-form-item>
                          <el-form-item label="性别" prop="stuSex">
                            <el-select
                              v-model="form.stuSex"
                              placeholder="请选择"
                            >
                              <el-option label="男" value="男"></el-option>
                              <el-option label="女" value="女"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="身份证号" prop="ID">
                            <el-input v-model="form.ID"></el-input>
                          </el-form-item>
                          <el-form-item label="联系方式" prop="phone">
                            <el-input v-model="form.phone"></el-input>
                          </el-form-item>
                          <el-form-item label="考试车型" prop="trainingCar">
                            <el-input v-model="form.trainingCar"></el-input>
                          </el-form-item>
                          <el-form-item label="考试类型">
                            <el-input value="科目四"></el-input>
                          </el-form-item>
                          <el-form-item label="考试地点" prop="score4Place">
                            <el-input v-model="form.score4Place"></el-input>
                          </el-form-item>
                          <el-form-item label="考试成绩" prop="score4">
                            <el-input v-model="form.score4"></el-input>
                          </el-form-item>
                          <el-form-item label="考试时间" prop="score4date">
                            <el-date-picker
                              v-model="form.score4date"
                              type="datetime"
                              format="yyyy-MM-dd HH:mm:ss"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="选择日期时间"
                            ></el-date-picker>
                          </el-form-item>
                          <el-form-item label="科目四是否合格" width="120">
                            <el-input
                              v-if="form.score4 >= 90"
                              value="合格"
                            ></el-input>
                            <el-input v-else value="不合格"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="innerVisible4 = false"
                        >取 消</el-button
                      >
                      <el-button type="primary" @click="innerVisible4 = false"
                        >确 定</el-button
                      >
                    </div>
                  </el-dialog>
                  <el-button type="primary" @click="innerVisible4 = true"
                    >科目四录入</el-button
                  >
                </el-col>
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
    <!-- <el-dialog title="添加新成员" :visible.sync="addDialog">
      <el-form ref="addform" :model="addform" :rules="rules" label-width="80px">
        <el-row>
            <el-col :span="14">
              <el-form-item label="学员号" prop="stuId">
                <el-col :span="23">
                  <el-input v-model="addform.stuId"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="考试号" prop="stuAdmi">
                  <el-col :span="23">
                      <el-input v-model="addform.stuAdmi"></el-input>
                  </el-col>
              </el-form-item>
              <el-form-item label="姓名" prop="stuName">
                <el-col :span="23">
                  <el-input v-model="addform.stuName"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="性别" prop="stuSex">
                <el-col :span="23">
                  <el-select v-model="addform.stuSex" placeholder="请选择">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item label="车型号" prop="modelID">
                <el-col :span="23">
                  <el-input v-model="addform.modelID"></el-input>
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
              <el-form-item label="已考科目" prop="exam">
                <el-col :span="20">
                  <el-input v-model="addform.exam"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预约考试科目" prop="appoint">
                <el-col :span="20">
                  <el-input v-model="addform.appoint"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="科目一分数" prop="score1">
                <el-input v-model="addform.score1"></el-input>
              </el-form-item>
              <el-form-item label="科目二分数" prop="score2">
                <el-input v-model="addform.score2"></el-input>
              </el-form-item>
              <el-form-item label="科目三分数" prop="score3">
                <el-input v-model="addform.score3"></el-input>
              </el-form-item>
              <el-form-item label="科目四分数" prop="score4">
                  <el-input v-model="addform.score4"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        <el-form-item>
          <el-button type="primary" @click="open()">保存</el-button>
          <el-button type="primary" @click="resetForm('addform')">重置</el-button>
          <el-button @click="addDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      //科目分数录入
      innerVisible1: false,
      innerVisible2: false,
      innerVisible3: false,
      innerVisible4: false,
      //查找项
      searchModel: "",
      //添加项
      // addDialog: false,
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
        stuAdmi: "",
        stuName: "",
        stuSex: "",
        ID: "",
        phone: "",
        trainingCar: "",
        exam: "",
        appoint: "",
        appointDate: "",
        appointPlace: "",
        score1: "",
        score1date: "",
        score1Place: "",
        score2: "",
        score2date: "",
        score2Place: "",
        score3: "",
        score3date: "",
        score3Place: "",
        score4: "",
        score4date: "",
        score4Place: "",
      },
      rules: {
        stuId: [
          { required: true, message: "请输入学员号", trigger: "blur" },
          { min: 6, max: 6, message: "长度为6个字符", trigger: "blur" },
        ],
        stuAdmi: [
          {
            required: true,
            message: "请输入长度为6个字符的考试号",
            trigger: "blur",
          },
        ],
        stuName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        stuSex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        modelID: [
          { required: true, message: "请输入两位所学车型号", trigger: "blur" },
        ],
        exam: [{ required: true, message: "请输入已考科目", trigger: "blur" }],
        appoint: [
          { required: true, message: "请输入预约考试科目", trigger: "blur" },
        ],
        score1: [{ required: true, message: "科目一分数", trigger: "blur" }],
        score2: [{ required: true, message: "科目二分数", trigger: "blur" }],
        score3: [{ required: true, message: "科目三分数", trigger: "blur" }],
        score4: [{ required: true, message: "科目四分数", trigger: "blur" }],
      },
    };
  },
  methods: {
    //搜索数据
    search() {
      this.currentPage = 1;
      let lists = this.userList.filter(
        (item, index) =>
          item.stuId.includes(this.searchModel) ||
          item.stuAdmi.includes(this.searchModel) ||
          item.stuName.includes(this.searchModel)
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
      this.form.stuAdmi = this.tableData[index].stuAdmi;
      this.form.stuName = this.tableData[index].stuName;
      this.form.stuSex = this.tableData[index].stuSex;
      this.form.ID = this.tableData[index].ID;
      this.form.phone = this.tableData[index].phone;
      this.form.trainingCar = this.tableData[index].trainingCar;
      this.form.exam = this.tableData[index].exam;
      this.form.appoint = this.tableData[index].appoint;
      this.form.appointDate = this.tableData[index].appointDate;
      this.form.appointPlace = this.tableData[index].appointPlace;
      this.form.score1 = this.tableData[index].score1;
      this.form.score1date = this.tableData[index].score1date;
      this.form.score1Place = this.tableData[index].score1Place;
      this.form.score2 = this.tableData[index].score2;
      this.form.score2date = this.tableData[index].score2date;
      this.form.score2Place = this.tableData[index].score2Place;
      this.form.score3 = this.tableData[index].score3;
      this.form.score3date = this.tableData[index].score3date;
      this.form.score3Place = this.tableData[index].score3Place;
      this.form.score4 = this.tableData[index].score4;
      this.form.score4date = this.tableData[index].score4date;
      this.form.score4Place = this.tableData[index].score4Place;
    },
    //更改数据
    update(index) {
      this.form.stuId = this.tableData[index].stuId;
      this.form.stuAdmi = this.tableData[index].stuAdmi;
      this.form.stuName = this.tableData[index].stuName;
      this.form.stuSex = this.tableData[index].stuSex;
      this.form.ID = this.tableData[index].ID;
      this.form.phone = this.tableData[index].phone;
      this.form.trainingCar = this.tableData[index].trainingCar;
      this.form.exam = this.tableData[index].exam;
      this.form.appoint = this.tableData[index].appoint;
      this.form.appointDate = this.tableData[index].appointDate;
      this.form.appointPlace = this.tableData[index].appointPlace;
      this.form.score1 = this.tableData[index].score1;
      this.form.score1date = this.tableData[index].score1date;
      this.form.score1Place = this.tableData[index].score1Place;
      this.form.score2 = this.tableData[index].score2;
      this.form.score2date = this.tableData[index].score2date;
      this.form.score2Place = this.tableData[index].score2Place;
      this.form.score3 = this.tableData[index].score3;
      this.form.score3date = this.tableData[index].score3date;
      this.form.score3Place = this.tableData[index].score3Place;
      this.form.score4 = this.tableData[index].score4;
      this.form.score4date = this.tableData[index].score4date;
      this.form.score4Place = this.tableData[index].score4Place;
    },
    async updaterow() {
      console.log(this.form);
      const result = await this.$axios.post("updateStu/exam", this.form);

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
      const result = await this.$axios.post("deleteStu/exam", rows);
      this.handleUserList();
    },
    // // 添加一条新数据
    // async addRow() {
    //   const result = await this.$axios.post("addStu/exam", this.form);
    //   console.log(this.form)
    //   this.handleUserList();
    // },
    // open() {
    //   this.$confirm("是否在离开页面前保存修改？", "确认信息", {
    //     distinguishCancelAndClose: true,
    //     confirmButtonText: "保存",
    //     cancelButtonText: "放弃修改",
    //   })
    //     .then(() => {
    //       this.$message({
    //         type: "success",
    //         message: "保存成功",
    //       });
    //       this.addRow();
    //     })
    //     .catch((action) => {
    //       this.$message({
    //         type: "info",
    //         message:
    //           action === "cancel" ? "放弃保存并离开页面" : "停留在当前页面",
    //       });
    //     });
    // },
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
      const { data: res } = await this.$axios.get("queryStu/exam");
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
            item.stuAdmi.includes(this.searchModel) ||
            item.stuName.includes(this.searchModel)
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