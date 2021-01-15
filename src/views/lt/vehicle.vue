<template>
    <el-row :gutter="12">
        <el-col :span="24">
            <el-card shadow="always">
                <el-menu class="el-menu-demo" mode="horizontal" text-color="#303133" >
                    <el-menu-item style="color:#303133;font-size: 18px;">客户车辆信息</el-menu-item>
                    <el-menu-item style="float:right"><el-button type="warning" plain @click="selclicar">查询</el-button></el-menu-item>
                    <el-menu-item style="float:right"><el-input v-model="cno" placeholder="请输车牌号"></el-input></el-menu-item>
                </el-menu>
                <br>
                <br>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="cno" label="车牌号"></el-table-column>
                    <el-table-column prop="driver" label="驾驶员姓名"> </el-table-column>
                    <el-table-column prop="dphone" label="驾驶员手机号"> </el-table-column>
                    <el-table-column prop="ctype.ctname" label="车辆品牌"> </el-table-column>
                    <el-table-column prop="jctdate" label="车辆出厂日期"> </el-table-column>
                    <el-table-column label="操作" >
                        <template slot-scope="scope">
                            <el-button icon="el-icon-search" @click="selcarweix(scope.row.cno)" circle></el-button>
                            <el-button type="primary" icon="el-icon-edit" @click="updphone(scope.row)" circle></el-button>
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
                <br>
                <el-table :data="tableData1" style="width: 100%">
                    <el-table-column prop="car.cno" label="车牌号"></el-table-column>
                    <el-table-column prop="inid" label="维修单号"></el-table-column>
                    <el-table-column prop="jdate" label="车辆维修时间"> </el-table-column>
                </el-table>

                <!-- 修改车辆信息 -->
                 <el-dialog title="修改客户车辆信息" :visible.sync="inscar">
                    车牌号：<el-input placeholder="请输入内容" v-model="clicar.cno" clearable style="width:200px" disabled></el-input>
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
                        <el-button type="primary" @click="updatecar">确 定</el-button>
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
            cno:'',
            tableData: [],
            tableData1: [],
            fenye:{size:5,page:1},
            inscar:false,
            clicar:{
              cno:'',
              dphone:'',
              cliphone:'',
              driver:'',
              ddate:'',
              ctid:'',
              jctdate:'',
          },
        };
    },
    //初始加载
    created() {
        var that=this;
        that.pageClient(this.fenye.page,this.fenye.size);
        //查询车辆品牌
        axios.get(`http://127.0.0.1:8080/dzw_sys/api/lt/cli/cartype`).then(function(res) {
            console.info(res);
            that.ctids=res.data;
        });
    },
    methods:{
        //查询车辆维修记录
        selcarweix(val){
            console.log(val);
            var that = this;
            axios.post(`http://127.0.0.1:8080/dzw_sys/api/Wei/all/${5}/${1}`,{cno:val,jdate:null,izt:4,jdateEnd:null}).then(function(res) {
                console.info(res);
                that.tableData1=res.data.list;
            });
        },
        //查询所有车辆信息
        pageClient(p,s,val){
            var that = this;
            axios.post(`http://127.0.0.1:8080/dzw_sys/api/lt/clicar/cnocar/${p}/${s}/${val}`).then(function(res) {
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
        //按车牌号查询车辆
        selclicar(){
            console.log(this.cno);
            if(this.cno==''){
                this.pageClient(1,5);
            }else{
                this.pageClient(1,5,this.cno);
            };
            this.cno='';
        },

        //修改车辆信息
        updphone(row){
            console.log(row);
            this.clicar=row;
            this.inscar=true;
        },
        updatecar(){
            var that=this;
             axios.post(`http://127.0.0.1:8080/dzw_sys/api/lt/clicar/updateCar`,this.clicar).then(function(res) {
                console.info(res);
                if(res.data>0){
                     that.$message({
                        message: '车辆信息修改成功！',
                        type: 'success'
                    });
                    that.clicar.cno='';
                    that.clicar.dphone='';
                    that.clicar.driver='';
                    that.clicar.ddate='';
                    that.clicar.ctid='';
                    that.clicar.jctdate='';
                    that.inscar=false;
                    that.pageClient(1,5);
                }else{
                    that.$message.error('车辆信息修改失败！');
                }
             });
        },
    },
}
</script>