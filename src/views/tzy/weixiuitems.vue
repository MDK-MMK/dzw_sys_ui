<template>
    <div>

        <h1>保养项目</h1>
        <br>
        <el-col :span="10">
              <h3 style="text-align:left;">保养项目名称：<el-input style="width:70%;" v-model="byname"  placeholder="请输入内容"></el-input></h3>
        </el-col>
      
        <el-col :span="3">
            <div class="grid-content bg-purple-dark">
                <el-row>
                    <el-button icon="el-icon-search" @click="queryby()" circle></el-button>
                    <el-button @click="isShow = true">添加</el-button>
                 </el-row>
            </div>
        </el-col>


        <el-table
        :data="baoy"
        style="width: 95%">
        <el-table-column prop="shopid" label="序号">

        </el-table-column>
        <el-table-column prop="shopname" label="项目名称">

        </el-table-column>
       
       <el-table-column prop="sellingprice" label="售价">

        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">

                <el-row>
                <el-button type="primary" icon="el-icon-edit" circle @click="byupd(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.shopid)"></el-button>
                </el-row>
            
            </template>
        </el-table-column>

        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage"  :page-sizes="[2, 4, 6]"
          :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      <br>
        


        <h1>维修项目</h1>
        <br>
        <el-col :span="10">
              <h3 style="text-align:left;">维修项目名称：<el-input style="width:70%;" v-model="wxname"  placeholder="请输入内容"></el-input></h3>
        </el-col>
      
        <el-col :span="3">
            <div class="grid-content bg-purple-dark">
                <el-row>
                    <el-button icon="el-icon-search" @click="querywx()" circle></el-button>
                    <el-button @click="show = true">添加</el-button>
            </el-row>
            </div>
        </el-col>
        <el-table
        :data="weix"
        style="width: 95%">
        <el-table-column prop="shopid" label="序号">

        </el-table-column>
        <el-table-column prop="shopname" label="项目名称">

        </el-table-column>
        <el-table-column prop="sellingprice" label="售价">

        </el-table-column>
        <el-table-column prop="quantity" label="数量"  >

        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">

                <el-row>
                <el-button type="primary" icon="el-icon-edit" circle @click="wxupd(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.shopid)"></el-button>
                </el-row>
            
            </template>
        </el-table-column>
        </el-table>
         <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1"
          :current-page="currentPage1"  :page-sizes="[1, 3, 5]"
          :page-size="size1" layout="total, sizes, prev, pager, next, jumper" :total="total1">
      </el-pagination>



    <!-- 添加保养项目 -->
    <div id="a">
    <el-dialog  :visible.sync="isShow" title="添加保养项目" width="50%" center>
        <div id="cnt" >

    <el-row  style="text-align:right;margin:15px;">
        <el-col :span="18">
        <div class="grid-content bg-purple-dark">
           项目名称：<el-input v-model="addbaoy.shopname" placeholder="请输入保养项目名称" style="width:290px"></el-input><span style="color:red;padding-left:15px;">*</span>    
        </div>
        </el-col>
        <el-col :span="4">&nbsp;</el-col>
    </el-row>
 
    <el-row style="text-align:right;margin:15px;">
        <el-col :span="18">
        <div class="grid-content bg-purple-dark">
             保养价格：<el-input v-model="addbaoy.sellingprice" placeholder="请输入价格" style="width:290px"></el-input><span style="color:red;padding-left:15px;">*</span>    
        </div>
        </el-col>
        <el-col :span="4">&nbsp;</el-col>
    </el-row>

    <el-row style="text-align:right;margin:15px;">
        <el-col :span="18">
        <div class="grid-content bg-purple-dark">
            项目耗时：<el-input v-model="addbaoy.quantity" placeholder="请输入项目耗时" style="width:290px"></el-input><span style="color:red;padding-left:15px;">*</span>     
        </div>
        </el-col>
        <el-col :span="4">&nbsp;</el-col>
    </el-row>

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="isShow=false">取 消</el-button>
            <el-button type="primary" @click="byadd()">确 定</el-button>
        </span>
    </el-dialog>
