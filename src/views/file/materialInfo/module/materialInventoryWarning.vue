<template>
  <el-row>
    <el-col>
      <el-table size="mini" :data="material_inventory_warning.data" border style="width: 100%" highlight-current-row :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column label="操作" width="100" fixed>
          <template slot-scope="scope">
            <span class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;" @click="delMaterialInventoryWarning(scope.$index)">删除</span>
            <span class="el-tag  el-tag--mini" style="cursor: pointer;" @click="addMaterialInventoryWarning()">添加</span>
          </template>
        </el-table-column>
        <el-table-column v-for="(v,i) in material_inventory_warning.columns" :key="v.field" :prop="v.field" :label="v.title" :width="v.width">
          <template slot-scope="scope">
            <span >
              <el-input v-if="!v.type" v-model="materialInventoryWarningList[scope.$index][v.field]" size="mini" placeholder="请输入内容" @change="((val)=>{setMaterialInventoryWarning(val,scope.$index,v.field)})"/>
              <el-select v-else v-model="materialInventoryWarningList[scope.$index][v.field]" size="small" style="width: 180px;" @change="((val)=>{setMaterialInventoryWarning(val,scope.$index,v.field)})">
                <el-option
                  v-for="(item, index) in wareHouseList"
                  :key="item.id"
                  :label="item.wareHouseCode"
                  :value="item.wareHouseCode"/>
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
  props:['materialInventoryWarningList'],
  data() {
    return {
      wareHouseList: [],
      wareHouseId: '',
      material_inventory_warning: {
        sel: null,
        columns: [
          { field: 'wareHouseCode', title: '仓库编号', width: 180, type: 'select' },
          { field: 'wareHouseName', title: '仓库名称', width: 120 },
          { field: 'minimumInventory', title: '最低库存', width: 160 },
          { field: 'highestInventory', title: '最高库存', width: 160 }
        ],
        data: []
      }
    }
  },
  watch: {
    materialInventoryWarningList: function(val) {
      this.material_inventory_warning.data = val
    }
  },
  created: function() {
    this.addMaterialInventoryWarning()
    this.material_inventory_warning.data = this.materialInventoryWarningList
    this.queryWareHouseList()
  },
  methods: {
    setMaterialInventoryWarning(val,i) {
      var list = this.wareHouseList.filter(item => {
        return item.wareHouseCode === val
      })
      this.materialInventoryWarningList[i].wareHouseName = list[0].name
      this.$emit('setMaterialInventoryWarning', this.material_inventory_warning.data)
    },
    addMaterialInventoryWarning() {
      let j = {
        wareHouseCode: '',
        wareHouseName: '',
        minimumInventory: '',
        highestInventory: ''
      }
      this.material_inventory_warning.data.push(j)
      this.material_inventory_warning.sel = JSON.parse(JSON.stringify(j))
    },
    delMaterialInventoryWarning(index) {
      if (this.material_inventory_warning.data.length > 1) {
        this.material_inventory_warning.data.splice(index, 1)
      } else {
        this.$message.warning('至少保留一项')
      }
    },
    queryWareHouseList() {
      queryWareHouseList().then(res => {
        this.wareHouseList = res
        console.log(this.wareHouseList)
      })
    }
  }
}
</script>

<style scoped>

</style>
