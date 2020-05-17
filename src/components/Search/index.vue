<template>
  <div>
    <el-input v-for="item in query" :key="item.name"  v-model="data[item.name]" clearable :placeholder="item.placeholder" style="width: 200px;margin-right: 10px" class="filter-item" @input="handleInput" @keyup.enter.native="search" size="mini"/>
    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="search">搜索</el-button>
  </div>
</template>

<script>

export default {
  props: {
    func: Function,
    query:Array
  },
  data(){
    return{
      data:{}
    }
  },
  methods:{
    search(){
      this.$emit('handleSearch')
    },
    handleInput(){
      this.$emit('handleChange',this.data)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
