<template>
    <div>
        <h1>供应商管理</h1>
        <br><br><br>
        <el-col :span="8">
              <h3 style="text-align:left;">供应商名称：<el-input style="width:70%;" v-model="firmname"  placeholder="请输入内容"></el-input></h3>
        </el-col>
      
        <el-col :span="3">
            <div class="grid-content bg-purple-dark">
                <el-row>
                    <el-button icon="el-icon-search" @click="queryfirm()" circle></el-button>
                    <el-button @click="isShow = true">添加</el-button>
            </el-row>
            </div>
        </el-col>
         <el-table :data="firms" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column prop="firmid" label="序号" width="180">

            </el-table-column>
            <el-table-column prop="firmname" label="供应商名称" width="180">

            </el-table-column>
            <el-table-column prop="faddress" label="供应商地址" width="180">

            </el-table-column>
            <el-table-column prop="fphone" label="公司电话" width="180">

            </el-table-column>
            <el-table-column prop="lxr" label="联系人" width="180">

            </el-table-column>
            <el-table-column prop="lphone" label="联系人电话" width="180">

            </el-table-column>
            
            <el-table-column prop="address" label="操作">

                <template slot-scope="scope">

                    <el-row>
                        <el-button type="primary" icon="el-icon-edit" circle @click="update(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.firmid)"></el-button>
                    </el-row>
           
                </template>
            </el-table-column>
        </el-table>
        
      <!-- 添加供应商 -->
     <div id="app">
			<el-dialog :visible.sync="isShow" title="添加供应商" width="50%" center>
				<div id="cnt">

            <el-row style="text-align:right;margin:15px;">
              
              <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                  供应商名称：<el-input v-model="firm.firmname" placeholder="请输入供应商名称" style="width:290px"></el-input> 
                </div>
              </el-col>
              <el-col :span="4">&nbsp;</el-col>
            </el-row>

             <el-row style="text-align:right;margin:15px;">
                
              <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                  供应商地址：<el-input v-model="firm.faddress" placeholder="请输入供应商地址" style="width:290px"></el-input> 
                </div>
              </el-col>
               <el-col :span="4">&nbsp;</el-col>
            </el-row>
             
            <el-row style="text-align:right;margin:15px;">
               
              <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                  公司电话：<el-input v-model="firm.fphone" placeholder="请输入公司电话" style="width:290px"></el-input> 
                </div>
              </el-col>
               <el-col :span="4">&nbsp;</el-col>
            </el-row>

             <el-row style="text-align:right;margin:15px;">
              <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                  联系人：<el-input v-model="firm.lxr" placeholder="请输入联系人" style="width:290px"></el-input> 
                </div>
              </el-col>
               <el-col :span="4">&nbsp;</el-col>
            </el-row>

           <el-row style="text-align:right;margin:15px;">
              <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                  联系人电话：<el-input v-model="firm.lphone" placeholder="请输入联系人电话" style="width:290px"></el-input> 
                </div>
              </el-col>
               <el-col :span="4">&nbsp;</el-col>
            </el-row>

             <el-row style="text-align:right;margin:15px;">
              <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                  备注：<el-input v-model="firm.fsevenst" placeholder="请输入备注" style="width:290px"></el-input> 
                </div>
              </el-col>
               <el-col :span="4">&nbsp;</el-col>
            </el-row>

				</div>
				<span slot="footer" class="dialog-footer">
	    			<el-button @click="isShow=false">取 消</el-button>
	    			<el-button type="primary" @click="add()">确 定</el-button>
  				</span>
			</el-dialog>
		</div>


    <!-- 修改供应商 -->
     <div id="app">
			<el-dialog :visible.sync="isShows" title="修改供应商" width="50%" center>
				<div id="cnt">

            <el-row style="text-align:right;margin:15px;">
              
              <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                  供应商名称：<el-input v-model="xgfirm.firmname" placeholder="请输入供应商名称" style="width:290px"></el-input> 
                </div>
              </el-col>
              <el-col :span="4">&nbsp;</el-col>
            </el-row>

             <el-row style="text-align:right;margin:15px;">
                
              <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                  供应商地址：<el-input v-model="xgfirm.faddress" placeholder="请输入供应商地址" style="width:290px"></el-input> 
                </div>
              </el-col>
               <el-col :span="4">&nbsp;</el-col>
            </el-row>
             
            <el-row style="text-align:right;margin:15px;">
               
              <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                  公司电话：<el-input v-model="xgfirm.fphone" placeholder="请输入公司电话" style="width:290px"></el-input> 
                </div>
              </el-col>
               <el-col :span="4">&nbsp;</el-col>
            </el-row>

             <el-row style="text-align:right;margin:15px;">
              <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                  联系人：<el-input v-model="xgfirm.lxr" placeholder="请输入联系人" style="width:290px"></el-input> 
                </div>
              </el-col>
               <el-col :span="4">&nbsp;</el-col>
            </el-row>

           <el-row style="text-align:right;margin:15px;">
              <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                  联系人电话：<el-input v-model="xgfirm.lphone" placeholder="请输入联系人电话" style="width:290px"></el-input> 
                </div>
              </el-col>
               <el-col :span="4">&nbsp;</el-col>
            </el-row>

             <el-row style="text-align:right;margin:15px;">
              <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                  备注：<el-input v-model="xgfirm.fsevenst" placeholder="请输入备注" style="width:290px"></el-input> 
                </div>
              </el-col>
               <el-col :span="4">&nbsp;</el-col>
            </el-row>

				</div>
				<span slot="footer" class="dialog-footer">
	    			<el-button @click="isShows=false">取 消</el-button>
	    			<el-button type="primary" @click="queding()">确 定</el-button>
  				</span>
			</el-dialog>

		</div>



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
    </div>
