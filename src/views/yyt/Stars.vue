<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card shadow="always">
        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="20" :xl="1">
            <el-input
              type="text"
              placeholder="请输入星级名称"
              v-model="Stars.starts"
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
          <el-table-column prop="starts" label="星级"> </el-table-column>
          <el-table-column prop="xmoney" label="维修金额"> </el-table-column>
          <el-table-column prop="sid" label="操作" align="right">
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
        :model="Starsa"
        :rules="rules"
        ref="Starsa"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="星级名称" prop="starts">
          <el-input v-model="Starsa.starts"></el-input>
        </el-form-item>
        <el-form-item label="维修金额" prop="xmoney">
          <el-input v-model="Starsa.xmoney"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('Starsa')"
            v-loading.fullscreen.lock="fullscreenLoading"
            >立即创建</el-button
          >
          <el-button @click="resetForm('Starsa')">重置</el-button>
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
        callback(new Error("请输入星级名称！"));
      } else {
        const axios = require("axios");
        let that = this;
        axios
          .get("http://localhost:8080/dzw_sys/api/Starss/byName/" + value)
          .then(function (res) {
            if (res.data != "") {
              callback(new Error("此名称已被占用！"));
            } else {
              callback();
            }
          });
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
      Starsa: { starts: "", sid: 0, xmoney: "" },
      dialogVisible: false,
      Stars: { starts: "" }, //条件查询
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
          "http://localhost:8080/dzw_sys/api/Starss/all/" +
            size +
            "/" +
            currentPage,
          this.Stars
        )
        .then(function (res) {
          //  console.log(res.data);
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
          if(this.Starsa.sid===0){
            axios
            .post(
              "http://localhost:8080/dzw_sys/api/Starss/insert",
              this.Starsa
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
                that.Starsa.starts = "";
                that.Starsa.xmoney = "";
                that.selectAll(that.size, that.currentPage);
              } else {
                that.$message.error("添加失败!");
              }
            });

          }else{
            axios
            .put(
              "http://localhost:8080/dzw_sys/api/Starss/update",
              this.Starsa
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
                that.Starsa.starts = "";
                that.Starsa.xmoney = "";
                that.Starsa.sid =0;
                that.selectAll(that.size, that.currentPage);
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
      if (this.Starsa.sid !== 0) {
        that.Starsa.starts = "";
        that.Starsa.xmoney = "";
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
        .delete("http://localhost:8080/dzw_sys/api/Starss/delete/" + row.sid)
        .then(function (res) {
          console.log(res.data);
          that.fullscreenLoading = false;
          if (res.data == 1) {
            that.$message({
              message: "移除成功",
              type: "success",
            });
            that.selectAll(that.size, that.currentPage);
          } else {
            that.$message.error("添加失败!");
          }
        });
    },

    update(row) {
      this.dialogVisible = true;
      this.Starsa.starts = row.starts;
      this.Starsa.xmoney = row.xmoney;
      this.Starsa.sid = row.sid;
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