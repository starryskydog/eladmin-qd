<template>
  <el-row>
    <el-col>
      <el-table size="mini" :data="product_inventory_warning.data" border style="width: 100%" highlight-current-row :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column label="操作" width="100" fixed>
          <template slot-scope="scope">
            <span class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;" @click="delProductInventoryWarning(scope.$index)">删除</span>
            <span class="el-tag  el-tag--mini" style="cursor: pointer;" @click="addProductInventoryWarning()">添加</span>
          </template>
        </el-table-column>
        <el-table-column v-for="(v,i) in product_inventory_warning.columns" :key="v.field" :prop="v.field" :label="v.title" :width="v.width">
          <template slot-scope="scope">
            <span >
              <el-input v-if="!v.type" v-model="productInventoryWarningList[scope.$index][v.field]" size="mini" placeholder="请输入内容" @change="((val)=>{setProductInventoryWarning(val,scope.$index,v.field)})"/>
              <el-select v-else v-model="wareHouseList[scope.$index][v.field]" size="small" style="width: 150px;" @change="((val)=>{setProductInventoryWarning(val,scope.$index,v.field)})">
                <el-option
                  v-for="(item, index) in wareHouseList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { queryWareHouseList } from '@/api/wareHouse'

export default {
  // 用来接收父组件传给子组件的数据
  props:['productInventoryWarningList'],
  data() {
    return {
      wareHouseList: [],
      product_inventory_warning: {
        sel: null,
        columns: [
          { field: 'wareHouseCode', title: '仓库编号', width: 220, type: 'select' },
          { field: 'wareHouseName', title: '仓库名称', width: 120 },
          { field: 'minimumInventory', title: '最低库存', width: 160 },
          { field: 'highestInventory', title: '最高库存', width: 160 }
        ],
        data: []
      }
    }
  },
  watch: {
    contactList: function(val) {
      this.product_inventory_warning.data = val
    }
  },
  created: function() {
    this.addProductInventoryWarning()
    this.product_inventory_warning.data = this.productInventoryWarningList
    this.queryWareHouseList()
  },
  methods: {
    setProductInventoryWarning() {
      console.log('点击仓库下拉框')
      // setProductInventoryWarning事件触发后，自动触发setProductInventoryWarningList事件
      this.$emit('setProductInventoryWarningList', this.product_inventory_warning.data)
    },
    addProductInventoryWarning() {
      let j = {
        wareHouseCode: '',
        wareHouseName: '',
        minimumInventory: '',
        highestInventory: ''
      }
      this.product_inventory_warning.data.push(j)
      this.product_inventory_warning.sel = JSON.parse(JSON.stringify(j))
    },
    delProductInventoryWarning(index) {
      if (this.product_inventory_warning.data.length > 1) {
        this.product_inventory_warning.data.splice(index, 1)
      } else {
        this.$message.warning('至少保留一项')
      }
    },
    queryWareHouseList() {
      queryWareHouseList().then(res => {
        console.log('仓库列表' + res)
        this.wareHouseList = res
      })
    }
  }
}
</script>

<style scoped>

</style>
