<template>
<el-row :gutter="12">
    <el-col :span="24">
    <el-card shadow="always">
        
        <h3>汽车维修服务中心维修清单</h3>
        <br>
        <h5  style="text-align:left; margin-left:200px;">年月日</h5>
        <table border="1px" id="lll">
            <tr>
                <td style="text-align:left;">客户名称：{{hysy.cliname}}</td>
                 <td style="text-align:left;">车牌：{{wp.cno}}</td>
            </tr>
            <tr>
                <td style="text-align:left; "  colspan="2">电话：{{hysy.cliphone}}</td>
            </tr>
           
            <tr>
                <td colspan="2">
                   
                    <el-table
                        :data="sp"
                        style="width: 100%">
                        <el-table-column
                        label="商品名称"
                        prop="xqname">
                        </el-table-column>
                        
                            <el-table-column
                        label="商品单价"
                        prop="spid">
                        </el-table-column>

                        <el-table-column
                        label="购买数量"
                        prop="xqsl">
                        </el-table-column>
                        
                        <el-table-column
                        label="商品总价"
                        prop="xmoney">
                        </el-table-column>
                    </el-table>
                 </td>
            </tr>
             <tr>
                <td style="text-align:left;">应收金额：{{ssnum}}</td>
                 <td style="text-align:left;"  v-if="hysy.mid ==0 " >折后金额:{{ ssnum * hysy.baifb }}</td>
                   <td style="text-align:left;"  v-if="hysy.mid !=0">折后金额:{{ ssnum}}</td>
            </tr>
            <tr>
                <td style="text-align:left;">总里程数：{{wp.lc}}</td>
                 <td style="text-align:left;"  v-if="wp.lc > 3">外派总价:{{
              (wp.lc - 3) * wp.ccj + wp.qbj
            }}</td>
                  <td style="text-align:left;"  v-if="wp.lc <= 3">外派总价:{{ wp.qbj }}</td>
            </tr>
             <tr>
                <td colspan="2" style="text-align:left;" v-if="wp.lc <= 3 && hysy.mid ==0">维修总金额：{{ wp.qbj + ssnum * hysy.baifb }}</td>
                 <td colspan="2" style="text-align:left;" v-if="wp.lc <= 3 && hysy.mid ==1">维修总金额：{{ wp.qbj + ssnum}}</td>
                <td colspan="2" style="text-align:left;"  v-if="wp.lc > 3 && hysy.mid ==0" >维修总金额：{{(wp.lc - 3) * wp.ccj + wp.qbj + ssnum * hysy.baifb}}</td>
                <td colspan="2" style="text-align:left;"  v-if="wp.lc > 3 && hysy.mid ==1">维修总金额：{{(wp.lc - 3) * wp.ccj + wp.qbj + ssnum}}</td>
            </tr>
             <tr>
                <td colspan="2" style="text-align:left;height:50px;">客户签名：</td>
            </tr>

        </table>
        <br>
        <el-button @click="qx()">取 消</el-button>
        <el-button @click="qd()">确 定</el-button>
    </el-card>
  </el-col>
</el-row>
 

</template>
<style>
    #lll{
        margin: 0px auto;
        width: 800px;
    }

    #lll-tr-td{
        text-align: left;
        width: 320px;
    }
</style>
<script>
export default {
    data(){
    	return{
        cno:0,
        inid:0,
            sp:[], 
            hysy:{},
            wp:[],
            ssnum:'',
      };
    },
    created(){  
      
        this.dj();
    },
    methods:{
        qx(){
            const axios = require("axios");
            let that = this;
            that.$router.push('/ass');
        },
       dj(){
            this.cno= sessionStorage.getItem('cno');
       this.inid= sessionStorage.getItem('inid');

            //axios
      const axios = require("axios");
      let that = this;
      //alert(inid);
      axios
        .get(
          "http://localhost:8080/dzw_sys/api/ljy/empl/selectByPrimaryKeyByinid/" +that.inid).then(function (reses) {
          //console.log(reses.data);
          that.sp = reses.data;
                //console.log(this.ssnum);
            var sssnum = 0;
            that.sp.forEach((temp) => {
                sssnum = parseInt(sssnum) + parseInt(temp.xmoney);
            });
            that.ssnum = sssnum;
                // alert(that.sp)
        });
      //根据维修编号查询外派信息
      axios
        .get(
          "http://localhost:8080/dzw_sys/api/ljy/empl/selectLjyWorkcar/" + that.inid
        )
        .then(function (resres) {
          //console.log(resres.data);
          that.wp = resres.data;
          // alert(that.wp)
        });
      axios
        .get("http://localhost:8080/dzw_sys/api/ljy/empl/selectClient/" + that.cno)
        .then(function (res) {
          
          that.hysy = res.data;
          //console.log(that.hysy);
            
        });
       }
	  }	

}
</script>
