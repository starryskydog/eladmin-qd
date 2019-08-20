<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!-- 新增 -->
      <div v-permission="['ADMIN','ROLES_ALL','ROLES_CREATE']" style="display: inline-block;margin: 0px 2px;">
        <router-link to="/file/productInfo">
          <el-button
            class="filter-item"
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click="add"
          >新增</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import eForm from './form'

export default {
  components: { eForm },
  data() {
    return {
      isAdd: false,
      id: ''
    }
  },
  methods: {
    beforeInit() {
      this.showButton = false
      this.url = 'api/querySupplierInfoPage'
      const query = this.query
      const value = query.value
      this.params = { page: this.page, size: this.size }
      if (value) { this.params['name'] = value }
      return true
    }
  }
}
</script>
import eForm from './form'
<style scoped>

</style>
