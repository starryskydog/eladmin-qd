<template>
  <div class="linkage">
    <div v-for="(v, i) in addressList" :key="i" style="margin-bottom: 20px">
      <span class="label">
        联系地址{{i+1}}：
      </span>
      <el-select
        v-model="v.province"
        size="small"
        style="width: 100px"
        @change="((val)=>{choseProvince(val, i)})"
        placeholder="省级地区">
        <el-option
          v-for="item in provinceList"
          :key="item.id"
          :label="item.value"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select
        v-model="v.city"
        size="small"
        style="width: 100px"
        @change="((val)=>{choseCity(val,i)})"
        placeholder="市级地区">
        <el-option
          v-for="item in shi1"
          :key="item.id"
          :label="item.value"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select
        v-model="v.area"
        size="small"
        style="width: 100px"
        @change="((val)=>{choseBlock(val,i)})"
        placeholder="区级地区">
        <el-option
          v-for="item in qu1"
          :key="item.id"
          :label="item.value"
          :value="item.id">
        </el-option>
      </el-select>
      <el-input v-model="v.addressDetail" @change="setAddress" placeholder="详细地址" size="small" style="width: 250px"/>
      <el-button type="primary" @click="add" size="small">添加</el-button>
      <el-button type="danger" @click="subDelete(i)" size="small">删除</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['propList'],
  data() {
    return {
      mapJson: '../../../static/map.json',
      provinceList: [],
      shi1: [],
      qu1: [],
      cityList: [],
      block: [],
      addressList: []
    }
  },
  created: function() {
    this.getCityData()
    this.addressList = this.propList
  },
  watch: {
    propList: function(val) {
      this.addressList = val
    },
  },
  methods: {
    // 加载china地点数据，三级
    getCityData: function () {
      var that = this
      axios.get(this.mapJson).then(function(response) {
        if (response.status == 200) {
          var data = response.data
          that.provinceList = []
          that.cityList = []
          that.block = []
          // 省市区数据分类
          for (var item in data) {
            if (item.match(/0000$/)) {//省
              that.provinceList.push({id: item, value: data[item], children: []})
            } else if (item.match(/00$/)) {//市
              that.cityList.push({id: item, value: data[item], children: []})
            } else {//区
              that.block.push({id: item, value: data[item]})
            }
          }
          // 分类市级
          for (var index in that.provinceList) {
            for (var index1 in that.cityList) {
              if (that.provinceList[index].id.slice(0, 2) === that.cityList[index1].id.slice(0, 2)) {
                that.provinceList[index].children.push(that.cityList[index1])
              }
            }
          }
          // 分类区级
          for (var item1 in that.cityList) {
            for (var item2 in that.block) {
              if (that.block[item2].id.slice(0, 4) === that.cityList[item1].id.slice(0, 4)) {
                that.cityList[item1].children.push(that.block[item2])
              }
            }
          }
        } else {
          console.log(response.status)
        }
      }).catch(function(error) {
        console.log(typeof +error)
      })
    },
    // 选省
    choseProvince: function (e, i) {
      for (var index2 in this.provinceList) {
        if (e === this.provinceList[index2].id) {
          this.shi1 = this.provinceList[index2].children
          this.addressList[i].city = this.provinceList[index2].children[0].value
          this.qu1 = this.provinceList[index2].children[0].children
          this.addressList[i].area = this.provinceList[index2].children[0].children[0].value
          this.E = this.qu1[0].id
          this.addressList[i].province = this.provinceList[index2].value
        }
      }
      this.setAddress()
    },
    // 选市
    choseCity: function(e, i) {
      for (var index3 in this.cityList) {
        if (e === this.cityList[index3].id) {
          this.qu1 = this.cityList[index3].children
          this.addressList[i].area = this.cityList[index3].children[0].value
          this.E = this.qu1[0].id
          this.addressList[i].city = this.cityList[index3].value
        }
      }
      this.setAddress()
    },
    // 选区
    choseBlock: function(e, i) {
      this.E = e;
      for (var index4 in this.block) {
        if (e === this.block[index4].id) {
          this.addressList[i].area = this.block[index4].value
        }
      }
      this.setAddress()
    },
    add() {
      this.propList.push({
        province: '',
        city: '',
        area: '',
        addressDetail: ''
      })
    },
    subDelete(i) {
      if (i > 0) {
        this.propList.splice(i, 1);
      } else {
        this.$notify({
          title: '至少保留一行',
          type: 'warning',
          duration: 2500
        })
      }
    },
    setAddress() {
      this.$emit('setAddress', this.propList)
    },
  },
}
</script>

<style scoped>
  .label {
    font-size: 14px;
    color: #606266;
    font-weight: 700;
    margin-left: 20px;
  }
</style>
