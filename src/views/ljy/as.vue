<template>
<el-row :gutter="12">
  <div style="margin-bottom:20px;">
    <el-input v-model="inputtj" placeholder="请输入会员名称/会员电话" style="width:300px;"></el-input>
<el-button type="primary" @click="tjcx(inputtj)">查询</el-button>
<el-button type="primary" @click="hykk()">开卡</el-button>
  </div>
  <el-col :span="24">
    <el-card shadow="always">
      <el-table
    :data="shops"
    style="width: 100%">
    <el-table-column
      label="会员编号"
      prop="cliphone">
    </el-table-column>
    
	<el-table-column
      label="会员名称"
      prop="cliname">
    </el-table-column>
	<el-table-column
      label="会员电话"
      prop="cliphone">
    </el-table-column>
    <el-table-column
      label="开卡时间"
      prop="rhdate">
    </el-table-column>
    <el-table-column
      label="账户余额"
      prop="yue">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
           @click="gjcz(scope.row.cliphone)">充值</el-button>
        <el-button
          size="mini"
          type="danger"
           @click="schy(scope.row.cliphone)" >删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!--充值-->
  <el-dialog
  title="会员充值"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose">
  
  <p>会员名称:<span style="margin-right:20px; color:red;" >{{czff.cliname}}</span>
  账户余额:<span style="color:red;">{{czff.yue}}</span></p>
  <el-input v-model="input" placeholder="请输入充值金额" style="width:200px; margin-top:20px;" clearable ></el-input>

<!--会员充值记录-->
<el-table
    :data="czjljh"
    v-infinite-scroll
    style="width: 100%">
    <el-table-column
      label="充值方式"
      prop="cztype">
    </el-table-column>
    
		    <el-table-column
      label="充值金额"
      prop="cmoney">
    </el-table-column>

     <el-table-column
      label="充值时间"
      prop="czdate">
    </el-table-column>
  </el-table>

  <span slot="footer" class="dialog-footer">  
    <el-button @click="queryfirm() ">取 消</el-button>
    <el-button @click="qdcz(czff.cliphone,czff.yue)">确 定</el-button>
  </span>
</el-dialog>



 <!--会员开卡-->
  <el-dialog
  title="会员开卡"
  :visible.sync="dialogVisiblehykk"
  width="50%"
  :before-close="handleClose">
  
  <el-input v-model="inputhybh" placeholder="请输入会员编号" style="width:200px; margin-top:20px;" clearable ></el-input><br>
  <el-input v-model="inputcc" placeholder="请输入初次充值金额" style="width:200px; margin-top:20px;" clearable ></el-input>

  <span slot="footer" class="dialog-footer">  
    <el-button @click="dialogVisiblehykk=false ">取 消</el-button>
    <el-button @click="hykkqdcz(inputhybh,inputcc)">确 定</el-button>
  </span>
</el-dialog>


    </el-card>
  </el-col>
</el-row>
 

</template>
<script>
export default {
    data(){
    	return{
        dialogVisible:false,
        dialogVisible2:false,
        dialogVisible3:false,
        dialogVisiblehykk:false,
         shops: [],
         sp: [],
         hysy:{},
         czff:{},
         cassprice:"",
         inid:"",
         ifjs:"",
        checked: false,
        cno:"",
        input: '',
        inputcc:'',
        inputhybh:'',
        czjljh:[],
        inputtj:'',
        

      };
    },
    created(){  
        this.queryfirm();
    },
    methods:{
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
       //查询所有会员信息
          queryfirm(){
            
            //axios
            const axios = require("axios");
            let that = this;
            that.input="";
            that.dialogVisible = false
            axios.post("http://localhost:8080/dzw_sys/api/ljy/empl/selectyAllHyljy/null").then(function(res) {
                  that.shops = res.data;
                  
              });
          },
          //根据会员手机号或会员名称查询
          tjcx(tj){
          //axios
            const axios = require("axios");
            let that = this;
            axios.post("http://localhost:8080/dzw_sys/api/ljy/empl/selectyAllHyljy/"+tj).then(function(res) {
                  that.shops = res.data;
                  
              });
          },
          //会员开卡
          hykk(){
            //axios
            const axios = require("axios");
            let that = this;
            that.input="";
            that.dialogVisiblehykk = true;
            that. queryfirm();
          },
           //会员开卡根据手机号充值
          hykkqdcz(phone,yue){
            //axios
            const axios = require("axios");
            let that = this; 
            var zf="现金支付";
            if(yue<=0){
                alert("金额不能低于0元")
            }else{
                 axios.post("http://localhost:8080/dzw_sys/api/ljy/empl/updateczkkByphone/"+phone+"/"+yue).then(function(res) {                      
                        
                    });

                  axios.post("http://localhost:8080/dzw_sys/api/ljy/empl/addCz/"+phone+"/"+zf+"/"+yue).then(function(ress) {
                    that.$message({
                          message: '充值成功',
                          type: 'success'
                      });
                  });
                  this.$notify({
                title: '成功',
                message: '已充值'+yue+',现余额为'+yue+'',
                
                type: 'success'
                });
                  that. queryfirm();
              }

         
          },
          //根据手机号查询
          gjcz(phone){
            //axios
            const axios = require("axios");
            let that = this;
            
            axios.post("http://localhost:8080/dzw_sys/api/ljy/empl/selectyAllHyljyByphone/"+phone).then(function(res) {
              
                   that.czff = res.data;
                   that.dialogVisible=true;
              });

               axios.get("http://localhost:8080/dzw_sys/api/ljy/empl/selectyAllHyljyczByphone/"+phone).then(function(ress) {  
                           that.czjljh=ress.data;   
              });
          //删除会员
          },schy(phone){
           
            //axios
            const axios = require("axios");
            let that = this;
            axios.post("http://localhost:8080/dzw_sys/api/ljy/empl/deletezc/"+phone).then(function(res) {
                
              });

              axios.post("http://localhost:8080/dzw_sys/api/ljy/empl/updatehy/"+phone).then(function(ress) {
               
              });
           

               that.$message({
                    message: '删除成功',
                    type: 'error'
                 });

               that.queryfirm();
                 
          },
           //根据手机号充值
          qdcz(phone,yue){
            //axios
            const axios = require("axios");
            let that = this; 
            var zf="现金支付";
          
            if(that.input<=0){
                alert("金额不能低于0元")
            }else{
                  axios.post("http://localhost:8080/dzw_sys/api/ljy/empl/updateczByphone/"+phone+"/"+that.input).then(function(res) {                      
                              
                          });

                        axios.post("http://localhost:8080/dzw_sys/api/ljy/empl/addCz/"+phone+"/"+zf+"/"+that.input).then(function(ress) {
                          that.$message({
                                message: '充值成功',
                                type: 'success'
                            });
                        });
                          var xyue=parseInt(that.input)+parseInt(yue) ;
                        this.$notify({
                      title: '成功',
                      message: '已充值'+that.input+',现余额为'+xyue+'',
                      
                      type: 'success'
                      
                    });
            }
         

          }
          
	  }	

}
</script>
