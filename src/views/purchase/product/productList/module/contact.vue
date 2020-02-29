<template>
  <el-row>
    <el-col>
      <eForm ref="eform" :formType="type" :itemList="itemList" @setContact="handleSet" :productList="dataList" :checkedList="master_user.data"/>
        <el-table size="mini" :data="master_user.data" border style="width: 100%" highlight-current-row
                  :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" show-summary
                  :summary-method="getSummaries">
          <el-table-column v-for="(v,i) in master_user.columns" :key="v.field" :prop="v.field" :label="v.title"
                           :width="v.width">
            <template slot-scope="scope">
                            <span>
                                <el-input size="mini" placeholder="请输入内容"
                                          v-model="master_user.data[scope.$index][v.field]"
                                          @change="((val)=>{setContact(val,scope.$index,v.field)})"
                                          :disabled="v.disabled" @focus="handleFocus(v.field)">
                                  <span class="el-tag  el-tag--mini" v-if="v.field==='productCode'&&showBtn"
                                        slot="suffix" style="cursor: pointer;margin-top: 4px"
                                        @click="addCode(scope.$index)">
                                选择
                            </span>
                                </el-input>
                            </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" fixed>
            <template slot-scope="scope">
            <span class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;" @click="del(scope.$index)">
                                删除
                            </span>
              <span class="el-tag  el-tag--mini" style="cursor: pointer;"
                    @click="addMasterUser()">
                                添加
                            </span>
            </template>
          </el-table-column>
        </el-table>
    </el-col>
  </el-row>
</template>

<script>
  import eForm from '../form'
  export default {
    props: ['dataList','itemList'],
    components: {eForm},
    data() {
      return {
        master_user: {
          sel: null,//选中行
          columns: [
            {field: "productCode", title: "产品编号", width: 220},
            {field: "productName", title: "名称", width: 160},
            {field: "productNumber", title: "产品数量", width: 120},
            {field: "specifications", title: "产品规格", width: 180},
            {field: "unitPrice", title: "单价", width: 120},
            {field: "remark", title: "备注"},
          ],
          data: [],
        },
        showBtn: false,
        type:'product',index:null,
      }
    },
    created: function () {
      this.master_user.data = this.dataList
    },
    watch: {
      dataList: function (val) {
        this.master_user.data = val
      },
    },
    methods: {
      setContact() {
        this.$emit('setContacts', this.master_user.data)
      },
      handleSet(data){
        data.productName=data.name
        data.productId=data.id
        this.master_user.data.push(data)
        this.master_user.data.splice(this.master_user.data.findIndex(item => item.productCode === ''), 1)
        this.$emit('setContacts', this.master_user.data)
      },
      handleFocus(field) {
        if (field === 'productCode') {
          this.showBtn = true
        } else {
          this.showBtn = false
        }
      },
      //添加账号
      addMasterUser() {
        let j = {
          productCode: "",
          productName: "",
          productNumber: "",
          specifications:'',
          unitPrice:'',
          remark: "",
        };
        this.master_user.data.push(j);
      },
      del(index) {
        if (this.master_user.data.length > 1) {
          this.master_user.data.splice(index, 1);
        } else {
          this.$message.warning("至少保留一项");
        }
      },
      addCode() {
        this.$refs.eform.dialog = true
        this.$refs.eform.dataType = 'product'
      },
      getSummaries(param) {
        const {columns, data} = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计'
          } else if (index === 3) {
            const values = data.map(item => Number(item[column.property]))
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr)
                if (!isNaN(value)) {
                  return prev + curr
                } else {
                  return prev
                }
              }, 0)
            } else {
              sums[index] = '0'
            }
          } else {
            sums[index] = '--'
          }
        })
        return sums
      }
    }
  }
</script>

<style scoped>

</style>
