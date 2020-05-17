<template>
  <div class="app-container">
    <el-form
      ref="form"
      :inline="true"
      :model="form"
      size="large"
      label-width="80px"
      label-position="left"
    >
      <p class="form-title" style="text-align: center; font-size: 18px">无锡市海星船舶动力有限公司</p>
      <p class="form-sub-title" style="text-align: center;">产品统计</p>
      <div style="margin:20px 0">
        <el-input
          v-model="query.customerOrderCode"
          clearable
          placeholder="输入产品名称搜索"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="toQuery"
          size="mini"
        />
        <el-input
          v-model="query.customerName"
          clearable
          placeholder="输入产品类别搜索"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="toQuery"
          size="mini"
        />
        <el-input
          v-model="query.customerName"
          clearable
          placeholder="输入产品系列搜索"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="toQuery"
          size="mini"
        />
        <el-button
          class="filter-item"
          size="mini"
          type="success"
          icon="el-icon-search"
          @click="toQuery"
        >搜索</el-button>
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-search"
          @click="$refs.eform.dialog = true"
        >新增</el-button>
      </div>
      <Contact :dataList="data"></Contact>
      <el-pagination
        :total="total"
        :current-page="params.page + 1"
        style="margin-top: 8px;"
        layout="total, prev, pager, next, sizes"
        @size-change="sizeChange"
        @current-change="pageChange"
      />
      <eForm ref="eform" @setRadio="handleRadio" />
    </el-form>
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import initData from "@/mixins/initData";
import eForm from "./form";
import Contact from "./module/contact";
import store from "@/store";
import { add } from "@/api/productCount";

export default {
  mixins: [initData],
  components: { Contact, eForm },
  data() {
    return {
      isAdd: false,
      delLoading: false,
      id: "",
      form: {
        qualityCheekSheetCode: "",
        productCountList: []
      },
      total: null,
      query: {}
    };
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    checkPermission,
    beforeInit() {
      this.url = "api/queryProductCountPage";
      const query = this.query;
      const value = query.value;
      this.params = { page: this.page, size: this.size, ...query };
      return true;
    },
    handleRadio(info) {
      info.productName = info.name;
      info.productId=info.id;
      add(info).then(res => {
        const obj = {
          ...info
        };
        this.data.push(obj);
      });
    }
  }
};
</script>

<style scoped>
.tips {
  background-color: #efefef;
  height: 30px;
  line-height: 30px;
}
</style>
