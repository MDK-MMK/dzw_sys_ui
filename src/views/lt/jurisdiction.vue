<template>
    <el-row :gutter="12">
        <el-col :span="24">
            <el-card shadow="always">
                <el-menu class="el-menu-demo" mode="horizontal" text-color="#303133" >
                    <el-menu-item style="color:#303133;font-size: 18px;">权限附加</el-menu-item>
                    <el-menu-item style="float:right"><el-button type="warning" plain @click="selqx">查询</el-button></el-menu-item>
                    <el-menu-item style="float:right">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.zid"
                            :label="item.zname"
                            :value="item.zid">
                            </el-option>
                        </el-select>
                    </el-menu-item>
                </el-menu>
                <br>
                <el-col :span="12"  style="margin-top: 20px" v-for="tblda in cities" :label="tblda" :key="tblda.fid">
                    <el-card shadow="hover" >
                        <el-checkbox-group 
                        v-model="zweiqx">
                            {{tblda.fname}}:  <el-checkbox v-for="city in tblda.tblfunction" :label="city.fid" :key="city.fid">{{city.fname}}</el-checkbox>
                    </el-checkbox-group>
                          
                    </el-card>
                </el-col>
                <el-col :span="10"  style="margin-top: 20px" >
                    <el-button type="primary" style="margin:30px" @click="tijiao">确认提交</el-button>
                    <el-button @click="quxiao">取消恢复</el-button>
                </el-col>
                <br><br><br><br>
                <br><br><br><br>
                <br><br><br><br>
                <br><br><br><br>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
const axios = require("axios");
export default {
    data(){
        return{
            options:[],
            value:'',
            //节点
            cities: [],
            //职位权限
            zweiqx:[],
        };
    },
    //初始加载
    created() {
        //查询所有职位
        var that=this;
        axios.post(`http://127.0.0.1:8080/dzw_sys/api/lt/login/zwall`).then(function(res) {
            console.info(res);
            that.options=res.data;
        });
       //查询全部权限信息
       axios.post(`http://127.0.0.1:8080/dzw_sys/api/lt/login/quanx/0`).then(function(res) {
            console.info(res);
            that.cities=res.data;
        });
    },
    methods:{
        //职位赋值权限
        tijiao(){
            var that=this;
            axios.post(`http://127.0.0.1:8080/dzw_sys/api/lt/login/updZhiwei/${that.value}`,this.zweiqx).then(function(res) {
                 that.$message({
                    message: '权限附加成功！',
                    type: 'success'
                });
               that.selqx();
          });
        },

        quxiao(){
            var that=this;
            that.zweiqx=[];
            that.selqx();
        },
        
        //查询现有职位的权限
        selqx(){
            var that=this;
            this.zweiqx=[];
            axios.post(`http://127.0.0.1:8080/dzw_sys/api/lt/login/zhiw/${that.value}`).then(function(res) {
               // console.info(res.data);
               if(res.data==''){
                   that.zweiqx=[1,2,3,5,6];
                   return;
               }
                res.data.forEach(temp => {
                    that.zweiqx.push(temp.fid);
                });
                console.log(that.zweiqx);
          });
        },
    },
}
</script>