</div>


 <!-- 添加维修项目 -->
    <div id="a">
    <el-dialog  :visible.sync="show" title="添加维修项目" width="50%" center>
        <div id="cnt" >

    <el-row  style="text-align:right;margin:15px;">
        <el-col :span="18">
        <div class="grid-content bg-purple-dark">
            项目名称：<el-input v-model="addweix.shopname" placeholder="请输入保养项目名称" style="width:290px"></el-input><span style="color:red;padding-left:15px;">*</span>     
        </div>
        </el-col>
        <el-col :span="4">&nbsp;</el-col>
    </el-row>

        <el-row style="text-align:right;margin:15px;">
        <el-col :span="18">
        <div class="grid-content bg-purple-dark">
            项目价格：<el-input v-model="addweix.sellingprice" placeholder="请输入价格" style="width:290px"></el-input><span style="color:red;padding-left:15px;">*</span>     
        </div>
        </el-col>
        <el-col :span="4">&nbsp;</el-col>
    </el-row>

     <el-row style="text-align:right;margin:15px;">
        <el-col :span="18">
        <div class="grid-content bg-purple-dark">
            项目数量：<el-input v-model="addweix.quantity" placeholder="请输入数量" style="width:290px"></el-input><span style="color:red;padding-left:15px;">*</span>     
        </div>
        </el-col>
        <el-col :span="4">&nbsp;</el-col>
    </el-row>

        <el-row style="text-align:right;margin:15px;">
        <el-col :span="18">
        <div class="grid-content bg-purple-dark">
            供应商名称：<el-select v-model="ops" clearable placeholder="请选择" style="width:290px">  
            <el-option
                v-for="item in options"
                :key="item.firmid"
                :label="item.firmname"
                :value="item.firmid">
            </el-option>
            </el-select><span style="color:red;padding-left:15px;">*</span>     
        </div>
        </el-col>
        <el-col :span="4">&nbsp;</el-col>
    </el-row>

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="show=false">取 消</el-button>
            <el-button type="primary" @click="wxadd()">确 定</el-button>
        </span>
    </el-dialog>

	   </div>

        <!-- 修改保养项目 -->
    <div id="a">
    <el-dialog  :visible.sync="isShows" title="修改保养项目" width="50%" center>
        <div id="cnt" >

    <el-row  style="text-align:right;margin:15px;">
        <el-col :span="18">
        <div class="grid-content bg-purple-dark">
           项目名称：<el-input v-model="xgbaoy.shopname" placeholder="请输入保养项目名称" style="width:290px"></el-input> 
        </div>
        </el-col>
        <el-col :span="4">&nbsp;</el-col>
    </el-row>

        <el-row style="text-align:right;margin:15px;">
        <el-col :span="18">
        <div class="grid-content bg-purple-dark">
             保养价格：<el-input v-model="xgbaoy.sellingprice" placeholder="请输入价格" style="width:290px"></el-input> 
        </div>
        </el-col>
        <el-col :span="4">&nbsp;</el-col>
    </el-row>

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="isShows=false">取 消</el-button>
            <el-button type="primary" @click="byqueding()">确 定</el-button>
        </span>
    </el-dialog>
