<template>
  <el-dialog :title="getData('userManagementDialog').type == 'add' ?'新增管理员':'修改密码'"
             :visible.sync="getData('userManagementDialog').isShow"
             width="500px"
             center>
    <el-form :model="getData('userManagementDialog')"
             label-width="100px">
      <el-row>
        <el-col :span="20">
          <el-form-item label="手机号:">
            <el-input v-model="getData('userManagementDialog').phone"
                      @input="phoneChange"
                      maxlength="11"
                      :disabled="getData('userManagementDialog').type == 'edit'" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="密码:">
            <el-input v-model="getData('userManagementDialog').password" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="昵称:">
            <el-input v-model="getData('userManagementDialog').nickName" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="handleClick('close')">取消</el-button>
      <el-button type="primary"
                 @click="handleClick('sure')">确 定</el-button>
    </span>
  </el-dialog>

</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import { addList, editList } from '@/api/customerManagement'
export default {
  name: 'dialogTip',
  computed: {
    ...mapGetters('userManagement', ['getData']),
  },
  data () {
    return {
      isClick: true
    }
  },
  methods: {
    ...mapMutations('userManagement', ['setData']),
    phoneChange (v) {
      if (!!v) {
        let newValNum = v.replace(/[^0-9]/ig, "");
        this.setData({          key: 'userManagementDialog', value: {
            isShow: true, //是否显示dialog
            phone: newValNum, //手机号
            nickName: this.getData('userManagementDialog').nickName, //昵称
            password: this.getData('userManagementDialog').password, //密码
            type: this.getData('userManagementDialog').type
          }        })
      }
    },
    handleClick (type = 'close') {
      if (this.isClick) {
        this.isClick = false
        let clickType = {
          'close': () => {
            this.setData({              key: 'userManagementDialog', value: {
                isShow: false, //是否显示dialog
                phone: '', //手机号
                nickName: '', //昵称
                password: '', //密码
                type: 'add'
              }            })
            this.isClick = true
            console.log(this.getData('userManagementDialog'))
          },
          'sure': () => {
            if (this.getData('userManagementDialog').type === 'add') {
              // 新增
              addList({
                nickname: this.getData('userManagementDialog').nickName,
                password: this.getData('userManagementDialog').password,
                phoneNumber: this.getData('userManagementDialog').phone
              }).then(res => {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                });

                this.setData({                  key: 'userManagementDialog', value: {
                    isShow: false, //是否显示dialog
                    phone: '', //手机号
                    nickName: '', //昵称
                    password: '', //密码
                    type: 'add'
                  }                })
                this.$parent.query()
                this.isClick = true

              }).catch(err => {
                this.isClick = true
              })
            } else {
              // 修改
              editList({
                id: this.getData('userManagementDialog').id,
                nickname: this.getData('userManagementDialog').nickName,
                password: this.getData('userManagementDialog').password,
                phoneNumber: this.getData('userManagementDialog').phone,
                state: this.getData('userManagementDialog').state
              }).then(res => {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.setData({                  key: 'userManagementDialog', value: {
                    isShow: false, //是否显示dialog
                    phone: '', //手机号
                    nickName: '', //昵称
                    password: '', //密码
                    type: 'add'
                  }                })
                this.$parent.query()
                this.isClick = true

              }).catch(err => {
                this.isClick = true
              })

            }

          }
        }[type]
        clickType.call(this)
      }
    }
  }
}
</script>