<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>网页管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs tab-position="left" style="height: 550px">
        <el-tab-pane label="banner管理">
          <el-upload
            class="upload-demo"
            drag
            action="http://localhost:3000/upload/banner"
            multiple
            ref="upload"
            :file-list="fileList"
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
          <template>
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in bannerList" :key="item">
                <img :src="item" alt="" />
              </el-carousel-item>
            </el-carousel>
          </template>
        </el-tab-pane>
        <el-tab-pane label="新闻管理">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="新闻标题" prop="title_news">
              <el-input
                type="text"
                placeholder="请输入新闻标题"
                v-model="form.title_news"
                maxlength="20"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="8">
                <el-form-item label="新闻日期" prop="time_news">
                  <el-date-picker
                    v-model="form.time_news"
                    type="datetime"
                    placeholder="选择日期时间"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="新闻编号" prop="id_news">
                  <el-col :span="24">
                    <el-input
                      type="text"
                      placeholder="请输入新闻编号"
                      v-model="form.id_news"
                    ></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="新闻信息" prop="infor_news">
              <quill-editor
                ref="myTextEditor"
                v-model="form.infor_news"
                :options="editorOption"
                style="height: 350px"
              ></quill-editor>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="upload">提交</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="新闻查看" @click="handleClick">
          <el-table :data="newsList" style="width: 100%">
            <el-table-column label="新闻编号" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.id_news}}</span>
              </template>
            </el-table-column>
            <el-table-column label="新闻日期" width="190">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.time_news }}</span>
              </template>
            </el-table-column>
            <el-table-column label="新闻标题" width="600">
              <template slot-scope="scope">
                <span>{{scope.row.title_news}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      fileList: [],
      bannerList: [],
      activeNames: ["1"],
      form: {
        id_news: "",
        title_news: "",
        time_news: "",
        infor_news: "",
      },
      newsList:[],
      editorOption: {
        placeholder: "编辑文章内容",
      },
    };
  },
  components: {
    quillEditor,
  },
  methods: {
    handleClick(){
      this.handleNewsList();
    },
    //banner图管理
    async handleBannerList() {
      const { data: res } = await this.$axios.get("upload/banner_query");
      this.fileList = res.data;
      for (var i = 0; i < this.fileList.length; i++) {
        this.bannerList[i] =
          "http://localhost:3000/images/banner/" + this.fileList[i].name;
      }
    },
    async handleRemove(file) {
      const result = await this.$axios.post("upload/banner_delete", file);
    },
    handleChange(val) {
      console.log(val);
    },
    //新闻管理
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    async upload() {
      this.open();
      const result = await this.$axios.post("addNews/infor", this.form);
    },
    open(){
      this.$message({
        message:'上传成功！',
        type:'success'
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async handleNewsList(){
      const {data:res} =await this.$axios.get("queryNews/infor");
      this.newsList=res.data;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    async handleDelete(index, row) {
      const result=await this.$axios.post("deleteNews/infor",row);
      this.handleNewsList();
    }
  },
  created() {
    this.handleBannerList();
    this.handleNewsList();
  },
};
</script>
<style>
.upload-demo {
  width: 360px;
  margin-right: 10px;
  float: left;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.ql-editor {
  height: 260px;
}
.ql-container {
  height: auto;
}
</style>