</template>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
<script>
export default {
    data(){
        return{
           isShow:false,
           isShows:false,
           firms: [],
           firm:{
             firmname:'',
             faddress:'',
             fphone:'',
             lxr:'',
             lphone:'',
             fsevenst:''
           },
             xgfirm:{
             firmid:'',
             firmname:'',
             faddress:'',
             fphone:'',
             lxr:'',
             lphone:'',
             fsevenst:''
           },
           firmname:null,
           currentPage: 1, //当前页数
           size: 4, //每页大小
           total: 0, //总条数
        };
    },
    created(){

       this.queryfirm(1,4);

    },methods:{ 
    update(xg){
        this.isShows = true;
        this.xgfirm.firmid = xg.firmid;
        this.xgfirm.firmname = xg.firmname;
        this.xgfirm.faddress = xg.faddress;
        this.xgfirm.fphone =xg.fphone;
        this.xgfirm.lxr = xg.lxr;
        this.xgfirm.lphone = xg.lphone;
        this.xgfirm.fsevenst = xg.fsevenst;

    },queding(){
              //axios
              const axios = require("axios");
              let that = this;
              axios
                .post("http://localhost:8080/dzw_sys/api/tzy/firm/updfirm",this.xgfirm)
                .then(function (res) {
                  if(res.data){
                      that.$message({
                        type: 'success',
                        message: '修改成功'
                      });
                      that.isShows = false;
                      that.queryfirm();
                  }else{
                      that.$message({
                        type: 'success',
                        message: '修改失败'
                      });
                  }
                    
                });
          },
    add(){
       const axios = require("axios");
        let that = this;
        axios
          .post("http://localhost:8080/dzw_sys/api/tzy/firm/addfirm",this.firm)
          .then(function (res) {
              if(res.data){
                that.$message({
                  type: 'success',
                  message: '添加成功'
                });
                  window.location.reload();
                  that.isShow = false;
                  that.queryfirm();
              }else{
                that.$message({
                  type: 'success',
                  message: '添加失败'
                });
              }
              
          });
    },
    //删除信息 
    del(firmid){
      const axios = require("axios");
      let that = this;
      axios
      .get("http://localhost:8080/dzw_sys/api/tzy/firm/deletefirm/"+firmid)
      .then(function (res) {
          if(res.data>0){
            that.$message({
                type: 'success',
                message: '删除成功'
              });
                that.queryfirm();
          }else{
            that.$message({
                type: 'success',
                message: '删除失败'
              });
          }
      })
    },
    //分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val;
      this.queryfirm();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.queryfirm();
    }, 
    //查询全部供应商
    queryfirm(){
      //axios
      const axios = require("axios");
      let that = this;
      if(this.firmname==""){
          this.firmname = null;
      }
      axios
        .get("http://localhost:8080/dzw_sys/api/tzy/firm/queryfirm/"+this.firmname+"/"+this.currentPage+"/"+this.size)
        .then(function (res) {
            that.firms = res.data.list;
            that.total = res.data.total;
            
        });
    },
    tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
        return 'warning-row';
        } else if (rowIndex === 3) {
        return 'success-row';
        }
        return '';
    }
  }
}
</script>