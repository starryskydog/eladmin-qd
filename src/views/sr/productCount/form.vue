<template>
  <el-dialog
    :visible.sync="dialog"
    :title="dataType==='product' ? '选择产品' : '选择委外加工单'"
    append-to-body
    width="800px"
    :show-close="false"
  >
    <el-form ref="form" :inline="true" :model="form" size="small" label-width="100px">
      <div style="margin:20px 0">
        <el-input
          v-model="query.productName"
          clearable
          placeholder="输入产品名称搜索"
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
      </div>
      <el-table
        v-loading="loading"
        :data="data"
        size="small"
        style="width: 100%;"
        :header-cell-style="{'text-align':'center'}"
        border
      >
        <el-table-column type="index" width="50" align="center" label="编号"></el-table-column>
        <el-table-column label="选择" width="50px" align="center">
          <template slot-scope="scope">
            <el-radio v-model="form.radio" :label="scope.row">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(v,i) in productColumns"
          :key="v.field"
          :prop="v.field"
          :label="v.title"
        ></el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        :current-page="page + 1"
        style="margin-top: 8px;"
        layout="total, prev, pager, next, sizes"
        @size-change="sizeChange"
        @current-change="pageChange"
      />
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { queryProductInfoPage } from "@/api/productInfo";
import initData from "@/mixins/initData";
export default {
  components: {},
  mixins: [initData],
  props: ["formType", "productList", "itemList"],
  data() {
    return {
      dialog: false,
      i: 0,
      page: 0,
      size: 10,
      loading: false,
      dataList: [],
      categoryList: [],
      form: {
        radio: ""
      },
      url: "",
      total: 0,
      dataType: "product",
      productColumns: [
        { field: "productCode", title: "产品编号", width: 220 },
        { field: "name", title: "产品名称", width: 120 },
        { field: "productCategoryName", title: "产品类别", width: 100 }
      ]
    };
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    beforeInit() {
      this.url = "api/queryProductInfoPage";
      const query = this.query;
      this.params = { page: this.page, size: this.size, ...query };
      return true;
    },
    cancel() {
      this.resetForm();
    },
    doSubmit() {
      this.$emit("setRadio", this.form.radio);
      this.resetForm();
    },
    resetForm() {
      this.form = {
        radio: ""
      };
      this.dialog = false;
      this.page = 0;
      this.size = 10;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .el-input-number .el-input__inner {
  text-align: left;
}
</style>
