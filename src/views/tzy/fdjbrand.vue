<template>
<div>
  <h1>发动机品牌</h1><br><br><br>
 <el-row>
  <el-col :span="1">&nbsp;</el-col>
  <el-col :span="8">
    <div class="grid-content bg-purple-dark">
      发动机名称：<el-input v-model="shopname" placeholder="请输入发动机品牌" style="width:290px"></el-input> 
    </div>
  </el-col>

  <el-col :span="3">
    <div class="grid-content bg-purple-dark">
        <el-row>
            <el-button icon="el-icon-search" @click="queryshop()" circle></el-button>
             <el-button @click="isShow = true">添加</el-button>
      </el-row>
    </div>
  </el-col>

</el-row>
<el-table :data="shops" style="width: 80%;margin-left:50px">
      
      <el-table-column prop="shopid" label="序号" width="%25">

      </el-table-column>

      <el-table-column  prop="shopname" label="品牌" width="%25">

      </el-table-column>
      
       <el-table-column  prop="sellingprice" label="价格" width="%25">
          
      </el-table-column>

      <el-table-column label="操作" prop="shopid">
        <template slot-scope="scope">

          <el-row>
            <el-button type="primary" icon="el-icon-edit" circle @click="update(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.shopid)"></el-button>
          </el-row>
           
        </template>
      </el-table-column>

    </el-table>

<!-- 添加发动机 -->
     <div id="app">
			<el-dialog  :visible.sync="isShow" title="添加发动机品牌" width="50%" center>
				<div id="cnt" >

            <el-row style="text-align:center;margin:15px;">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  发动机名称：<el-input v-model="shop.shopname" placeholder="请输入发动机名称" style="width:290px"></el-input> 
                </div>
              </el-col>
            </el-row>

             <el-row style="text-align:center;margin:15px;">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  发动机价格：<el-input v-model="shop.sellingprice" placeholder="请输入发动机价格" style="width:290px"></el-input> 
                </div>
              </el-col>
            </el-row>



             <el-row style="text-align:center;margin:15px;">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                   车辆的品牌：<el-select v-model="op" clearable placeholder="请选择" style="width:290px">
                    <el-option
                      v-for="item in cartypes"
                      :key="item.ctid"
                      :label="item.ctname"
                      :value="item.ctid">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>

            <el-row style="text-align:center;margin:15px;">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  适合的车型：<el-input v-model="shop.numbering" placeholder="请输入适合的车型" style="width:290px"></el-input> 
                </div>
              </el-col>
            </el-row>

             <el-row style="text-align:center;margin:15px;">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  发动机数量：<el-input v-model="shop.quantity" placeholder="请输入发动机数量" style="width:290px"></el-input> 
                </div>
              </el-col>
            </el-row>

             

             <el-row style="text-align:center;margin:15px;">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  供应商名称：<el-select v-model="ops" clearable placeholder="请选择" style="width:290px">
                    <el-option
                      v-for="item in options"
                      :key="item.firmid"
                      :label="item.firmname"
                      :value="item.firmid">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>

				</div>
				<span slot="footer" class="dialog-footer">
	    			<el-button @click="isShow=false">取 消</el-button>
	    			<el-button type="primary" @click="add()">确 定</el-button>
  				</span>
			</el-dialog>

		</div>

