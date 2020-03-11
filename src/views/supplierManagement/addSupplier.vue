<template>
    <div class="app-container">
        <el-row>
        <el-col :span="12">
          <h4>基本信息</h4>
          <table
            cellspacing="0"
            cellpadding="0"
            class="el-table el-table--border"
            style="width:400px;"
          >
            <tbody>
              <tr>
                <td>供应商名称</td>
                <td><el-input
                    v-model="farmBaseInfo.name"
                    placeholder="请输入供应商名称"
                    clearable
                    size="small"
                    style="width: 80%"
                    /></td>
              </tr>
              <tr>
                <td>供货种类</td>
                <td>
                    <el-cascader
                    v-model="categoryIds"
                    :props="{ multiple: true, checkStrictly: true }"
                    :options="categoryTreeselects"
                    :show-all-levels="false"
                    clearable
                    style="width:80%"
                    ></el-cascader>
                </td>
              </tr>
              <tr>
                <td>预计收成月份</td>
                <td>
                  <el-select v-model="harvestMonth" multiple placeholder="请选择" style="width:80%">
                  <el-option
                    v-for="item in month"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </td>
              </tr>
              <tr>
                <td>联系人</td>
                <td>
                  <el-input
                    v-model="farmBaseInfo.contacts"
                    placeholder="请输入联系人名称"
                    clearable
                    size="small"
                    style="width: 80%"
                    />
                </td>
              </tr>
              <tr>
                <td>联系人手机号</td>
                <td>
                  <el-input
                    v-model="farmBaseInfo.phone"
                    placeholder="请输入联系人手机号"
                    clearable
                    size="small"
                    style="width: 80%"
                    />
                </td>
              </tr>
              <tr>
                <td>所在地区</td>
                <td>
                  <el-cascader
                    size="large"
                    :options="areaList"
                    @change="addressHandleChange"
                    style="width:80%"
                  >
                  </el-cascader>
                </td>
              </tr>
              <tr>
                <td>详细地址</td>
                <td>
                  <el-input
                    v-model="farmBaseInfo.address"
                    placeholder="请输入详细地址"
                    clearable
                    size="small"
                    style="width: 80%"
                    />
                </td>
              </tr>
              <tr>
                <td>供应商面积</td>
                <td>
                  <el-input
                    v-model="farmBaseInfo.area"
                    placeholder="请输入供应商面积"
                    clearable
                    size="small"
                    style="width: 80%"
                    />
                </td>
              </tr>
              <tr>
                <td>供应商类型</td>
                <td>
                  <el-radio v-model="farmBaseInfo.type" label="1">企业</el-radio>
                  <el-radio v-model="farmBaseInfo.type" label="2">个人</el-radio>
                </td>
              </tr>
              <tr v-if="farmBaseInfo.type == '1'">
                <td>营业资质证明（营业执照）</td>
                <td>
                  <single-upload v-model="farmBaseInfo.licensePic" @imgChange="getLicensePicUrl" />
                </td>
              </tr>
              <tr v-if="farmBaseInfo.type == '1'">
                <td>营业证明ID（社会统一信用代码）</td>
                <td>
                  <el-input
                    v-model="farmBaseInfo.licenseId"
                    placeholder="请输入营业证明ID"
                    clearable
                    size="small"
                    style="width: 80%"
                    />
                </td>
              </tr>
              <tr>
                <td><span v-if="farmBaseInfo.type == '1'">法人身份证号码</span>
                <span v-if="farmBaseInfo.type == '2'">负责人身份证号码</span></td>
                <td>
                  <el-input
                    v-model="farmBaseInfo.legalIdNumber"
                    placeholder="请输入身份证号码"
                    clearable
                    size="small"
                    style="width: 80%"
                    />
                </td>
              </tr>
              <tr>
                <td><span v-if="farmBaseInfo.type == '1'">法人身份证</span>
                <span v-if="farmBaseInfo.type == '2'">负责人身份证</span></td>
                <td>
                  <div>
                    正面：<single-upload v-model="idCardPicR" @imgChange="getLegalIdRPicUrl" />
                  </div>
                  <div style="margin-top:10px;">
                    反面：<single-upload v-model="idCardPicL" @imgChange="getLegalIdLPicUrl" />
                  </div>
                </td>
              </tr>
              <tr>
                <td><span v-if="farmBaseInfo.type == '1'">法人手机号</span>
                <span v-if="farmBaseInfo.type == '2'">负责人手机号</span></td>
                <td>
                  <el-input
                    v-model="farmBaseInfo.legalPhone"
                    placeholder="请输入手机号"
                    clearable
                    size="small"
                    style="width: 80%"
                    />
                </td>
              </tr>
            </tbody>
          </table>
        </el-col>
        <el-col :span="12">
          <h4>结算信息</h4>
          <table
            cellspacing="0"
            cellpadding="0"
            class="el-table el-table--border"
            style="width:400px;"
          >
            <tbody>
              <tr>
                <td>银行卡户名</td>
                <td>
                  <el-input
                    v-model="farmBaseInfo.bankAccountName"
                    placeholder="请输入银行卡户名"
                    clearable
                    size="small"
                    style="width: 80%"
                    />
                </td>
              </tr>
              <tr>
                <td>账号</td>
                <td>
                  <el-input
                    v-model="farmBaseInfo.bankAccount"
                    placeholder="请输入账号"
                    clearable
                    size="small"
                    style="width: 80%"
                    />
                </td>
              </tr>
              <tr>
                <td>开户银行</td>
                <td>
                  <el-input
                    v-model="farmBaseInfo.bank"
                    placeholder="请输入开户银行"
                    clearable
                    size="small"
                    style="width: 80%"
                    />
                </td>
              </tr>
            </tbody>
          </table>

          <h4>备注说明</h4>
          <el-input type="textarea" v-model="farmBaseInfo.memo" ></el-input>
        </el-col>
      </el-row>

      <h4>采购货物列表</h4>
      <el-table border :data="productList" show-summary>
        <el-table-column label="货物名称" align="center" prop="name" />
        <el-table-column label="品类" align="center" :formatter="getCategoryName"/>
        <el-table-column label="单位" align="center" prop="unit" />
        <el-table-column label="货物资质证明" align="center" >
          <template slot-scope="scope" v-if="scope.row.certificatePic">
            <el-image
              v-for="pic in scope.row.certificatePic.split(',')"
              :key="pic"
              style="width: 80px;margin-right:10px;"
              :src="pic"
              fit="contain"
              :preview-src-list="[pic]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="货物图片" align="center">
          <template slot-scope="scope" v-if="scope.row.pic">
            <el-image
              v-for="pic in scope.row.pic.split(',')"
              :key="pic"
              style="width: 80px;margin-right:10px;"
              :src="pic"
              fit="contain"
              :preview-src-list="[pic]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="80" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="deleteByIndex(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="addProduct">新增一项</el-button>

      <div align="center">
        <el-button type="primary" size="medium" @click="submitFarm">提交</el-button>
      </div>

    <!-- 新增货物 -->
    <el-dialog title="新增货物" :visible.sync="open" width="40%">
      <el-row>
        <el-col :span="24">
          <h4>基本信息</h4>
          <table
            cellspacing="0"
            cellpadding="0"
            class="el-table el-table--border"
            style="width:100%;"
          >
            <tbody>
              <tr>
                <td>货物名称</td>
                <td>
                  <el-input
                    v-model="product.name"
                    placeholder="请输入货物名称"
                    clearable
                    size="small"
                    style="width: 80%"
                    />
                </td>
              </tr>
              <tr>
                <td>品类</td>
                <td>
                  <el-select v-model="product.categoryId" clearable placeholder="请选择">
                    <el-option
                      v-for="item in categories"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>单位</td>
                <td>
                  <el-input
                    v-model="product.unit"
                    placeholder="请输入单位"
                    clearable
                    size="small"
                    style="width: 80%"
                    />
                </td>
              </tr>
              <tr>
                <td>货物资质证明</td>
                <td>
                  <single-upload v-model="product.certificatePic" @imgChange="getProductCertificatePicUrl" />
                </td>
              </tr>
              <tr>
                <td>货物图片</td>
                <td>
                  <single-upload v-model="product.pic" @imgChange="getProductPicUrl" />
                </td>
              </tr>
            </tbody>
          </table>
          <div align="center">
            <el-button type="primary" size="medium" @click="submitProduct">提交</el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
  padding: 0 30px 30px 30px;
  min-height: 100%;
}
/deep/ .el-table {
  td {
    text-align: center;
  }
}
</style>

