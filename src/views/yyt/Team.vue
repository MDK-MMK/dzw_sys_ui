<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card shadow="always">
        <el-row :gutter="10">
          <el-col
            :xs="8"
            :sm="6"
            :md="4"
            :lg="4"
            :xl="1"
            style="margin-bottom: 2%"
          >
            <el-button
              type="primary"
              icon="el-icon-circle-plus-outline"
              circle
              @click="dialogVisibleTeamI = true"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-edit"
              circle
              @click="updateT()"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="delT()"
            ></el-button>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="1" :xl="1">
            <el-divider direction="vertical"></el-divider>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="19" :xl="11">
            <el-input
              placeholder="请输入姓名"
              style="width: 15%"
              v-model="artisan.aname"
              clearable
            >
            </el-input>
            <el-input
              placeholder="请输入电话号码"
              style="width: 16%"
              v-model="artisan.aphone"
              clearable
            >
            </el-input>
            <el-select
              v-model="artisan.sid"
              placeholder="请选择星级"
              style="width: 15%"
            >
              <el-option label="请选择星级" value=""> </el-option>
              <el-option
                v-for="(item, i) in Starsoptions"
                :key="i"
                :label="item.starts"
                :value="item.sid"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="artisan.zid"
              placeholder="请选择职位"
              style="width: 15%"
            >
              <el-option label="请选择职位" value=""> </el-option>
              <el-option
                v-for="(item, i) in Zhiweioptions"
                :key="i"
                :label="item.zname"
                :value="item.zid"
              >
              </el-option>
            </el-select>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="selectArtisanAll(size, currentPage)"
              >搜索</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="dialogVisibleArtisan = true"
              >添加技工</el-button
            >
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="1">
            <el-tag
              @close="close()"
              v-if="teama.tname != ''"
              closable
              :disable-transitions="transitions"
              >当前处于：{{ teama.tname }}</el-tag
            >
            <el-table
              :data="team"
              style="width: 100%"
              height="500"
              @row-click="rowClick"
            >
              <el-table-column label="班组" prop="tname"> </el-table-column>
            </el-table>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="1" :xl="1">
            <el-divider direction="vertical"></el-divider>
          </el-col>
          <el-col class="teablea" :xs="4" :sm="6" :md="8" :lg="19" :xl="11">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column width="106" prop="aphone" label="手机号码">
              </el-table-column>
              <el-table-column prop="sid" label="星级">
                <template slot-scope="scope">
                  <div v-for="(temp, i) in Starsoptions" :key="i">
                    <p v-if="temp.sid == scope.row.sid">{{ temp.starts }}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="zid" label="职位">
                <template slot-scope="scope">
                  <div v-for="(temp, i) in Zhiweioptions" :key="i">
                    <p v-if="temp.zid == scope.row.zid">{{ temp.zname }}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="tid" label="班组">
                <template slot-scope="scope">
                  <div v-for="(temp, i) in team" :key="i">
                    <p v-if="temp.tid == scope.row.tid">{{ temp.tname }}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="aname" label="姓名"> </el-table-column>
              <el-table-column prop="asex" label="性别">
                <template slot-scope="scope">
                  <p v-if="scope.row.asex == 0">男</p>
                  <p v-else>女</p>
                </template>
              </el-table-column>
              <el-table-column prop="address" label="地址"> </el-table-column>
              <el-table-column prop="acaid" label="身份证"> </el-table-column>
              <el-table-column prop="acraft" label="维修工种">
              </el-table-column>
              <el-table-column width="100" prop="arzday" label="入职时间">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="120">
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
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <!-- 修改 -->
    <el-dialog title="班组" :visible.sync="dialogVisibleTeam" width="30%">
      <el-form
        :rules="rulesTeam"
        ref="teama"
        class="demo-ruleForm"
        :model="teama"
        label-width="25%"
      >
        <el-form-item label="班组名称：" prop="tname">
          <el-input v-model="teama.tname" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmitUpdate('teama')"
            v-loading.fullscreen.lock="fullscreenLoading"
            >提交</el-button
          >
          <el-button @click="dialogVisibleTeam = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--新增  -->
    <el-dialog title="班组" :visible.sync="dialogVisibleTeamI" width="30%">
      <el-form
        :model="teamaa"
        label-width="25%"
        :rules="rulesTeamI"
        ref="teamaa"
        class="demo-ruleForm"
      >
        <el-form-item label="班组名称：" prop="tname">
          <el-input v-model="teamaa.tname" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmitInsert('teamaa')"
            v-loading.fullscreen.lock="fullscreenLoading"
            >提交</el-button
          >
          <el-button @click="dialogVisibleTeamI = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 技工form -->
    <el-dialog
      title="技工"
      :visible.sync="dialogVisibleArtisan"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :inline="true"
        :model="Artisan"
        :rules="rules"
        ref="Artisan"
        label-width="100px"
        class="demo-form-inline"
      >
        <el-form-item label="手机号码" prop="aphone">
          <el-input :disabled="dphone" v-model="Artisan.aphone"></el-input>
        </el-form-item>
        <el-form-item label="技工姓名" prop="aname">
          <el-input v-model="Artisan.aname"></el-input>
        </el-form-item>
        <el-form-item label="星级" prop="sid">
          <el-select v-model="Artisan.sid" placeholder="请选择">
            <el-option
              v-for="(item, i) in Starsoptions"
              :key="i"
              :label="item.starts"
              :value="item.sid"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="地址" prop="address">
          <el-input v-model="Artisan.address"></el-input>
        </el-form-item>

        <el-form-item label="班组" prop="tid" style="margin-left: -14%">
          <el-select v-model="Artisan.tid" @change="chaxunzz(Artisan.tid)">
            <el-option
              v-for="(item, i) in team"
              :key="i"
              :label="item.tname"
              :value="item.tid"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="性别" prop="asex">
          <el-radio v-model="Artisan.asex" label="0">男</el-radio>
          <el-radio v-model="Artisan.asex" label="1">女</el-radio>
        </el-form-item>

        <el-form-item label="职位" prop="zid">
          <el-select v-model="Artisan.zid">
            <el-option label="技工组长" value="5" :disabled="zz"> </el-option>
            <el-option label="普通技工" value="6"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="身份证" prop="acaid">
          <el-input v-model="Artisan.acaid"></el-input>
        </el-form-item>

        <el-form-item label="维修工种" prop="acraft" style="padding-left: -16%">
          <el-input v-model="Artisan.acraft"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 16%">
          <el-button
            type="primary"
            @click="submitForm('Artisan')"
            v-loading.fullscreen.lock="fullscreenLoading"
            >立即创建</el-button
          >
          <el-button @click="resetForm('Artisan')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>