<!-- 修改模态框 -->
  <div id="app">
			<el-dialog  :visible.sync="isShows" title="修改发动机品牌" width="50%" center>
				<div id="cnt" >

            <el-row style="text-align:center;margin:15px;">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  发动机名称：<el-input v-model="xgshop.shopname" placeholder="请输入发动机名称" style="width:290px"></el-input> 
                </div>
              </el-col>
            </el-row>

             <el-row style="text-align:center;margin:15px;">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  发动机价格：<el-input v-model="xgshop.sellingprice" placeholder="请输入发动机价格" style="width:290px"></el-input> 
                </div>
              </el-col>
            </el-row>



             <el-row style="text-align:center;margin:15px;">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                   车辆的品牌：<el-select v-model="op" clearable placeholder="请选择" style="width:290px">
                    <el-option
                      v-for="item in cartypes"
                      :key="item.ctid"
                      :label="item.ctname"
                      :value="item.ctid">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>

            <el-row style="text-align:center;margin:15px;">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  适合的车型：<el-input v-model="xgshop.numbering" placeholder="请输入适合的车型" style="width:290px"></el-input> 
                </div>
              </el-col>
            </el-row>

             <el-row style="text-align:center;margin:15px;">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  发动机数量：<el-input v-model="xgshop.quantity" placeholder="请输入发动机数量" style="width:290px"></el-input> 
                </div>
              </el-col>
            </el-row>

             

             <el-row style="text-align:center;margin:15px;">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  供应商名称：<el-select v-model="ops" clearable placeholder="请选择" style="width:290px">
                    <el-option
                      v-for="item in options"
                      :key="item.firmid"
                      :label="item.firmname"
                      :value="item.firmid">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
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

 <script>
    export default {
      data() {
        return {
          isShow: false,
          isShows: false,
          input:'',
          shops: [],
          cartypes:[],
          options: [],
          op:1,
          ops:1,
          shopname:null,
          shop:{
            firmid:'',
            shopname:'',
            sellingprice:'',
            numbering:'',
            quantity:'',
            weight:'',
            goodid:1
          },
           xgshop:{
            shopid:'',
            firmid:'',
            shopname:'',
            sellingprice:'',
            numbering:'',
            quantity:'',
            weight:'',
            goodid:1
          },
           currentPage: 1, //当前页数
           size: 4, //每页大小
           total: 0, //总条数
        };
      },
      created(){  
        this.queryshop();
        this.queryfirm(null,1,100);
        this.querycartypes();
      },
      methods:{
          //分页
          handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.size = val;
            this.queryshop();
          },
          handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.queryshop();
          }, 
          //修改发动机
          update(xg){
              this.isShows = true;
              this.xgshop.shopname = xg.shopname;
              this.xgshop.sellingprice = xg.sellingprice;
              this.xgshop.numbering = xg.numbering;
              this.xgshop.quantity = xg.quantity;
              this.xgshop.shopid = xg.shopid;
              this.op = xg.firmid;
              this.ops = xg.weight;
              this.xgshop.firmid = this.op;
              this.xgshop.weight = this.ops;
            
          },queding(){
              //axios
              const axios = require("axios");
              let that = this;
              axios
                .post("http://localhost:8080/dzw_sys/api/tzy/shop/modifyshop",this.xgshop)
                .then(function (res) {
                  if(res.data){
                      that.$message({
                        type: 'success',
                        message: '修改成功'
                      });
                      that.isShows = false;
                      that.queryshop();
                  }else{
                      that.$message({
                        type: 'success',
                        message: '修改失败'
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
          //查询全部车辆品牌
          querycartypes(){
            //axios
            const axios = require("axios");
            let that = this;
            axios
              .get("http://localhost:8080/dzw_sys/api/tzy/cartypes/querycartypes")
              .then(function (res) {
                  that.cartypes = res.data;
                  
              });
          },
          //添加发动机
          add(){
            this.shop.firmid = this.ops
            this.shop.weight = this.op
            //axios
            const axios = require("axios");
            let that = this;
            axios
              .post("http://localhost:8080/dzw_sys/api/tzy/shop/addshop",this.shop)
              .then(function (res) {
                 if(res.data){
                    that.$message({
                      type: 'success',
                      message: '添加成功'
                    });
                     that.isShow = false;
                     that.queryshop();
                     window.location.reload();
                 }else{
                    that.$message({
                      type: 'success',
                      message: '添加失败'
                    });
                 }
                  
              });
          },
          //查询全部
          queryshop() {
            //axios
            const axios = require("axios");
            let that = this;
            if(this.shopname==""){this.shopname = null}
            axios
              .get("http://localhost:8080/dzw_sys/api/tzy/shop/queryshop/"+this.shopname+"/"+this.currentPage+"/"+this.size)
              .then(function (res) {
                that.shops = res.data.list;
                that.total = res.data.total;
              });
          },         
          //删除信息 
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
                  that.queryshop();
                }else{
                  that.$message({
                      type: 'success',
                      message: '删除失败'
                    });
                }
            });
          }
    }                                                                                                   
    }
  </script>