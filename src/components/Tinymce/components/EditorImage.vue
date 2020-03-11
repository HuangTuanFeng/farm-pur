<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}"
               icon="el-icon-upload"
               size="mini"
               type="primary"
               @click=" dialogVisible=true">
      上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <upload :image_uri="listObj"
              v-on:imgChange="imgChange" />
      <el-button @click="dialogVisible = false">
        取 消
      </el-button>
      <el-button type="primary"
                 @click="handleSubmit">
        确 定
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import Upload from '@/components/Upload/SingleImage'

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data () {
    return {
      dialogVisible: false,
      listObj: '',
    }
  },
  methods: {
    imgChange (v) {
      this.listObj = v
    },
    handleSubmit () {
      if (!this.listObj) {
        this.$message('请等待图片上传成功。如果有网络问题，请刷新页面并重新上传!!')
        return
      }
      this.$emit('successCBK', this.listObj)
      this.listObj = ''
      this.dialogVisible = false
    }
  },
  components: {
    Upload
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
