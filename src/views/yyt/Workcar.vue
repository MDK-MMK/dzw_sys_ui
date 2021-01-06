<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card shadow="always">
        <el-form :inline="true" :model="workcar" class="demo-form-inline">
          <el-form-item label="车牌号">
            <el-input v-model="workcar.caid" clearable></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="workcar.czt" placeholder="请选择">
              <el-option label="请选择" value=""></el-option>
              <el-option label="空闲" value="0"></el-option>
              <el-option label="作业中" value="1"></el-option>
              <el-option label="维修中" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="selectAll"
              >搜索</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="dialogVisible = true"
              >添加</el-button
            >
          </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="caid" label="车牌号"> </el-table-column>
          <el-table-column prop="cbrand" label="车辆品牌"> </el-table-column>
          <el-table-column prop="ccj" label="超出公里价钱"> </el-table-column>
          <el-table-column prop="czt" label="车辆状态">
            <template slot-scope="scope">
              <div v-if="scope.row.czt == 0">空闲</div>
              <div v-if="scope.row.czt == 1">作业中</div>
              <div v-if="scope.row.czt == 2">维修中</div>
            </template>
          </el-table-column>
          <el-table-column prop="qbj" label="起步价"> </el-table-column>
          <el-table-column prop="wid" label="操作">
            <template slot-scope="scope">
              <el-button
                type="warning"
                icon="el-icon-edit"
                circle
                v-loading.fullscreen.lock="fullscreenLoading"
                @click="updateA(scope.row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                v-loading.fullscreen.lock="fullscreenLoading"
                @click="delA(scope.row)"
              ></el-button>
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
        <!-- from -->
        <el-dialog
          title="外派车辆"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <el-form
            :model="Workcara"
            :rules="rules"
            ref="Workcara"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="车牌" prop="caid">
              <el-input v-model="Workcara.caid"></el-input>
            </el-form-item>
            <el-form-item label="车辆品牌" prop="cbrand">
              <el-input v-model="Workcara.cbrand"></el-input>
            </el-form-item>
            <el-form-item label="起步价" prop="qbj">
              <el-input v-model="Workcara.qbj"></el-input>
            </el-form-item>
            <el-form-item label="超出公里" prop="ccj">
              <el-input v-model="Workcara.ccj"></el-input>
            </el-form-item>
            <el-form-item v-if="czta==0" label="车辆状态" prop="czt">
              <el-select v-model="Workcara.czt" placeholder="请选择">
                <el-option
                  label="空闲状态"
                  value="0"
                >
                </el-option>
                <el-option
                  disabled
                  label="作业中"
                  value="1"
                >
                </el-option>
                <el-option
                  label="维修中"
                  value="2"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('Workcara')"
                v-loading.fullscreen.lock="fullscreenLoading"
                >立即创建</el-button
              >
              <el-button @click="resetForm('Workcara')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
const axios = require("axios");
export default {
  data() {
    //车牌号
    var validateCaid = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入车牌号！"));
      } else {
        axios
          .get("http://127.0.0.1:8080/dzw_sys/api/Workcars/ByCaid/" + value)
          .then(function (res) {
            if (res.data == 1) {
              callback(new Error("当前车牌号已有，请重新输入！"));
            } else {
              callback();
            }
          });
      }
    };
    //车辆品牌
    var validateCbrand = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入车辆品牌！"));
      } else {
        callback();
      }
    };
    //车辆起步价
    var validateQbj = (rule, value, callback) => {
      console.log(value, rule, callback);
      const num = /^[0-9]*$/;
      if (value === "") {
        callback(new Error("请输入起步价！"));
      } else {
        if (!num.test(value)) {
          callback(new Error("请输入纯数字！"));
        } else {
          callback();
        }
      }
    };
    //超出公里
    var validateCcj = (rule, value, callback) => {
      const num = /^[0-9]*$/;
      if (value === "") {
        callback(new Error("请输入超出公里价格！"));
      } else {
        if (!num.test(value)) {
          callback(new Error("请输入纯数字！"));
        } else {
          callback();
        }
      }
    };
    return {
      fullscreenLoading: false,
      workcar: { caid: "", czt: "" }, //查询条件
      tableData: [],
      currentPage: 1, //当前页数
      size: 4, //每页大小
      total: 0, //总条数
      dialogVisible: false,
      Workcara: { caid: "", czt: '0', wid: 0, cbrand: "", qbj: "", ccj: "" },
      rules: {
        caid: [{ validator: validateCaid, trigger: "blur" }],
        cbrand: [{ validator: validateCbrand, trigger: "blur" }],
        qbj: [{ validator: validateQbj, trigger: "blur" }],
        ccj: [{ validator: validateCcj, trigger: "blur" }],
      },
      czta:1,
      d:false,
    };
  },
  mounted() {
    this.selectAll();
  },
  methods: {
    updateA(row) {
      this.Workcara = row;
      this.czta=0;
      this.Workcara.czt+="";
      this.dialogVisible = true;
    },
    //提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true;
          let that = this;
          if (this.Workcara.wid === 0) {
            axios
              .post(
                "http://localhost:8080/dzw_sys/api/Workcars/insert",
                this.Workcara
              )
              .then(function (res) {
                that.fullscreenLoading = false;
                //console.log(res.data);
                that.dialogVisible = false;
                that.resetForm("Workcara");
                if (res.data == 1) {
                  that.$message({
                    message: "添加成功",
                    type: "success",
                  });
                  that.selectAll();
                } else {
                  that.$message.error("添加失败!");
                }
              });
          } else {
            axios
              .put(
                "http://localhost:8080/dzw_sys/api/Workcars/update",
                this.Workcara
              )
              .then(function (res) {
                that.fullscreenLoading = false;
                that.dialogVisible = false;
                that.resetForm("Workcara");
                that.Workcara.wid = 0;
                //console.log(res.data);
                if (res.data == 1) {
                  that.$message({
                    message: "修改成功",
                    type: "success",
                  });
                  that.selectAll();
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
      this.Workcara.wid = 0;
      this.$refs[formName].resetFields();
    },
    //关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val;
      this.selectAll();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.selectAll();
    },
    //查询
    selectAll() {
      let that = this;
      axios
        .post(
          "http://127.0.0.1:8080/dzw_sys/api/Workcars/All/" +
            this.size +
            "/" +
            this.currentPage,
          this.workcar
        )
        .then(function (res) {
          //console.log(res.data);
          that.tableData = res.data.list;
          that.total = res.data.total;
        });
    },
    //删除
    delA(row) {
      if (row.czt != 0) {
        this.$message({
          message: "当前车辆不处于空闲状态，不可移除!",
          type: "warning",
        });
        return;
      }
    },
  },
};
</script>
<style scoped>
</style>