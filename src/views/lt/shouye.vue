<template>
    <el-row :gutter="12">
        <el-col :span="24">
            <el-card shadow="always">
                <el-menu  class="el-menu-demo" mode="horizontal" text-color="#303133" >
                    <el-menu-item style="color:#303133;font-size: 18px;">首页</el-menu-item>
                </el-menu>
                <br>
                <br>
                <br>
                <p style="font-size: 24px;">欢迎使用汽修管理系统</p>
                <br>
                <br>
                <el-col :span="6" style="margin-left: 90px;">
                    <el-card shadow="always">
                    <i class="el-icon-s-tools"></i>
                    今日在修台次
                    </el-card>
                </el-col>
                <el-col :span="6" style="margin-left: 90px;">
                    <el-card shadow="always">
                        <i class="el-icon-phone"></i>
                    今日站内维修台次
                    </el-card>
                </el-col>
                <el-col :span="6" style="margin-left: 90px;">
                    <el-card shadow="always">
                        <i class="el-icon-phone-outline"></i>
                    今日站外维修台次
                    </el-card>
                </el-col>
                <br>
                <el-col :span="6" style="margin-left: 90px;margin-top:50px;">
                    <el-card shadow="always">
                    <i class="el-icon-info"></i>
                    今日营业额
                    </el-card>
                </el-col>
                <el-col :span="6" style="margin-left: 90px;margin-top:50px;">
                    <el-card shadow="always">
                        <i class="el-icon-circle-plus"></i>
                    结算次数
                    </el-card>
                </el-col>
                <el-col :span="6" style="margin-left: 90px;margin-top:50px;">
                    <el-card shadow="always">
                        <i class="el-icon-s-order"></i>
                    营业额报表
                    </el-card>
                </el-col>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
const axios = require("axios");
export default {
    data(){
        return{
            
        };
    },
    //初始加载
    created() {
       
    },
    methods:{
        
    },
}
</script>