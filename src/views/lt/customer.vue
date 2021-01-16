<template>
    <el-row :gutter="12">
        <el-col :span="24">
            <el-card shadow="always">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" text-color="#303133" >
                    <el-menu-item style="color:#303133;font-size: 18px;">客户档案</el-menu-item>
                    <el-menu-item style="float:right"><el-button type="success" plain  @click="dialogVisible = true">新增用户</el-button></el-menu-item>
                    <el-menu-item style="float:right"><el-button type="warning" plain @click="selcliphone">查询</el-button></el-menu-item>
                    <el-menu-item style="float:right"><el-input v-model="cliphone" placeholder="请输入手机号"></el-input></el-menu-item>
                </el-menu>
                <br>
                <br>
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="cliphone" label="手机号" > </el-table-column>
                    <el-table-column prop="cliname" label="客户姓名"></el-table-column>
                    <el-table-column prop="clidate" label="客户生日"> </el-table-column>
                    <el-table-column prop="khbz" label="客户备注"> </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button icon="el-icon-search" @click="selcar(scope.row.cliphone)" circle></el-button>
                            <el-button type="primary" icon="el-icon-edit" @click="updphone(scope.row)" circle></el-button>
                            <el-button type="danger" icon="el-icon-delete" @click="delphone(scope.row.cliphone)" circle></el-button>
                            <el-button type="success" icon="el-icon-plus" @click="kehucar(scope.row.cliphone)" circle></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <br>
                <div class="block">
                    <div class=pager>
                        <el-pagination @size-change="handleSizeChange"
                            @current-change="handleCurrentChange" :current-page="fenye.page"
                            :page-sizes="[1, 2, 3, 5,10]" :page-size="fenye.size"
                            layout="total, sizes, prev, pager, next, jumper" :total="total">
                        </el-pagination>
                    </div>
                </div>
                <br>
                <br>
                <el-table :data="tableData1" stripe height="186" style="width: 100%">
                    <el-table-column prop="cno" label="车牌号" > </el-table-column>
                    <el-table-column prop="dphone" label="驾驶员手机号" > </el-table-column>
                    <el-table-column prop="driver" label="驾驶员姓名"></el-table-column>
                    <el-table-column prop="ddate" label="驾驶员生日"> </el-table-column>
                    <el-table-column prop="ctype.ctname" label="车辆品牌"> </el-table-column>
                    <el-table-column prop="jctdate" label="车辆购买日期"> </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" icon="el-icon-delete" @click="delcar(scope.row.cno,scope.row.cliphone)" circle></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 新增用户信息 -->
                <el-dialog title="新增客户信息" :visible.sync="dialogVisible">
                    客户手机号：<el-input placeholder="请输入内容" v-model="client.cliphone" clearable style="width:200px"></el-input>
                    <span style="color:red;padding-left:15px;">*</span>
                    &nbsp;&nbsp;&nbsp;
                    客户姓名：<el-input placeholder="请输入内容" v-model="client.cliname" clearable style="width:200px"></el-input>
                    <span style="color:red;padding-left:15px;">*</span>
                    <br><br>&nbsp;&nbsp;
                    <div class="block" style="display:inline"><span class="demonstration">客户生日：</span>
                        <el-date-picker v-model="client.clidate" type="date" placeholder="选择日期"> </el-date-picker>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    接待人员：<template style="width:200px"><el-select v-model="client.ephone" placeholder="请选择">
                                <el-option v-for="item in ephones" :key="item.ephone" :label="item.ename" :value="item.ephone"></el-option>
                            </el-select></template>
                            <span style="color:red;padding-left:15px;">*</span>
                    <br><br>
                    客户备注：<el-input placeholder="请输入内容" v-model="client.khbz" clearable style="width:200px"></el-input>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    车牌号：<el-input placeholder="请输入内容" v-model="clicar.cno" clearable style="width:200px"></el-input>
                    <span style="color:red;padding-left:15px;">*</span>
                    <br><br>
                    驾驶员手机号：<el-input placeholder="请输入内容" v-model="clicar.dphone" clearable style="width:200px"></el-input>
                    &nbsp;&nbsp;&nbsp;
                    驾驶员姓名：<el-input placeholder="请输入内容" v-model="clicar.driver" clearable style="width:200px"></el-input>
                    <br><br>
                    <div class="block" style="display:inline"><span class="demonstration">驾驶员生日：</span>
                        <el-date-picker v-model="clicar.ddate" type="date" placeholder="选择日期"> </el-date-picker>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div class="block" style="display:inline"><span class="demonstration">车辆出厂日期：</span>
                        <el-date-picker v-model="clicar.jctdate" type="date" placeholder="选择日期"> </el-date-picker>
                    </div>
                    <br><br>
                    车辆品牌：<template style="width:200px"><el-select v-model="clicar.ctid" placeholder="请选择">
                                <el-option v-for="item in ctids" :key="item.ctid" :label="item.ctname" :value="item.ctid"></el-option>
                            </el-select></template>
                            <span style="color:red;padding-left:15px;">*</span>
                    &nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    客户地址：<el-input placeholder="请输入内容" v-model="clicar.cliaddress" clearable style="width:200px"></el-input>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="insclientandcar">确 定</el-button>
                    </span>
                </el-dialog>

                <!-- 修改用户信息 -->
                <el-dialog title="修改客户信息" :visible.sync="upclent">
                    客户手机号：<el-input disabled v-model="client.cliphone" clearable style="width:200px"></el-input>
                    <span style="color:red;padding-left:15px;">*</span>
                    &nbsp;&nbsp;&nbsp;
                    客户姓名：<el-input placeholder="请输入内容" v-model="client.cliname" clearable style="width:200px"></el-input>
                    <span style="color:red;padding-left:15px;">*</span>
                    <br><br>&nbsp;&nbsp;
                    客户生日：<el-input placeholder="请输入内容" v-model="client.clidate" clearable style="width:200px"></el-input>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    接待人员：<template style="width:200px"><el-select v-model="client.ephone" placeholder="请选择">
                                <el-option v-for="item in ephones" :key="item.ephone" :label="item.ename" :value="item.ephone"></el-option>
                            </el-select></template>
                            <span style="color:red;padding-left:15px;">*</span>
                    <br><br>
                    客户地址：<el-input placeholder="请输入内容" v-model="clicar.cliaddress" clearable style="width:200px"></el-input>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    客户备注：<el-input placeholder="请输入内容" v-model="client.khbz" clearable style="width:200px"></el-input>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="upclent = false">取 消</el-button>
                        <el-button type="primary" @click="updclent">确 定</el-button>
                    </span>
                </el-dialog>

                <!-- 新增车辆信息 -->
                 <el-dialog title="添加客户车辆信息" :visible.sync="inscar">
                    车牌号：<el-input placeholder="请输入内容" v-model="clicar.cno" clearable style="width:200px"></el-input>
                    <span style="color:red;padding-left:15px;">*</span>
                    &nbsp;&nbsp;&nbsp;
                    车辆品牌：<template style="width:200px"><el-select v-model="clicar.ctid" placeholder="请选择">
                                <el-option v-for="item in ctids" :key="item.ctid" :label="item.ctname" :value="item.ctid"></el-option>
                            </el-select></template>
                            <span style="color:red;padding-left:15px;">*</span>
                    <br><br>
                    驾驶员手机号：<el-input placeholder="请输入内容" v-model="clicar.dphone" clearable style="width:200px"></el-input>
                    &nbsp;&nbsp;&nbsp;
                    驾驶员姓名：<el-input placeholder="请输入内容" v-model="clicar.driver" clearable style="width:200px"></el-input>
                    <br><br>
                    <div class="block" style="display:inline"><span class="demonstration">驾驶员生日：</span>
                        <el-date-picker v-model="clicar.ddate" type="date" placeholder="选择日期"> </el-date-picker>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div class="block" style="display:inline"><span class="demonstration">车辆出厂日期：</span>
                        <el-date-picker v-model="clicar.jctdate" type="date" placeholder="选择日期"> </el-date-picker>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="inscar = false">取 消</el-button>
                        <el-button type="primary" @click="inscarxinxi">确 定</el-button>
                    </span>
                </el-dialog>
            </el-card>
        </el-col>
    </el-row>

