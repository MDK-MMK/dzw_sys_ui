<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card shadow="always">
        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="6" :lg="20" :xl="1">
            <el-input
              type="text"
              placeholder="请输入职位名称"
              v-model="Zhiwei.zname"
              class="input-shous"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                clearable
                @click="selectAll(size, currentPage)"
              ></el-button>
            </el-input>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="2" :xl="11">
            <el-button
              type="primary"
              style=""
              icon="el-icon-circle-plus-outline"
              round
              @click="dialogVisible = true"
              >添加</el-button
            >
          </el-col>
        </el-row>

        <el-table
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          :v-loading="loading"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column prop="zname" label="职位名称"> </el-table-column>
          <el-table-column prop="zid" label="操作" align="right">
            <template slot-scope="scope">
              <el-button
                type="warning"
                icon="el-icon-edit"
                round
                @click="update(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                round
                @click="del(scope.row)"
                >移除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
        style="margin-top:10px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[4, 6, 8, 10]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-card>
    </el-col>

    <el-dialog
      title="技工星级"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="Zhiweia"
        :rules="rules"
        ref="Zhiweia"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="职位名称" prop="zname">
          <el-input v-model="Zhiweia.zname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('Zhiweia')"
            v-loading.fullscreen.lock="fullscreenLoading"
            >立即创建</el-button
          >
          <el-button @click="resetForm('Zhiweia')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>
<script>
export default {
  data() {
    var validatestarts = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入职位名称！"));
      } else {
        //console.log(this.Zhiweia.zid);
        if(this.Zhiweia.zid==0){
           const axios = require("axios");
        let that = this;
        axios
          .get("http://localhost:8080/dzw_sys/api/Zhiwei/byName/" + value)
          .then(function (res) {
            if (res.data != "") {
              callback(new Error("此名称已被占用！"));
            } else {
              callback();
            }
          });
        }else{
          callback();
        }
       
      }
    };
    var validatexmoney = (rule, value, callback) => {
      const age = /^[0-9]*$/;
      if (value === "") {
        callback(new Error("请输入维修金额！"));
      } else {
        if (!age.test(value)) {
          callback(new Error("金额只能是数字！"));
        } else {
          callback();
        }
      }
    };
    return {
      visible: false,
      fullscreenLoading: false,
      Zhiweia: { zid: 0, zname: "" },
      dialogVisible: false,
      Zhiwei: { zname: "" }, //条件查询
      currentPage: 1, //当前页数
      size: 4, //每页大小
      total: 0, //总条数
      loading: true, //控制加载动画
      tableData: [], //数据
      rules: {
        starts: [{ validator: validatestarts, trigger: "blur" }],
        xmoney: [{ validator: validatexmoney, trigger: "blur" }],
      },
    };
  },
  created() {
    this.selectAll(4, 1);
  },
  methods: {
    //查询
    selectAll(size, currentPage) {
      const axios = require("axios");
      let that = this;
      axios
        .post(
          "http://localhost:8080/dzw_sys/api/Zhiwei/all/" +
            size +
            "/" +
            currentPage,
          this.Zhiwei
        )
        .then(function (res) {
            console.log(res.data);
          that.tableData = res.data.list;
          that.total = res.data.total;
        });
    },
    //分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val;
      this.selectAll(this.size, this.currentPage);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.selectAll(this.size, this.currentPage);
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        this.Zhiweia.zname = "";
        this.Zhiweia.zid= 0;
        //console.log(this.Zhiweia);
        })
        .catch((_) => {});
    },
    //提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          this.fullscreenLoading = true;
          const axios = require("axios");
          let that = this;
          console.log(this.Zhiweia.zid);
          if(this.Zhiweia.zid===0){
            axios
            .post(
              "http://localhost:8080/dzw_sys/api/Zhiwei/insert",
              this.Zhiweia
            )
            .then(function (res) {
              that.fullscreenLoading = false;
              //console.log(res.data);
              if (res.data == 1) {
                that.$message({
                  message: "添加成功",
                  type: "success",
                });
                that.dialogVisible = false;
                that.Zhiweia.zname = "";
                that.selectAll(that.size, that.currentPage);
              } else {
                that.$message.error("添加失败!");
              }
            });

          }else{
            axios
            .put(
              "http://localhost:8080/dzw_sys/api/Zhiwei/update",
              this.Zhiweia
            )
            .then(function (res) {
              that.fullscreenLoading = false;
              //console.log(res.data);
              if (res.data == 1) {
                that.$message({
                  message: "修改成功",
                  type: "success",
                });
                that.dialogVisible = false;
                that.Zhiweia.zname = "";
                that.Zhiweia.zid =0;
                that.selectAll(that.size, 1);
              } else {
                that.$message.error("修改失败!");
              }
            });



          }

        } else {
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      let that=this;
      if (this.Zhiweia.zid !== 0) {
        that.Zhiweia.zname = "";
      }else{
         this.$refs[formName].resetFields();
      }
    },
    //删除
    del(row) {
      this.fullscreenLoading = true;
      const axios = require("axios");
      let that = this;
      //console.log(row);
      axios
        .delete("http://localhost:8080/dzw_sys/api/Zhiwei/delete/" + row.zid)
        .then(function (res) {
          console.log(res.data);
          that.fullscreenLoading = false;
          if (res.data == 1) {
            that.$message({
              message: "移除成功",
              type: "success",
            });
            that.selectAll(that.size,1);
          } else {
            that.$message.error("添加失败!");
          }
        });
    },

    update(row) {
      this.dialogVisible = true;
      this.Zhiweia.zname = row.zname;
      this.Zhiweia.zid = row.zid;
    },
  },
};
</script>
<style scoped>
.input-shous {
  width: 25%;
  margin-left: -70%;
  margin-bottom: 2%;
}
</style>