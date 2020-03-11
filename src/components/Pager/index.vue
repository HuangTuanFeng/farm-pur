<template>
  <el-pagination @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="currentPage"
                 :page-size="pageSize"
                 class="floor"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="total">
  </el-pagination>
</template>
<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: () => {
        return 1
      }
    },
    pageSize: {
      type: Number,
      default: () => {
        return 1
      }
    },
    total: {
      type: Number,
      default: () => {
        return 1
      }
    },
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.floor {
  text-align: right;
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 20px;
  width: 100%;
  background: #fff;
  z-index: 2;
  border-top: 1px solid #dcdfe6;
}
</style>