<script>
export default {
  data() {
    //维修工种
    var validateAcraft = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入维修工种！"));
      } else {
        callback();
      }
    };
    //技工身份证
    var validateAcaid = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入技工身份证！"));
      } else {
        callback();
      }
    };
    //技工地址
    var validateAddress = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入技工地址！"));
      } else {
        callback();
      }
    };
    //技工姓名
    var validateAname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入技工姓名！"));
      } else {
        callback();
      }
    };
    //技工手机号码
    var validateAphone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码！"));
      } else {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(value)) {
          callback(new Error("请输入正确的手机号码！"));
        } else {
          if(this.Artisan.arzday!=''){
            if(this.aaphone===value){
              callback();
            }else{
              const axios = require("axios");
          let that = this;
          axios
            .get("http://localhost:8080/dzw_sys/api/Artisans/ByPhone/" + value)
            .then(function (res) {
              //console.log(res.data);
              if (res.data === "") {
                callback();
              } else {
                callback(new Error("此手机号码已有，请重新输入！"));
              }
            });
            }
          }else{
            const axios = require("axios");
          let that = this;
          axios
            .get("http://localhost:8080/dzw_sys/api/Artisans/ByPhone/" + value)
            .then(function (res) {
              //console.log(res.data);
              if (res.data === "") {
                callback();
              } else {
                callback(new Error("此手机号码已有，请重新输入！"));
              }
            });
          }
          
        }
      }
    };
    //新增班组
    var validateTnaemI = (rule, value, callback) => {
      //console.log(value);
      if (value === "") {
        callback(new Error("请输入班组名称！"));
      } else {
        const axios = require("axios");
        let that = this;
        axios
          .get("http://localhost:8080/dzw_sys/api/Teams/ByName/" + value)
          .then(function (res) {
            //console.log(res.data);
            if (res.data === "") {
              callback();
            } else {
              callback(new Error("此班组名称已被占用！"));
            }
          });
      }
    };
    //修改班组
    var validateTnaem = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入班组名称！"));
      } else {
        if (this.xiugName === value) {
          callback();
        } else {
          const axios = require("axios");
          let that = this;
          axios
            .get("http://localhost:8080/dzw_sys/api/Teams/ByName/" + value)
            .then(function (res) {
              //console.log(res.data);
              if (res.data === "") {
                callback();
              } else {
                callback(new Error("此班组名称已被占用！"));
              }
            });
        }
      }
    };
    return {
      team: [],
      tableData: [],
      artisan: { sid: "", zid: "", aphone: "", aname: "", tid: 0 },
      Stars: { starts: "" }, //条件查询
      Starsoptions: [], //星级
      teama: { tname: "", tid: 0 }, //新增
      teamaa: { tname: "", tid: 0 }, //修改
      dialogVisibleTeam: false,
      dialogVisibleTeamI: false,
      transitions: false,
      fullscreenLoading: false,
      Zhiweioptions: [], //职位
      zhiwei: { zid: 0, zname: "" },
      rulesTeam: {
        tname: [{ validator: validateTnaem, trigger: "blur" }],
      },
      rulesTeamI: {
        tname: [{ validator: validateTnaemI, trigger: "blur" }],
      },
      xiugName: "",
      currentPage: 1, //当前页数
      size: 4, //每页大小
      total: 0, //总条数
      dialogVisibleArtisan: false, //新增技工
      Artisan: {
        aphone: "",
        sid: 1,
        zid: "6",
        tid: 1,
        aname: "",
        asex: "0",
        address: "",
        acaid: "",
        acraft: "",
        arzday: "",
      }, //技工
      rules: {
        aphone: [{ validator: validateAphone, trigger: "blur" }],
        aname: [{ validator: validateAname, trigger: "blur" }],
        address: [{ validator: validateAddress, trigger: "blur" }],
        acaid: [{ validator: validateAcaid, trigger: "blur" }],
        acraft: [{ validator: validateAcraft, trigger: "blur" }],
      },
      zz: true,
      aaphone:'',
      dphone:false,
    };
  },
  created() {
    this.selectTeamAll();
    this.selectArtisanAll(this.size, this.currentPage);
    this.selectStarsAll();
    this.selectZhiWeiAll();
  },
  methods: {
    //修改技工点击
    updateA(row) {
      this.dphone=true;
      this.Artisan.aphone = row.aphone;
      this.aaphone=row.aphone;
      this.Artisan.sid = row.sid;
      this.Artisan.zid = row.zid;
      this.Artisan.tid = row.tid;
      this.Artisan.aname = row.aname;
      this.Artisan.asex = row.asex+'';
      this.Artisan.address = row.address;
      this.Artisan.acaid = row.acaid;
      this.Artisan.acraft = row.acraft;
      this.Artisan.arzday = row.arzday;
      this.dialogVisibleArtisan=true;

    },
    //技工删除
    delA(row) {
      //console.log(row);
      const axios = require("axios");
      let that = this;
      axios
        .delete(
          "http://localhost:8080/dzw_sys/api/Artisans/delete/" + row.aphone
        )
        .then(function (res) {
          console.log(res.data);
          if (res.data == 1) {
            that.$message({
              message: "移除成功",
              type: "success",
            });
            that.resetForm("Artisan");
            that.selectArtisanAll(that.size, 1);
          } else if(res.data==0) {
            that.$message.error("移除失败!");
          }else{
            that.$message.error("当前技工正在维修!");
          }
        });
    },
    //查询当前班组是否有组长
    chaxunzz(tid) {
      if (tid != 0) {
        const axios = require("axios");
        let that = this;
        axios
          .get("http://localhost:8080/dzw_sys/api/Artisans/ByZid/" + tid)
          .then(function (res) {
            console.log(res.data);
            if (res.data != 0) {
              that.zz = true;
              that.Artisan.zid = "6";
            } else {
              that.zz = false;
            }
          });
      }
    },
    //提交技工
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.Artisan.arzday!=''){
            //修改
            const axios = require("axios");
          let that = this;
          this.fullscreenLoading = true;
          axios
            .put(
              "http://localhost:8080/dzw_sys/api/Artisans/update",
              this.Artisan
            )
            .then(function (res) {
              //console.log(res.data);
              if (res.data == 1) {
                that.$message({
                  message: "编辑成功",
                  type: "success",
                });
                that.dialogVisibleArtisan = false;
                that.resetForm("Artisan");
                that.selectArtisanAll(that.size, 1);
              } else {
                that.$message.error("编辑失败!");
              }
              that.fullscreenLoading = false;
            });


          }else{

            //新增
            const axios = require("axios");
          let that = this;
          this.fullscreenLoading = true;
          axios
            .post(
              "http://localhost:8080/dzw_sys/api/Artisans/insert",
              this.Artisan
            )
            .then(function (res) {
              //console.log(res.data);
              if (res.data == 1) {
                that.$message({
                  message: "添加成功",
                  type: "success",
                });
                that.dialogVisibleArtisan = false;
                that.resetForm("Artisan");
                that.selectArtisanAll(that.size, 1);
              } else {
                that.$message.error("添加失败!");
              }
              that.fullscreenLoading = false;
            });

          }
        } else {
          return false;
        }
      });
    },
    //重置技工
    resetForm(formName) {
      this.$refs[formName].resetFields();
        this.Artisan.aphone= "";
        this.Artisan.sid= 1;
        this.Artisan.zid= "6";
        this.Artisan.tid= 1;
        this.Artisan.aname= "";
        this.Artisan.asex= "0";
        this.Artisan.address= "";
        this.Artisan.acaid= "";
        this.Artisan.acraft= "";
        this.Artisan.arzday= "";
    },
    //关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.resetForm('Artisan');
          done();
        })
        .catch((_) => {});
    },
    //分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val;
      this.selectArtisanAll(this.size, this.currentPage);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.selectArtisanAll(this.size, this.currentPage);
    },
    //判断是否可修改
    updateT() {
      if (this.teama.tid == 0) {
        this.$message({
          message: "请先选中需要编辑的班组!",
          type: "warning",
        });
      } else {
        this.xiugName = this.teama.tname;
        this.dialogVisibleTeam = true;
      }
    },
    //删除班组
    delT() {
       if (this.teama.tid == 0) {
        this.$message({
          message: "请先选中需要移除的班组!",
          type: "warning",
        });
        return;
      }
      if(this.tableData.length!=0){
        this.$message({
          message: '当前班组，已有技工不可移除',
          type: 'warning'
        });
        return;
      }
      const axios = require("axios");
      let that = this;
      //this.fullscreenLoading=true;
      axios
        .delete(
          "http://localhost:8080/dzw_sys/api/Teams/delete/" + this.teama.tid
        )
        .then(function (res) {
          //console.log(res.data);
          if (res.data == 1) {
            that.$message({
              message: "移除成功",
              type: "success",
            });
            that.teama.tname = "";
            that.teama.tid = "";
            that.selectTeamAll();
            that.artisan.tid = 0;
            that.selectArtisanAll(that.size, 1);
          } else {
            that.$message.error("移除失败!");
          }
          // that.fullscreenLoading=false;
        });
    },
    //修改班组
    onSubmitUpdate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const axios = require("axios");
          let that = this;
          this.fullscreenLoading = true;
          axios
            .put("http://localhost:8080/dzw_sys/api/Teams/update", this.teama)
            .then(function (res) {
              //console.log(res.data);
              if (res.data == 1) {
                that.$message({
                  message: "修改成功",
                  type: "success",
                });
                that.dialogVisibleTeam = false;
                that.teamaa.tname = "";
                that.selectTeamAll();
              } else {
                that.$message.error("修改失败!");
              }
              that.fullscreenLoading = false;
            });
        } else {
          return false;
        }
      });
    },
    //新增班组
    onSubmitInsert(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const axios = require("axios");
          let that = this;
          this.fullscreenLoading = true;
          axios
            .post("http://localhost:8080/dzw_sys/api/Teams/insert", this.teamaa)
            .then(function (res) {
              //console.log(res.data);
              if (res.data == 1) {
                that.$message({
                  message: "添加成功",
                  type: "success",
                });
                that.dialogVisibleTeamI = false;
                that.teamaa.tname = "";
                that.selectTeamAll();
              } else {
                that.$message.error("添加失败!");
              }
              that.fullscreenLoading = false;
            });
        } else {
          return false;
        }
      });
    },
    //退出
    close() {
      this.teama.tid = 0;
      this.teama.tname = "";
      this.artisan.tid = 0;
      this.selectArtisanAll(this.size, this.currentPage);
      //console.log(this.teama);
    },
    //点击班组
    rowClick(row) {
      //console.log(row);
      this.teama.tid = row.tid;
      this.teama.tname = row.tname;
      this.artisan.tid = row.tid;
      //console.log(this.teama);
      this.transitions = true;
      this.selectArtisanAll(this.size, this.currentPage);
    },
    //查询星级
    selectStarsAll() {
      const axios = require("axios");
      let that = this;
      axios
        .post("http://localhost:8080/dzw_sys/api/Starss/all/100/1", this.Stars)
        .then(function (res) {
          // console.log(res.data);
          that.Starsoptions = res.data.list;
        });
    },
    //查询班组
    selectTeamAll() {
      const axios = require("axios");
      let that = this;
      axios.get("http://localhost:8080/dzw_sys/api/Teams").then(function (res) {
        //console.log(res.data);
        that.team = res.data;
      });
    },
    //查询技工
    selectArtisanAll(size, currentPage) {
      const axios = require("axios");
      let that = this;
      axios
        .post(
          "http://localhost:8080/dzw_sys/api/Artisans/ByTid/" +
            size +
            "/" +
            currentPage,
          this.artisan
        )
        .then(function (res) {
          //console.log(res.data);
          that.tableData = res.data.list;
          that.total = res.data.total;
        });
    },
    //查询职位
    selectZhiWeiAll() {
      const axios = require("axios");
      let that = this;
      axios
        .post("http://localhost:8080/dzw_sys/api/Zhiwei/all/100/1", this.zhiwei)
        .then(function (res) {
          //console.log(res.data);
          that.Zhiweioptions = res.data.list;
        });
    },
  },
};
</script>
<style scoped>
.lilist {
  margin: 5px 0px 5px 0px;
}
</style>