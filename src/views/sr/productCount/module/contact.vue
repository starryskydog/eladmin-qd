<template>
  <el-row>
    <el-col>
        <el-table size="mini" :data="dataList" border style="width: 100%" highlight-current-row
                  :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
          <el-table-column v-for="(v,i) in master_user.columns" :key="v.field" :prop="v.field" :label="v.title"
                           :width="v.width">
            <template slot-scope="scope">

                            <span v-if="v.field!='productName'&&v.field!='productCategoryName'&&v.field!='productSeriesName'">
                                <el-input size="mini" placeholder="请输入内容"
                                          v-model="master_user.data[scope.$index][v.field]"
                                          @change="((val)=>{setContact(val,scope.$index,v.field)})"
                                          :disabled="v.disabled" @focus="handleFocus(v.field)">
                                </el-input>
                            </span>
                            <span v-else>
                              {{master_user.data[scope.$index][v.field]}}
                            </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" fixed>
            <template slot-scope="scope">
              <el-button
                class="filter-item"
                size="mini"
                :disabled="scope.$index==key?false:true"
                type="primary"
                >保存
              </el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    props: ['dataList'],
    data() {
      return {
        master_user: {
          sel: null,//选中行
          columns: [
            {field: "productName", title: "产品名称"},
            {field: "productCategoryName", title: "产品类别"},
            {field: "productSeriesName", title: "产品系列"},
            {field: "mpNumber", title: "毛坯数量"},
            {field: "hjNumber", title: "焊接数量"},
            {field: "bjcNumber", title: "半精车数量"},
            {field: "cmNumber", title: "粗磨数量"},
            {field: "jcNumber", title: "精车数量"},
            {field: "jmNumber", title: "精磨数量"},
            {field: "dphNumber", title: "动平衡数量"},
            {field: "totalNumber", title: "总数量"},
          ],
          data: [],
        },
        key:null,
        showBtn: false,
        type:'product',index:null,
      }
    },
    created: function () {
    },
    watch: {
      dataList: function (val) {
        this.$set(this.master_user,'data',val)
      }
    },
    methods: {
      setContact(data,index,field) {
        this.key=index
        this.$set(this.master_user.data,field,data)

      },
      handleSet(data){
        data.productName=data.name;
        this.$set(this.master_user.data, this.key, data)
        this.$emit('setContacts', this.master_user.data)
      },
      handleFocus(field) {
        if (field === 'productCode') {
          this.showBtn = true
        } else {
          this.showBtn = false
        }
      }
    }
  }
</script>

<style scoped>

</style>
