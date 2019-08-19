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
          >新增</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
</script>
import eForm from './form'
<style scoped>

</style>
