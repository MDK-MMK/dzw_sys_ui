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
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-edit"
              circle
              @click="updateT()"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
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
              v-model="artisan.sid"
              placeholder="请选择职位"
              style="width: 15%"
            >
              <el-option label="请选择职位" value=""> </el-option>
              <el-option
                v-for="(item, i) in Starsoptions"
                :key="i"
                :label="item.starts"
                :value="item.sid"
              >
              </el-option>
            </el-select>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="selectArtisanAll"
              >搜索</el-button
            >
            <el-button type="primary" icon="el-icon-circle-plus-outline"
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
              <el-table-column prop="zid" label="职位"> </el-table-column>
              <el-table-column prop="tid" label="班组">
                <template slot-scope="scope">
                  <div v-for="(temp, i) in team" :key="i">
                    <p v-if="temp.tid == scope.row.tid">{{ temp.tname }}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="aname" label="姓名"> </el-table-column>
              <el-table-column prop="asex" label="性别"> </el-table-column>
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
                    @click="updateA(scope.row)"
                  ></el-button>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="delA(scope.row)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-card>
    </el-col>

    <el-dialog title="班组" :visible.sync="dialogVisibleTeam" width="30%">
      班组名称：<el-input v-model="teama.tname"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      team: [],
      tableData: [],
      artisan: { sid: "", zid: "", aphone: "", aname: "", tid: 0 },
      Stars: { starts: "" }, //条件查询
      Starsoptions: [], //星级
      teama: { tname: "", tid: 0 },
      dialogVisibleTeam: false,
      transitions: false,
    };
  },
  created() {
    this.selectTeamAll();
    this.selectArtisanAll();
    this.selectStarsAll();
  },
  methods: {
    close() {
      this.teama.tid = 0;
      this.teama.tname = "";
      this.artisan.tid = 0;
      console.log(this.teama);
    },
    //点击班组
    rowClick(row) {
      //console.log(row);
      this.teama.tid = row.tid;
      this.teama.tname = row.tname;
      this.artisan.tid = row.tid;
      console.log(this.teama);
      this.transitions = true;
      this.selectArtisanAll();
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
    selectArtisanAll() {
      const axios = require("axios");
      let that = this;
      axios
        .post("http://localhost:8080/dzw_sys/api/Artisans/ByTid", this.artisan)
        .then(function (res) {
          //console.log(res.data);
          that.tableData = res.data;
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