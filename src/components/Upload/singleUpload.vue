<template> 
  <div>
    <el-upload
        v-if="!ad_url"
        class="avatar-uploader"
        ref="upload"
        list-type="picture-card"
        :action="upload_url"
        :name="upload_name"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :file-list="ad_url_list"
        :limit="1"
        :show-file-list="false"
        :http-request="uploadSectionFile">
        <i class="el-icon-plus"></i>
    </el-upload>
    <div class="el-upload-list el-upload-list--picture-card" v-if="ad_url">
      <div class="el-upload-list__item is-success">
        <img :src="ad_url" alt="" v-if="ad_url" class="avatar">
        <div class="el-upload-liat__item-status-label">
          <i class="el-icon-upload-success el-icon-check"></i>
        </div>
        <div class="el-upload-list__item-actions">
          <span class="el-upload-list__item-delete">
            <i class="el-icon-delete" @click.stop="handleRemove()"></i>
          </span>
          <span class="el-upload-list__item-delete">
            <i class="el-icon-zoom-in" @click.stop="handlePicPrev()"></i>
          </span>
        </div>
      </div>
    </div>
    <!--大图弹出框-->
    <el-dialog :visible.sync="imgDialogVisible" size="full" :modal="false" title="查看大图片">
      <img width="100%" :src="ad_url_list" alt="" v-if="ad_url">
    </el-dialog>

  </div>
</template>
<script>
  import {imgUpload} from '@/api/common'

  export default {
    name: 'singleUpload',
    data: function(){
    return {
        upload_url: '',//上传URL
        upload_name: '',//图片或视频名称
        ad_url: '',//上传后的图片或视频URL
        ad_url_list: [],//预览列表
        imgDialogVisible:false,
    }
},
      props:[
          name
      ],
methods: {
    handlePicPrev(){
      this.imgDialogVisible=true;
    },
    handleExceed: function () {
       this.$message.error("请先删除选择的图片，再上传!");
    },
    handleRemove: function (res, file) {
        var self = this;
        self.ad_url = '';
        var liItem = document.getElementsByClassName('hide-video-box')[0];
        liItem.innerHTML = '';
    },
    uploadSectionFile: function (params) {
        var self = this,
            file = params.file,
            fileType = file.type,
            isImage = fileType.indexOf('image') != -1,
            isVideo = fileType.indexOf('video') != -1,
            file_url = self.$refs.upload.uploadFiles[0].url;


        if (isImage) {
            var img = new Image();
            img.src = file_url;
            img.onload = function () {

                //图片上传
                self.upload_url = '你的图片上传URL';
                self.upload_name = 'file_img[]';
                self.uploadFile(file);
            }
        }else{
           this.$message.error("只能上传图片格式png、jpg、gif!");
        }
    },
    uploadFile: function (file) {
         const form = new FormData();
      form.append("file", file);

       imgUpload(form).then(res => {

           this.ad_url_list.push(res.data);
        this.ad_url = res.data;
        console.log(55)
        console.log(this.ad_url)
        this.$emit('imgChange', this.ad_url)

      })
       //this.$parent.
    }
}
  }
</script>
<style lang="scss">
  img{
    max-width:100%;
    max-height:100%;
  }
  .el-upload-list--picture-card{
    display: flex;
    justify-content: center;
    .el-upload-list__item{
      display: flex;
      align-items: center;

    }
  }

</style>