</template>
<script>
const axios = require("axios");
export default {
    data(){
        return{
          cliphone:'',
          fenye:{size:5,page:1},
          tableData: [],
          tableData1: [],
          dialogVisible:false,
          upclent:false,
          inscar:false,
          ctids:[],
          ephones:[],
          client:{
              cliphone:'',
              cliname:'',
              clidate:'',
              cliaddress:'',
              ephone:'',
              mid:'1',
              cliaddress:'',
          },
          clicar:{
              cno:'',
              dphone:'',
              cliphone:'',
              driver:'',
              ddate:'',
              ctid:'',
              jctdate:'',
          },
          formLabelWidth: '120px',
        };
    },
    //初始加载
    created() {
        let that = this;
        that.pageClient(1,5);
        //查询车辆品牌
        axios.get(`http://127.0.0.1:8080/dzw_sys/api/lt/cli/cartype`).then(function(res) {
            console.info(res);
            that.ctids=res.data;
        });
        //查询接待人员
        axios.get(`http://127.0.0.1:8080/dzw_sys/api/lt/cli/jiedai`).then(function(res) {
            console.info(res);
            that.ephones=res.data;
        });
	},
    methods:{
        //查询用户
        pageClient(p,s,val){
            var that = this;
            axios.post(`http://127.0.0.1:8080/dzw_sys/api/lt/cli/${p}/${s}/${val}`).then(function(res) {
                console.info(res);
                that.tableData=res.data.list;
                that.total=res.data.total;
            });
        },
        handleSizeChange(val) {
            this.fenye.size=val;
            var that = this;
            that.pageClient(this.fenye.page,val);
        },
        handleCurrentChange(val) {
            this.fenye.page=val;
            var that = this;
            that.pageClient(val,this.fenye.size);
        },
        //删除用户
        delphone(val){
            var that = this;
            axios.post(`http://127.0.0.1:8080/dzw_sys/api/lt/cli/delPhone/${val}`).then(function(res) {
                console.info(res);
                if(res.data>0){
                    that.$message({
                        message: '用户删除成功！',
                        type: 'success'
                    });
                    that.pageClient(1,5);
                }else{
                    that.$message.error('用户删除失败！');
                }
            });
        },
        //修改用户信息
        updphone(row){
            console.log(row);
            this.client=row;
            this.upclent=true;
        },
        updclent(){
            var that = this;
            if(this.client.ephone==''||that.client.cliname==''||that.client.cliphone==''){
                this.$message({
                    message: '客户手机号、客户姓名、接待人员不能为空！',
                    type: 'warning'
                });
                return false;
            };
            axios.post(`http://127.0.0.1:8080/dzw_sys/api/lt/cli/zcandxg`,this.client).then(function(res) {
                console.info(res);
                if(res.data>0){
                    that.$message({
                        message: '客户信息修改成功！',
                        type: 'success'
                    });
                    that.pageClient(1,5);
                    that.qingkong();
                    that.upclent=false;
                }else{
                    that.$message.error('客户信息修改失败！');
                }
            });
        },
        //查询用户车辆
        selcar(val){
            var that = this;
            axios.post(`http://127.0.0.1:8080/dzw_sys/api/lt/clicar/${val}`).then(function(res) {
                console.info(res);
                that.tableData1=res.data;
            });
        },
        //新增车辆
        kehucar(val){
            this.clicar.cliphone=val;
            this.inscar=true;
        },
        inscarxinxi(){
            var that=this;
            if(this.clicar.cno==''||this.clicar.ctid==''){
                this.$message({
                    message: '车牌号、车辆品牌不能为空！',
                    type: 'warning'
                });
                return false;
            };
            if(this.clicar.cliphone==''){
                this.clicar.cliphone=this.client.cliphone;
            }
            axios.post(`http://127.0.0.1:8080/dzw_sys/api/lt/clicar/inscar`,this.clicar).then(function(res) {
                console.info(res);
                if(res.data>0){
                   // alert(that.clicar.cliphone);
                    that.selcar(that.clicar.cliphone);
                    that.qingkong();
                    that.inscar=false;
                    that.$message({
                        message: '客户信息提交成功！',
                        type: 'success'
                    });
                }else{
                    that.$message.error('客户信息添加失败！');
                };
            });
        },
        //新增用户信息和车辆
        insclientandcar(){
            var that = this;
            if(this.clicar.cno==''||this.clicar.ctid==''||this.client.ephone==''||that.client.cliname==''||that.client.cliphone==''){
                this.$message({
                    message: '客户手机号、客户姓名、接待人员、车牌号、车辆品牌不能为空！',
                    type: 'warning'
                });
                return false;
            };
            //新增用户
            axios.post(`http://127.0.0.1:8080/dzw_sys/api/lt/cli/insClient`,this.client).then(function(res) {
                if(res.data>0){
                    that.inscarxinxi();
                    that.pageClient(1,5);
                    that.qingkong();
                    that.dialogVisible = false;
                }else{
                    that.$message.error('客户信息添加失败！');
                }
            });
        },
       
        //删除用户车辆
        delcar(cno,phone){
            var that=this;
            axios.post(`http://127.0.0.1:8080/dzw_sys/api/lt/clicar/delkehucar/${cno}`).then(function(res) {
                console.info(res);
                if(res.data>0){
                    that.$message({
                        message: '客户车辆信息删除成功！',
                        type: 'success'
                    });
                    that.selcar(phone);
                }else{
                    that.$message.error('客户信息删除失败！');
                };
            });
        },
        //按手机号查询用户
        selcliphone(){
            console.log(this.cliphone);
            if(this.cliphone==''){
                this.pageClient(1,5);
            }else{
                this.pageClient(1,5,this.cliphone);
            };
            this.cliphone='';
        },
        //清空
        qingkong(){
            this.client.cliphone="";
            this.client.cliname="";
            this.client.clidate="";
            this.client.cliaddress="";
            this.client.ephone='';
            this.clicar.cno='';
            this.clicar.dphone='';
            this.clicar.driver='';
            this.clicar.ddate='';
            this.clicar.ctid='';
            this.clicar.jctdate='';
        },
    }
}
</script>