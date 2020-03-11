<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <h4>基本信息</h4>
        <div align="left">
          <el-button type="primary" size="mini" @click="editInfo">编辑</el-button>
        </div>
        <table
          cellspacing="0"
          cellpadding="0"
          class="el-table el-table--border"
          style="width:400px;"
        >
          <tbody>
          <tr>
            <td>供应商名称</td>
            <td>{{ farmData.name }}</td>
          </tr>
          <tr>
            <td>供应商ID</td>
            <td>{{ farmData.id }}</td>
          </tr>
          <tr>
            <td>供货种类</td>
            <td>
              <span v-for='item in categories'>{{item.name}}&nbsp;</span>
            </td>
          </tr>
          <tr>
            <td>预计收成月份</td>
            <td>{{ farmData.harvestMonth }}</td>
          </tr>
          <tr>
            <td>联系人</td>
            <td>{{ farmData.contacts }}</td>
          </tr>
          <tr>
            <td>联系方式</td>
            <td>{{ farmData.phone }}</td>
          </tr>
          <tr>
            <td>地址</td>
            <td>{{ farmData.address }}</td>
          </tr>
          <tr>
            <td>种植/生产面积</td>
            <td>{{ farmData.area }}</td>
          </tr>
          <tr>
            <td>所属业务员</td>
            <td>{{ farmData.saleMan }}</td>
          </tr>
          <tr>
            <td>标记等级</td>
            <td>{{ farmData.level }}</td>
          </tr>
          <tr>
            <td>供应商类型</td>
            <td>{{ farmData.type }}</td>
          </tr>
          <tr>
            <td>营业资质证明（营业执照）</td>
            <td>
              <el-image
                :key="farmData.licensePic"
                style="width: 80px;margin-right:10px;"
                :src="farmData.licensePic"
                fit="contain"
                :preview-src-list="[farmData.licensePic]"
              ></el-image>
            </td>
          </tr>
          <tr>
            <td>营业证明ID（社会统一信用代码）</td>
            <td>{{ farmData.licenseId }}</td>
          </tr>
          <tr>
            <td>法人身份证号码</td>
            <td>{{ farmData.legalIdNumber }}</td>
          </tr>
          <tr>
            <td>法人身份证</td>
            <td>
              <el-image
                v-for="pic in farmData.legalIdPic.split(',')"
                :key="pic"
                style="width: 80px;margin-right:10px;"
                :src="pic"
                fit="contain"
                :preview-src-list="[pic]"
              ></el-image>
            </td>
          </tr>
          <tr>
            <td>法人联系方式</td>
            <td>{{ farmData.legalPhone }}</td>
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
            <td>{{ farmData.bankAccountName }}</td>
          </tr>
          <tr>
            <td>账号</td>
            <td>{{ farmData.bankAccount }}</td>
          </tr>
          <tr>
            <td>开户银行</td>
            <td>{{ farmData.bank }}</td>
          </tr>
          </tbody>
        </table>

        <h4>备注说明</h4>
        <el-input type="textarea" v-model="farmData.memo" :disabled="true"></el-input>

        <h4>供货计划</h4>
        <div align="left">
          <el-button type="primary" size="mini" @click="editSupplyPlan">编辑</el-button>
        </div>
        <table
          cellspacing="0"
          cellpadding="0"
          class="el-table el-table--border"
          style="width:400px;"
        >
          <tbody>
          <tr>
            <td>预计下次收成时间</td>
            <td>{{ farmSupplyPlan.harvestDate }}</td>
          </tr>
          <tr>
            <td>预计产量</td>
            <td>{{ farmSupplyPlan.yield }}</td>
          </tr>
          <tr>
            <td>品类</td>
            <td>{{ farmSupplyPlan.categoryName }}</td>
          </tr>
          </tbody>
        </table>
      </el-col>
    </el-row>

    <h4>供货列表</h4>
    <el-table border :data="productList" show-summary>
      <el-table-column label="货物ID" align="center" prop="id"/>
      <el-table-column label="货物名称" align="center" prop="name"/>
      <el-table-column label="品类" align="center" prop="category_name"/>
      <el-table-column label="货物资质证明" align="center">
        <template slot-scope="scope" v-if="scope.row.pic[0]">
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
    </el-table>
    <el-button type="primary" icon="el-icon-plus" size="mini" @click="addProduct">新增一项</el-button>

    <h4>最近采购订单</h4>
    <el-table border :data="latestOrders" show-summary>
      <el-table-column label="时间" align="center" prop="createAt"/>
      <el-table-column label="数量" align="center" prop="qty"/>
      <el-table-column label="参考单价" align="center" prop="referPrice"/>
      <el-table-column label="采购单价" align="center" prop="price"/>
      <el-table-column label="总价" align="center" prop="amount"/>
      <el-table-column label="对比参考价" align="center">
        <template slot-scope="scope" v-if="scope.row.referPrice">
            <span style='color:red'>
              <span v-if="scope.row.referPrice > scope.row.price">-</span>
              <span v-if="scope.row.referPrice < scope.row.price">+</span>
              {{((scope.row.price - scope.row.referPrice)/scope.row.referPrice).toFixed(2)*100}}%
            </span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增货物 -->
    <el-dialog title="新增货物" :visible.sync="openAddProduct" width="40%">
      <el-row>
        <el-col :span="24">
          <h4>基本信息</h4>
          <table
            cellspacing="0"
            cellpadding="0"
            class="el-table el-table--border"
            style="width:500px;"
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
                <Upload v-model="product.certificatePic" @imgChange="getCertificatePic"/>
              </td>
            </tr>
            <tr>
              <td>货物图片</td>
              <td>
                <Upload v-model="product.pic" @imgChange="getGoodsPic"/>
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

    <!-- 编辑基本信息 -->
    <el-dialog title="编辑基本信息" :visible.sync="openEditBase" width="40%">
      <el-row>
        <el-col :span="24">
          <table
            cellspacing="0"
            cellpadding="0"
            class="el-table el-table--border"
            style="width:400px;"
          >
            <tbody>
            <tr>
              <td>供应商名称</td>
              <td>
                <el-input
                  v-model="farmBase.name"
                  placeholder="请输入供应商名称"
                  clearable
                  size="small"
                  style="width: 80%"
                />
              </td>
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
                <el-select  v-model="harvestMonth" multiple placeholder="请选择" style="width:80%">
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
                  v-model="farmBase.contacts"
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
                  v-model="farmBase.phone"
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
                  style="width:80%"
                  size="large"
                  :options="areaList"
                  @change="addressHandleChange">
                </el-cascader>
              </td>
            </tr>
            <tr>
              <td>详细地址</td>
              <td>
                <el-input
                  v-model="farmBase.address"
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
                  v-model="farmBase.area"
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
                <el-radio v-model="farmBase.type" label=1>企业</el-radio>
                <el-radio v-model="farmBase.type" label=2>个人</el-radio>
              </td>
            </tr>
            <tr>
              <td>营业资质证明（营业执照）</td>
              <td>
                <Upload v-model="farmBase.licensePic" @imgChange="getLicensePic"/>
              </td>
            </tr>
            <tr>
              <td>营业证明ID（社会统一信用代码）</td>
              <td>
                <el-input
                  v-model="farmBase.licenseId"
                  placeholder="请输入营业证明ID"
                  clearable
                  size="small"
                  style="width: 80%"
                />
              </td>
            </tr>
            <tr>
              <td>法人身份证号码</td>
              <td>
                <el-input
                  v-model="farmBase.legalIdNumber"
                  placeholder="请输入法人身份证号码"
                  clearable
                  size="small"
                  style="width: 80%"
                />
              </td>
            </tr>
            <tr>
              <td>法人身份证</td>
              <td>
                <div>
                  正面： <Upload @imgChange="getLegalIdPic1" name="正面"/>
                </div>
                <div style="margin-top:10px;">
                  反面：<Upload @imgChange="getLegalIdPic2" name="反面"/>
                </div>
              </td>
            </tr>
            <tr>
              <td>法人手机号</td>
              <td>
                <el-input
                  v-model="farmBase.legalPhone"
                  placeholder="请输入法人手机号"
                  clearable
                  size="small"
                  style="width: 80%"
                />
              </td>
            </tr>
            </tbody>
          </table>
          <div align="center">
            <el-button type="primary" size="medium" @click="submitFarmBase">提交</el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>

    <!-- 编辑供货计划 -->
    <el-dialog title="编辑供货计划" :visible.sync="openEditSupplyPlan" width="40%">
      <el-row>
        <el-col :span="24">
          <table
            cellspacing="0"
            cellpadding="0"
            class="el-table el-table--border"
            style="width:500px;"
          >
            <tbody>
            <tr>
              <td>预计下次收成时间</td>
              <td>
                <el-date-picker
                  v-model="supplyPlan.harvestDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </td>
            </tr>
            <tr>
              <td>预计产量</td>
              <td>
                <el-input
                  v-model="supplyPlan.yield"
                  placeholder="请输入预计产量"
                  clearable
                  size="small"
                  style="width: 80%"
                />
              </td>
            </tr>
            <tr>
              <td>品类</td>
              <td>
                <el-select v-model="supplyPlan.categoryId" clearable placeholder="请选择">
                  <el-option
                    v-for="item in categories"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </td>
            </tr>
            </tbody>
          </table>
          <div align="center">
            <el-button type="primary" size="medium" @click="submitSupplyPlan">提交</el-button>
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
    import {getFarm, updateFarm} from "@/api/farm";
    import {treeListCategory, getCategoriesByFarmId} from "@/api/category";
    import farmSupplyPlan from "@/api/farmSupplyPlan";
    import product from "@/api/product";
    import purchaseOrder from "@/api/purchaseOrder";
    import Upload from "@/components/Upload/singleUpload";
    import {regionData} from 'element-china-area-data'

    export default {
        name: "Farm",
        data() {
            return {
                // 遮罩层
                loading: true,
                // 是否显示弹出层
                openAddProduct: false,
                openEditBase: false,
                openEditSupplyPlan: false,
                // 供货商信息
                farmData: {},
                // 供货计划
                farmSupplyPlan: {'harvestDate': '', 'yield': '', 'categoryName': ''},
                // 供货商基本信息
                farmBase: {},
                categories: [],
                // 货物信息
                product: {},
                // 供货列表
                productList: [],
                // 最近采购订单
                latestOrders: [],
                // 供货种类下拉树列表
                categoryTreeselects: [],
                categoryIds: [],
                imageUrl: '',
                harvestMonth: [],
                supplyPlan: {},
                month: [{lable:'1月',value:'1月'},{lable:'2月',value:'2月'},{lable:'3月',value:'3月'},{lable:'4月',value:'4月'},
                    {lable:'5月',value:'5月'},{lable:'6月',value:'6月'},{lable:'7月',value:'7月'},{lable:'8月',value:'8月'},
                    {lable:'9月',value:'9月'},{lable:'10月',value:'10月'},{lable:'11月',value:'11月'},{lable:'12月',value:'12月'}],
                areaList: regionData,
                selectedOptions: [],
                legalIdPic1: '',
                legalIdPic2: '',
            };
        },
        components: {
            Upload
        },
        created() {
            this.getInfo();
            this.getFarmSupplyPlan();
            this.getProductList();
            this.getCategoryList();
            this.getPurchaseOrderList();
        },
        methods: {
            getCertificatePic(v) {
                this.product.certificatePic = v
            },
            getGoodsPic(v) {
                this.product.pic = v
            },
            getLicensePic(v) {
                this.farmBase.licensePic = v
            },
            getLegalIdPic1(v) {
                this.legalIdPic1 = v;
            },
            getLegalIdPic2(v) {
                this.legalIdPic2 = v;
            },
            addressHandleChange(value) {
                this.selectedOptions = value;
            },
            /** 查询销售订单详情*/
            getInfo() {
                var id = this.$route.query.id;
                getFarm(id).then(
                    response => {
                        this.farmData = response.data;
                    }
                );
                getCategoriesByFarmId(id).then(
                    response => {
                        this.categories = response.data.categories;
                    }
                );

            },
            /** 获得农场的供货计划 */
            getFarmSupplyPlan() {
                var id = this.$route.query.id;
                farmSupplyPlan.list({farmId: id}).then(response => {
                    if (response.rows.length > 0) {
                        this.farmSupplyPlan = response.rows[0];
                    }
                });
            },
            /** 获得农场的供货列表 */
            getProductList() {
                var id = this.$route.query.id;
                product.list({farmId: id}).then(response => {
                    response.rows.forEach(item => {
                        item.pic = item.pic ? item.pic.split(",") : []
                        item.certificate_pic = item.certificate_pic ? item.certificate_pic.split(",") : []
                        this.productList.push(item)
                    })
                });
            },
            /** 获得农场的最近采购订单列表 */
            getPurchaseOrderList() {
                var id = this.$route.query.id;
                purchaseOrder.list({farmId: id, pageNum: 1, pageSize: 10}).then(response => {
                    this.latestOrders = response.rows;
                });
            },
            /** 查询供货种类下拉树列表 */
            getCategoryList() {
                treeListCategory().then(
                    response => {
                        this.categoryTreeselects = response.data.treeSelects;
                    }
                );
            },
            /** 新增货物 */
            addProduct() {
                this.product = {};
                this.categoryIds = [];
                this.openAddProduct = true;
            },
            /** 提交新增货物 */
            submitProduct() {
                this.product.farmId = this.$route.query.id;
                this.product.categoryId = this.categoryIds[this.categoryIds.length - 1];
                product.post(this.product).then(response => {
                    this.openAddProduct = false;
                    if (response.code == 200) {
                        this.$notify({
                            title: '成功',
                            message: '提交新增货物成功',
                            type: 'success'
                        });
                        this.getProductList();
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '提交新增货物失败'
                        });
                    }
                })
            },
            /** 编辑基本信息 */
            editInfo() {
                this.farmBase = JSON.parse(JSON.stringify(this.farmData)),
                this.farmBase.type=`${this.farmBase.type}`;
                    this.harvestMonth = this.farmBase.harvestMonth.split(',');
                this.categories.forEach(item => {
                    // this.categoryIds.push(item.id);
                });
                this.openEditBase = true;
            },
            /** 提交基本信息 */
            submitFarmBase() {
                this.farmBase.legalIdPic = this.legalIdPic1 + ',' + this.legalIdPic2;
                this.farmBase.provinceId = this.selectedOptions[0];
                this.farmBase.cityId = this.selectedOptions[1];

                if (this.harvestMonth) {
                    var harvestMonthStr = '';
                    for (var i = 0; i < this.harvestMonth.length; i++) {
                        if (i == 0) {
                            harvestMonthStr = this.harvestMonth[i];
                        } else {
                            harvestMonthStr += (',' + this.harvestMonth[i])
                        }
                    }
                    this.farmBase.harvestMonth = harvestMonthStr;
                }
                if (this.categoryIds.length) {
                    this.farmBase.categoryIds = [];
                    this.categoryIds.forEach(item => {
                        this.farmBase.categoryIds.push(item[item.length - 1]);
                    })
                }

                updateFarm(this.farmBase).then(
                    response => {
                        this.openEditBase = false;
                        this.harvestMonth = [];
                        if (response.code == 200) {
                            this.$notify({
                                title: '成功',
                                message: '提交基本信息成功',
                                type: 'success'
                            });
                            this.getInfo();
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: '提交新增货物失败'
                            });
                        }
                    }
                )
            },
            /** 上传图片 */
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            /** 编辑供货计划 */
            editSupplyPlan() {
                this.supplyPlan = JSON.parse(JSON.stringify(this.farmSupplyPlan)),
                    this.openEditSupplyPlan = true;
            },
            /** 提交供货计划 */
            submitSupplyPlan() {
                if (this.supplyPlan.id) {
                    farmSupplyPlan.put(this.supplyPlan).then(response => {
                        this.openEditSupplyPlan = false;
                        if (response.code == 200) {
                            this.$notify({
                                title: '成功',
                                message: '提交供货计划成功',
                                type: 'success'
                            });
                            this.getFarmSupplyPlan();
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: '提交供货计划失败'
                            });
                        }
                    });
                } else {
                    this.supplyPlan.farmId = this.$route.query.id;
                    farmSupplyPlan.post(this.supplyPlan).then(response => {
                        this.openEditSupplyPlan = false;
                        if (response.code == 200) {
                            this.$notify({
                                title: '成功',
                                message: '提交供货计划成功',
                                type: 'success'
                            });
                            this.getFarmSupplyPlan();
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: '提交供货计划失败'
                            });
                        }
                    });
                }

            }
        }
    };
</script>
