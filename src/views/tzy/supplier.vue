<template>
    <div>
        <h1>供应商管理</h1>
        <br><br><br>
        <el-col :span="8">
              <h3 style="text-align:left;">供应商名称：<el-input style="width:70%;" v-model="input" placeholder="请输入内容"></el-input></h3>
        </el-col>
      
        <el-col :span="3">
            <div class="grid-content bg-purple-dark">
                <el-row>
                    <el-button icon="el-icon-search" @click="chaxun()" circle></el-button>
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




        <!-- 添加发动机 -->
     <div id="app">
			<el-dialog :visible.sync="isShow" title="添加供应商" width="50%" center>
				<div id="cnt">

            <el-row style="text-align:right;margin:15px;">
              
              <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                  供应商名称：<el-input v-model="p" placeholder="请输入供应商名称" style="width:290px"></el-input> 
                </div>
              </el-col>
              <el-col :span="4">&nbsp;</el-col>
            </el-row>

             <el-row style="text-align:right;margin:15px;">
                
              <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                  供应商地址：<el-input v-model="p" placeholder="请输入供应商地址" style="width:290px"></el-input> 
                </div>
              </el-col>
               <el-col :span="4">&nbsp;</el-col>
            </el-row>
             
            <el-row style="text-align:right;margin:15px;">
               
              <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                  公司电话：<el-input v-model="p" placeholder="请输入公司电话" style="width:290px"></el-input> 
                </div>
              </el-col>
               <el-col :span="4">&nbsp;</el-col>
            </el-row>

             <el-row style="text-align:right;margin:15px;">
              <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                  联系人：<el-input v-model="p" placeholder="请输入联系人" style="width:290px"></el-input> 
                </div>
              </el-col>
               <el-col :span="4">&nbsp;</el-col>
            </el-row>

           <el-row style="text-align:right;margin:15px;">
              <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                  联系人电话：<el-input v-model="p" placeholder="请输入联系人电话" style="width:290px"></el-input> 
                </div>
              </el-col>
               <el-col :span="4">&nbsp;</el-col>
            </el-row>

             <el-row style="text-align:right;margin:15px;">
              <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                  备注：<el-input v-model="p" placeholder="请输入备注" style="width:290px"></el-input> 
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
           firms: [],
           currentPage: 1, //当前页数
           size: 4, //每页大小
           total: 0, //总条数
           next:''
        };
    },
    created(){
       this.queryfirm(1,4);
    },methods:{ 

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

        xiayiye(){
            this.next = this.firms.nextPage;
        }
        ,
        //查询全部供应商
          queryfirm(){
            //axios
            const axios = require("axios");
            let that = this;
            axios
              .get("http://localhost:8080/dzw_sys/api/tzy/shop/queryfirm/"+this.currentPage+"/"+this.size)
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
    },
    mounted:{
        
    }
}
</script>