<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="tableList">
      <el-table-column label="货物ID" align="center" prop="id" />
      <el-table-column label="货物名称" align="center" prop="name" />
      <el-table-column label="品类" align="center" prop="category_name" />
      <el-table-column label="货物资质证明" align="center">
        <template slot-scope="scope" v-if="scope.row.certificate_pic[0]">
          <el-image
            v-for="pic in scope.row.certificate_pic"
            :key="pic"
            style="width: 80px;margin-right:10px;"
            :src="pic"
            fit="contain"
            :preview-src-list="[pic]"
          ></el-image>
        </template>        
      </el-table-column>
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
      <el-table-column label="所属供应商" align="center" prop="farm_name" />
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import product from "@/api/product";

export default {
  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 表格数据
      tableList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      this.tableList = [];
      product.list(this.queryParams).then(response => {
        response.rows.forEach(item => {
          item.pic = item.pic ? item.pic.split(",") : []          
          item.certificate_pic = item.certificate_pic ? item.certificate_pic.split(","): []
          this.tableList.push(item)          
        })
        this.total = response.total;
        this.loading = false;
      });
    }
  }
};
</script>