</div>


 <!-- 修改维修项目 -->
    <div id="a">
    <el-dialog  :visible.sync="show1" title="修改维修项目" width="50%" center>
        <div id="cnt" >

    <el-row  style="text-align:right;margin:15px;">
        <el-col :span="18">
        <div class="grid-content bg-purple-dark">
            项目名称：<el-input v-model="xgweix.shopname" placeholder="请输入保养项目名称" style="width:290px"></el-input> 
        </div>
        </el-col>
        <el-col :span="4">&nbsp;</el-col>
    </el-row>
        
        <el-row style="text-align:right;margin:15px;">
        <el-col :span="18">
        <div class="grid-content bg-purple-dark">
            项目价格：<el-input v-model="xgweix.sellingprice" placeholder="请输入价格" style="width:290px"></el-input> 
        </div>
        </el-col>
        <el-col :span="4">&nbsp;</el-col>
    </el-row>

     <el-row style="text-align:right;margin:15px;">
        <el-col :span="18">
        <div class="grid-content bg-purple-dark">
            项目数量：<el-input v-model="xgweix.quantity" placeholder="请输入数量" style="width:290px"></el-input> 
        </div>
        </el-col>
        <el-col :span="4">&nbsp;</el-col>
    </el-row>

        <el-row style="text-align:right;margin:15px;">
        <el-col :span="18">
        <div class="grid-content bg-purple-dark">
            供应商名称：<el-select v-model="xgweix.firmid" clearable placeholder="请选择" style="width:290px">
            <el-option
                v-for="item in options"
                :key="item.firmid"
                :label="item.firmname"
                :value="item.firmid">
            </el-option>
            </el-select>
        </div>
        </el-col>
        <el-col :span="4">&nbsp;</el-col>
    </el-row>

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="show1=false">取 消</el-button>
            <el-button type="primary" @click="wxqueding()">确 定</el-button>
        </span>
    </el-dialog>

	   </div>