<script>
import { listFarm, addFarm } from "@/api/farm";
import { treeListCategory, listCategory } from "@/api/category";
import SingleUpload from "@/components/Upload/singleUpload";
import {regionData} from 'element-china-area-data'

export default {
  name: "Farm",
  components: {
    SingleUpload
  },
  data() {
    return {
      // 是否显示弹出层
      open: false,
      // 供货种类下拉树列表
      categoryTreeselects: [],
      categoryList: [],
      // 供货商信息
      farmBaseInfo: {'type':'1'},
      // 货物信息
      product: {},
      // 供货列表
      productList: [],
      // 选中的品类
      categoryIds: [],
      // 基本信息的品类
      categories: [],
      idCardPicR: '',
      idCardPicL: '',
      harvestMonth: [],
      imageUrl: '',
      month: [{lable:'1月',value:'1月'},{lable:'2月',value:'2月'},{lable:'3月',value:'3月'},{lable:'4月',value:'4月'},
      {lable:'5月',value:'5月'},{lable:'6月',value:'6月'},{lable:'7月',value:'7月'},{lable:'8月',value:'8月'},
      {lable:'9月',value:'9月'},{lable:'10月',value:'10月'},{lable:'11月',value:'11月'},{lable:'12月',value:'12月'}],
      areaList: regionData,
      selectedOptions: [],
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
      addressHandleChange(value) {
          this.selectedOptions = value;
      },
    /** 查询供货种类下拉树列表 */
    getCategoryList() {
      treeListCategory().then(
        response => {
          this.categoryTreeselects = response.data.treeSelects;
        }
      );
      listCategory().then(
        response => {
          this.categoryList = response.data.categoryList;
        }
      );
    },
    /** 新增货物 */
    addProduct() {
      this.product = {};
      this.open = true;
    },
    /** 获得品类名称 */
    getCategoryName(row) {
      var c = this.categoryList.find(
              c => c.id == row.categoryId
            );
      if (c) {
        return c.name;
      }
    },
    /** 提交新增货物 */
    submitProduct() {
      if(! this.product.categoryId) {
        this.$notify.error({
              title: '错误',
              message: '请选择货物品类'
            });
            return;
      }
      this.productList.push(this.product);
      this.open = false;
      this.product = {};
    },
    /** 从供应商的货物列表删除货物*/
    deleteByIndex(row) {
      this.productList.splice(this.productList.indexOf(row),1);
    },
    // 上传回调
    getLicensePicUrl(data) {
      this.farmBaseInfo.licensePic = data;
    },
    getLegalIdRPicUrl(data) {
      this.idCardPicR = data;
      this.farmBaseInfo.legalIdPic = data;
    },
    getLegalIdLPicUrl(data) {
      this.idCardPicL = data;
      this.farmBaseInfo.legalIdPic += (',' + data);
    },
    getProductCertificatePicUrl(data) {
      this.product.certificatePic = data;
    },
    getProductPicUrl(data) {
      this.product.pic = data;
    },
    /** 提交供应商信息 */
    submitFarm() {
      this.farmBaseInfo.provinceId = this.selectedOptions[0];
      this.farmBaseInfo.cityId = this.selectedOptions[1];
      if (this.harvestMonth) {
        var harvestMonthStr = '';
        for(var i=0;i< this.harvestMonth.length;i++) {
          if (i == 0) {
            harvestMonthStr = this.harvestMonth[i];
          } else {
            harvestMonthStr += (',' + this.harvestMonth[i])
          }
        }
        this.farmBaseInfo.harvestMonth = harvestMonthStr;
      }
      if(this.categoryIds.length) {
        this.farmBaseInfo.categoryIds = [];
        this.categoryIds.forEach(item =>{
          this.farmBaseInfo.categoryIds.push(item[item.length - 1]);
        })
      }
      if (this.productList) {
        this.farmBaseInfo.products = this.productList;
      }
      console.log(55)
      console.log(this.farmBaseInfo)
      addFarm(this.farmBaseInfo).then(
        response => {
          if(response.code ==200) {
            this.farmBaseInfo = {'type':'1'};
            this.productList = [];
            this.harvestMonth = [];
            this.categoryIds = [];
            this.$notify({
              title: '成功',
              message: '提交供应商信息成功',
              type: 'success'
            });
          } else {
            this.$notify.error({
              title: '错误',
              message: '提交供应商信息失败'
            });
          }
        }
      );
    }
  },
  watch: {
    categoryIds(val, newval) {
      this.categories = [];
      this.categoryIds.forEach(item => {
        var c = this.categoryList.find(
              c => c.id == item[item.length - 1]
            );
        this.categories.push({'id':c.id,'name':c.name})
      })
    }
  }
};
</script>
