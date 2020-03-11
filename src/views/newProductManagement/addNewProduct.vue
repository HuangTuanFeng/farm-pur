<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="formData" :rules="rules" ref="salesFrom"  label-width="150px"
             size="small">
      <el-form-item label="货物名称：" prop="name">
        <el-input v-model="formData.name" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="品类：" prop="categoryId">
        <el-input v-model="formData.categoryId" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="货物图片：" prop="pic" class="input-width">
        <single-upload @imgChange="getImgUrl"></single-upload>
      </el-form-item>
      
      <el-form-item label="需求时间：" >
        <el-radio-group v-model="radioVal">
          <el-radio :label="1">周期</el-radio>
          <el-radio :label="0">具体日期</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" prop="orderNum" v-show="priodFlag">
            每
              <el-input-number v-model="formData.period" controls-position="right" :min="0" />
              天
      </el-form-item>
      <el-form-item label="" v-show="!priodFlag">
            <el-date-picker
              class="input-width"
              v-model="formData.date"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
      </el-form-item>
      <el-form-item label="预计用量：" prop="volume">
        <el-input v-model.number="formData.volume" class="input-width"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('salesFrom')">提交</el-button>
        <el-button @click="resetForm('salesFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {addProductDemand} from '@/api/newProductManagement'
  import SingleUpload from '@/components/Upload/singleUpload'
 
  export default {
    name: 'AddNewProduct',
    components:{SingleUpload},
    data() {
      return {
        priodFlag:true,
        radioVal:1,
        formData:{},
        rules: {
          name: [
            {required: true, message: '货物名称', trigger: 'blur'},
          ],
          categoryId: [
            {required: true, message: '请输入品类', trigger: 'blur'}
          ],
          pic: [
            {required: true, message: '请输入品类', trigger: 'change'}
          ],
          volume: [
            {type: 'number', message: '请输入预计用量'}
          ],
        }
      }
    },
    created() {
     
    },
    watch:{
      radioVal(newVal){
        if(newVal==1){
          this.priodFlag=true
        }else{
          this.priodFlag=false
        }
      }
    },
    methods: {
    getImgUrl(data){
      this.formData.pic=data;
    },  
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              addProductDemand(this.formData).then(response => {
                  this.$refs[formName].resetFields();
                  this.formData = {};
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                });
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.formData = Object.assign({},defaultformData);
      }
    }
  }
</script>
<style>
.input-width{
  width: 60%;
}
</style>


