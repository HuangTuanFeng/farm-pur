<template>
  <div class="app-container">
    <div class="table-container">
      <el-table ref="flashTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
      <el-table-column label="货物名称" align="center" prop="name" />
      <el-table-column label="品类" align="center" prop="categoryName" />
      <el-table-column label="货物图片" align="center">
        <template slot-scope="scope" v-if="scope.row.pic[0]">
          <el-image
            v-for="pic in scope.row.pic"
            :key="pic"
            style="width: 80px;margin-right:10px;"
            :src="pic"
            fit="contain"
            :preview-src-list="[pic]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="预计用量" align="center" prop="volume" />
      <el-table-column label="需求时间" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">每{{ scope.row.period }}天</span>
          <span v-else>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
        <el-table-column label="进度" width="146" align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="操作" width="146" align="center">
          <template slot-scope="scope">
            <el-button @click="handleAccept(scope.row)" v-if="scope.row.status == 0">接受</el-button>            
            <el-button @click="handleFinished(scope.row)" v-if="scope.row.status == 1">完成</el-button>            
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
  </div>
</template>
<script>
import productDemand from "@/api/productDemand";

const defaultParams = {
  pageNum: 1,
  pageSize: 10
};
export default {
  name: "NewProductList",
  data() {
    return {
      listQuery: Object.assign({}, defaultParams),
      list: null,
      total: 0,
      listLoading: false
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatStatus(row) {
      if (row == 0) {
        return "待找资源";
      } else if (row == 1) {
        return "正在找资源";
      } else {
        return "已完成";
      }
    },
    formatDate(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  methods: {
    getList() {
      this.list = []
      this.listLoading = true;
      productDemand.list(this.listQuery).then(response => {
        this.listLoading = false;
        response.rows.forEach(item => {
          item.pic = item.pic.split(",")
          this.list.push(item)          
        })
        this.total = response.total;
      });
    },
    // 点击接受
    handleAccept(item) {
      this.$confirm("确定接受吗?", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        productDemand.update({id: item.id, status: 1}).then(res => {
          this.getList()          
        })
      }).catch(() => {})
    },
    // 点击完成
    handleFinished(item) {
      this.$confirm("确定完成吗?", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        item.status = 2
        productDemand.update({id: item.id, status: 2}).then(res => {
          this.getList()
        })
      }).catch(() => {})
    }
  }
};
</script>
<style></style>