</div>
</template>
<script>
export default {
    data(){
        return{
            show:false,
            show1:false,
            isShow: false,
            isShows: false,
            options:[],
            ops:1,
             baoy: [],
             addbaoy:{
                 goodid:2,
                 shopname:'',
                 image:'1',
                 sellingprice:'',
                 quantity:''

             },
             xgbaoy:{
                 shopid:'',
                 shopname:'',
                 sellingprice:''
             },
             weix:[],
             addweix:{
                 goodid:3,
                 firmid:'',
                 shopname:'',
                 image:1,
                 sellingprice:'',
                 quantity:''
             },
             xgweix:{
                 shopid:'',
                 firmid:'',
                 shopname:'',
                 image:1,
                 sellingprice:'',
                 quantity:''
             },
             byname:null,
             wxname:null,
             currentPage: 1, //当前页数
             size: 4, //每页大小
             total: 0, //总条数
             currentPage1: 1, //当前页数
             size1: 3, //每页大小
             total1: 0, //总条数
        }; 
    },created(){
        this.queryby();
        this.querywx();
        this.queryfirm(null,1,100);
    },methods:{
    //分页
    handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.size = val;
        this.queryby();
    },
    handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.queryby();
    }, 
        //查询全部保养项目
        queryby(){
         //axios
        const axios = require("axios");
        let that = this;
        if(this.byname==""){
            this.byname = null;
        }
        axios
            .get("http://localhost:8080/dzw_sys/api/tzy/shop/queryshopby/"+this.byname+"/"+this.currentPage+"/"+this.size)
            .then(function (res) {
                that.baoy = res.data.list;
                that.total = res.data.total;
                
            });
        },
        //分页
        handleSizeChange1(val) {
        // console.log(`每页 ${val} 条`);
        this.size1 = val;
        this.querywx();
        },
        handleCurrentChange1(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage1 = val;
        this.querywx();
        },
        //查询全部维修项目
        querywx(){
         //axios
        const axios = require("axios");
        let that = this;
        if(this.wxname==""){
            this.wxname = null;
        }
        axios
            .get("http://localhost:8080/dzw_sys/api/tzy/shop/queryshopwx/"+this.wxname+"/"+this.currentPage1+"/"+this.size1)
            .then(function (res) {
                that.weix = res.data.list;
                that.total1 = res.data.total;
                
            });
        },
        //删除发动机 
        del(shopid){
        const axios = require("axios");
        let that = this;
        axios
        .get("http://localhost:8080/dzw_sys/api/tzy/shop/deleteshop/"+shopid)
        .then(function (res) {
            if(res.data>0){
                that.$message({
                    type: 'success',
                    message: '删除成功'
                });
                that.queryby();
                that.querywx();
            }else{
                that.$message({
                    type: 'success',
                    message: '删除失败'
                });
            }
        });
        }, 
        //查询全部供应商
        queryfirm(firmname,p,s){
        //axios
        const axios = require("axios");
        let that = this;
        axios
            .get("http://localhost:8080/dzw_sys/api/tzy/firm/queryfirm/"+firmname+"/"+p+"/"+s)
            .then(function (res) {
                that.options = res.data.list;
                
                console.log(res.data.list);
            });
        },
         //添加保养项目
        byadd(){
            //axios
            const axios = require("axios");
            let that = this;
            if(this.addbaoy.shopname == ""){
            that.$message({
                type: 'success',
                message: '名称不能为空'
              });
            return; 
            }
             if(this.addbaoy.sellingprice == ""){
            that.$message({
                type: 'success',
                message: '价格不能为空'
              });
            return; 
            }
            if(this.addbaoy.quantity == ""){
            that.$message({
                type: 'success',
                message: '项目耗时不能为空'
              });
            return; 
            }
            axios
              .post("http://localhost:8080/dzw_sys/api/tzy/shop/addshop",this.addbaoy)
              .then(function (res) {
                 if(res.data){
                    that.$message({
                      type: 'success',
                      message: '添加成功'
                    });
                     that.isShow = false;
                     that.queryby();
                     window.location.reload();
                 }else{
                    that.$message({
                      type: 'success',
                      message: '添加失败'
                    });
                 }
                  
              });
        },
         //添加维修项目
        wxadd(){
            this.addweix.firmid = this.ops
            //axios
            const axios = require("axios");
            let that = this;
             if(this.addweix.shopname == ""){
                that.$message({
                    type: 'success',
                    message: '名称不能为空'
                });
                return; 
            }
            if(this.addweix.sellingprice == ""){
                that.$message({
                    type: 'success',
                    message: '价格不能为空'
                });
                return; 
            }
            if(this.addweix.quantity == ""){
                that.$message({
                    type: 'success',
                    message: '数量不能为空'
                });
                return; 
            }
            axios
              .post("http://localhost:8080/dzw_sys/api/tzy/shop/addshop",this.addweix)
              .then(function (res) {
                 if(res.data){
                    that.$message({
                      type: 'success',
                      message: '添加成功'
                    });
                     that.show = false;
                     that.querywx();
                 }else{
                    that.$message({
                      type: 'success',
                      message: '添加失败'
                    });
                 }
                  
              });
        },
         //修改保养项目
        byupd(xg){
            this.isShows = true;
            this.xgbaoy.shopid = xg.shopid;
            this.xgbaoy.shopname = xg.shopname;
            this.xgbaoy.sellingprice = xg.sellingprice;
        },
        byqueding(){
              //axios
            
              const axios = require("axios");
              let that = this;
              axios
                .post("http://localhost:8080/dzw_sys/api/tzy/shop/modifyshop",this.xgbaoy)
                .then(function (res) {
                  if(res.data){
                      that.$message({
                        type: 'success',
                        message: '修改成功'
                      });
                      that.isShows = false;
                      that.queryby();
                  }else{
                      that.$message({
                        type: 'success',
                        message: '修改失败'
                      });
                  }
                    
                });
        },
         //修改维修项目
        wxupd(xg){
             this.show1 = true;
             this.xgweix.shopid = xg.shopid;
             this.ops = xg.firmid;
             this.xgweix.firmid = this.ops;
             this.xgweix.shopname = xg.shopname;
             this.xgweix.sellingprice = xg.sellingprice;
             this.xgweix.quantity = xg.quantity;
             console.log(this.options);
        },
        wxqueding(){
              //axios
              const axios = require("axios");
              let that = this;
              axios
                .post("http://localhost:8080/dzw_sys/api/tzy/shop/modifyshop",this.xgweix)
                .then(function (res) {
                  if(res.data){
                      that.$message({
                        type: 'success',
                        message: '修改成功'
                      });
                      that.show1 = false;
                      that.querywx();
                  }else{
                      that.$message({
                        type: 'success',
                        message: '修改失败'
                      });
                  }
                    
                });
        }
    }
}
</script>