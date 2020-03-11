<template>
  <div class="upload-container">
    <el-upload class="avatar-uploader"
               action=""
               :show-file-list="false"
               :http-request="uploadRequest"
               :on-preview="handlePictureCardPreview"
               :on-remove="handleRemove">
       <span v-if="imageUrl" class="el-upload-action" @click.stop="handleRemove()">
                    <i class="el-icon-delete"></i>
                </span>
      <img v-if="imageUrl"
           :src="imageUrl"
           class="avatar">
      <i v-else
         class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <!--大图弹出框-->
    <el-dialog :visible.sync="imgDialogVisible" size="full" :modal="false" title="查看大图片">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
    import {ossImg} from '@/api/common'
    import {getCookie} from '@/utils/auth'

    export default {
        props: {
            image_uri: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                dialogImageUrl: '',
                imgDialogVisible: false,
                fileLists: [],

            };
        },
        computed: {
            imageUrl() {
                return this.image_uri
            }
        },
        methods: {
            // 移除图片
            handleRemove() {
                this.image_uri = ''
            },
            //查看大图
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.imgDialogVisible = true;
            },
            //图片上传成功
            success(response, file, fileList) {
                this.fileLists = [];
                this.fileLists = [file]
                this.form.logo = file.response.result;
            },
            //转base64
            getBase64Img(img) {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.width, img.height);
                var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
                var dataURL = canvas.toDataURL("image/" + ext);
                return dataURL;
            },
            async uploadRequest(v) {
                const file = v.file,
                    fileType = file.type,
                    isImage = fileType.indexOf("image") != -1

                let image = new Image();
                image.src = window.URL.createObjectURL(file);
                image.onload = () => {
                    const base64 = this.getBase64Img(image);
                    this.image_uri = base64
                    this.$emit('imgChange', base64)

                };

                return;
                if (!isImage) {
                    this.$message.error("只能上传图片格式png、jpg、gif!");
                    return;
                }
                const form = new FormData();
                form.append("file", file);
                await ossImg(form).then(res => {
                    // this.image_uri = res
                    this.$emit('imgChange', res)
                })

            }
        }
    }
</script>
<style lang="scss">
  .upload-container {
    .avatar-uploader {
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }

      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }

      .avatar {
        height: 178px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
</style>
