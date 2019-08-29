<template>
  <el-row>
    <el-col>
      <eForm ref="eform" :formType="type" @setContact="handleSet"/>
      <el-table size="mini" :data="master_user.data" border style="width: 100%" highlight-current-row
                :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" show-summary
                :summary-method="getSummaries">
        <el-table-column v-for="(v,i) in master_user.columns" :key="v.field" :prop="v.field" :label="v.title"
                         :width="v.width">
          <template slot-scope="scope">
                            <span>
                              <span v-if="v.field==='allMoney'">
                                {{dataList[scope.$index].allMoney}}
                              </span>
                                <el-input v-else size="mini" placeholder="请输入内容"
                                          v-model="dataList[scope.$index][v.field]"
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
    props: ['dataList'],
    components: {eForm},
    data() {
      return {
        master_user: {
          sel: null,//选中行
          columns: [
            {field: "productCode", title: "产品编号", width: 220},
            {field: "productName", title: "产品名称", width: 120},
            {field: "specifications", title: "规格", width: 160},
            {field: "unitPrice", title: "*单价", width: 100},
            {field: "productNumber", title: "*数量", width: 100,},
            {field: "allMoney", title: "销售金额", width: 120, disabled: true},
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
      setContact(val, index, field) {
        if (field === 'unitPrice' || 'productNumber') {
          this.master_user.data[index].allMoney = this.master_user.data[index].unitPrice * this.master_user.data[index].productNumber
        }
        this.$emit('setContacts', this.master_user.data)
      },
      handleSet(data){
        this.master_user.data[this.index].productCode=data.productCode
        this.master_user.data[this.index].productName=data.name
        this.master_user.data[this.index].specifications=data.specifications
        this.master_user.data[this.index].unitPrice=data.unitPrice
        this.master_user.data[this.index].productId=data.id
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
          specifications: "",
          unitPrice: "",
          productNumber: "",
          allMoney: "",
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
      addCode(index) {
        this.$refs.eform.dialog = true
        this.$refs.eform.dataType = 'product'
        this.index=index
      },
      getSummaries(param) {
        const {columns, data} = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计'
          } else if (index === 5 || index === 6) {
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
              sums[index] = 'N/A'
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
