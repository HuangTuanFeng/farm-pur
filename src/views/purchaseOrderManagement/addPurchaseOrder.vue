<template>
  <div class="ManagementList">
    <el-form :model="queryParams"
             >
     <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>订单信息</span>
      </div>
      <div style="margin-top: 15px">
            <el-form-item label="">
            <el-select size="small" v-model="queryParams.customerId" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in userList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          
      </div>
      <el-form  :inline="true">
      <el-form-item label="联系人:">
        <input style="border:0;color: #606266;"
          v-model="selectItem.contacts"
          size="small"
        />
      </el-form-item>
      <el-form-item label="联系方式:">
        <input style="border:0;color: #606266;"
          v-model="selectItem.phone"
          size="small"
        />
      </el-form-item>
      </el-form>
    
  <div class="table-container" v-if="goodsList.length">
      <el-table ref="salesTable"
                :data="goodsList"
                style="width: 100%;"
                border>
        <el-table-column label="序号" align="center">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="货物名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="品类" align="center">
          <template slot-scope="scope">{{scope.row.categoryId}}</template>
        </el-table-column>
        <el-table-column label="数量" width="160"  align="center">
          <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.qty" class="input-number" controls-position="right" :min="1" />
          </template>
        </el-table-column>
        <el-table-column label="单位" align="center">
          <template slot-scope="scope">￥{{scope.row.unit}}</template>
        </el-table-column>
        <el-table-column label="单价" align="center">
          <template slot-scope="scope">{{scope.row.purchasePrice}}</template>
        </el-table-column>
        <el-table-column label="总价" width="140" align="center">
          <template slot-scope="scope">￥{{scope.row | formatAmount }}</template>
        </el-table-column>
        <el-table-column label="需求等级" width="160"  align="center">
          <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.level" class="input-number" controls-position="right" :min="1" />
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div style="margin:30px 0">
      <el-button type="primary"
                       @click="dialogVisible=true"
          
                      plain>新增一项</el-button>
    </div>

     <!-- <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        /> -->
  

    <el-form-item label="交货时间：">
            <el-date-picker
              class="input-width"
              v-model="queryParams.deliveryAt"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="到仓时间：">
            <el-date-picker
              class="input-width"
              v-model="queryParams.arrivedAt"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
            <span>要求货物最迟到仓库的时间
</span>
          </el-form-item>
        

   

         <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="finishCommit">提交</el-button>
      </el-form-item>
         
          </el-card>
      </el-form>

      <el-dialog title="新增项目"
               :visible.sync="dialogVisible"
               width="55%">
        <add-order-detail :isEdit="true" @selectionChange="selectionChange"></add-order-detail>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleBatchOperate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import {addSalesOrder} from '@/api/salesOrderManagement'
import { userList} from '@/api/customerManagement' 
import { goodsList} from '@/api/common'
import AddOrderDetail from './components/addOrderDetail'

export default {
  name: 'AddSalesOrder',
  data () {
    return {
      dialogVisible:false,
      userList:[],
      queryParams:{
        salesOrderLines:[]
      },
      goodsList: [],
      listLoading: false,
    }
  },
  components: { AddOrderDetail },
   created () {
    this.getUserList(); //获取客户列表
    this.getGoodsList(); //获取客户列表
  },
   mounted(){
     
    },
   filters: {
      formatAmount(row) {
        let amount=Number(row.qty)* Number(row.purchasePrice);
        amount=isNaN(amount)? 0 : amount
        return amount;
      },
    },
  computed: {
    selectItem(){
      let selectedId=this.queryParams.customerId;
     let items={}
     console.log(this.userList)
      this.userList.forEach((item,i)=>{
        if(item.id==selectedId){
          items=item
        }
      })
      console.log(items)
      return items
    }
  },

  methods: {
    handleBatchOperate(){
      if (this.queryParams.salesOrderLines.length<1) {
          this.$message({
            message: '请选择一条记录',
            type: 'warning',
            duration: 1000
          });
          return;
        }else{
          this.dialogVisible=false;
        }
      
    },
    selectionChange(data){
      this.queryParams.salesOrderLines=data;
    },
    finishCommit() {
        this.$confirm('是否要提交订单信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             addSalesOrder(this.queryParams).then(response=>{
              this.$message({
                type: 'success',
                message: '提交成功',
                duration:1000
              });
              location.reload();
        })
        })
       
    },
    //客户列表
    getUserList() {
      /*handleBatchOperate(){
        if (this.multipleSelection.length < 1) {
          this.$message({
            message: '请选择一条记录',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
      },*/
      userList().then(response => {
         this.userList = response.rows;
      });
    },
    getGoodsList() {
      this.loading = true;
      goodsList().then(response => {
        this.goodsList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
  },
 
}
</script>
  
  <style>

  </style>