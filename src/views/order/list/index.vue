<template>
  <div class="app-container">
    <eForm ref="eform" @setRadio="handleRadio" @setType="changeType" />
    <el-dialog :visible.sync="dialog" append-to-body width="500px" @close="doSubmit">
      <el-upload
        :before-remove="handleBeforeRemove"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="fileList"
        :headers="headers"
        :action="qiNiuUploadApi"
        class="upload-demo"
        multiple
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" style="display: block;" class="el-upload__tip">请勿上传违法文件，且文件不超过10M</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doSubmit">确认</el-button>
      </div>
    </el-dialog>
    <div
      v-permission="['ADMIN','CUSTOMER_ORDER_ALL','CUSTOMER_ORDER_CREATE']"
      style="display: inline-block;margin: 0px 2px;"
    >
      <el-button class="filter-item" size="small" type="primary" @click="add">保存</el-button>
    </div>
    <el-form
      ref="form"
      :inline="true"
      :model="form"
      size="large"
      label-width="80px"
      label-position="left"
    >
      <p class="form-title" style="text-align: center; font-size: 18px">无锡市海星船舶动力有限公司</p>
      <p class="form-sub-title" style="text-align: center;">客户订单</p>
      <p>订单日期：{{date}}</p>
      <el-form-item label="客户" prop="customerId" label-width="50px">
        <el-input v-model="form.customerName" size="small" @focus="handleFocus()">
          <span
            class="el-tag el-tag--mini"
            v-if="focus"
            slot="suffix"
            style="cursor: pointer;"
            @click="addCode()"
          >选择</span>
        </el-input>
      </el-form-item>
      <el-form-item label="交货日期" prop="deliveryDate">
        <el-date-picker
          v-model="form.deliveryDate"
          type="date"
          size="small"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="单据编号:" prop="customerOrderCode">{{form.customerOrderCode}}</el-form-item>
      <Contact @setContacts="updateContact" :dataList="form.customerOrderProductList"></Contact>
      <el-form-item
        label="制单人:"
        prop="username"
        style="margin: 20px auto"
      >{{form.customerOrderMakerName}}</el-form-item>
      <!-- 上传 -->
      <div>
        <el-form-item label="上传附件:" prop="customerOrderAnnexUrlList" style="margin: 20px auto">
          <el-button
            class="filter-item"
            size="mini"
            type="primary"
            icon="el-icon-upload"
            @click="dialog = true"
          >上传文件</el-button>
        </el-form-item>
      </div>
      <p class="tips">交货信息</p>
      <el-form-item label="交货方式" style="margin: 20px 20px 20px 0">
        <el-select
          v-model="form.deliveryWayCode"
          placeholder="请选择"
          size="mini"
          @change="selectName($event,'deliveryWay')"
        >
          <el-option
            v-for="item in deliveryWayOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="付款方式" style="margin: 20px 20px 20px 0">
        <el-select
          v-model="form.payWayCode"
          placeholder="请选择"
          size="mini"
          @change="selectName($event,'payWay')"
        >
          <el-option
            v-for="item in payWayOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账期" prop="deliveryDate" style="display: block">
        <el-date-picker
          v-model="form.orderDate"
          type="date"
          size="mini"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="收货地址" style="margin: 0 20px 20px 0">
        <el-input v-model="form.deliveryAddress" size="mini" placeholder="请填写收货地址"></el-input>
      </el-form-item>
      <el-form-item label="收货人" style="margin: 0 20px 20px 0">
        <el-input v-model="form.deliveryUser" size="mini" placeholder="请填写收货人"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" style="margin: 0 20px 20px 0">
        <el-input v-model="form.deliveryUserContact" size="mini" placeholder="请填写联系方式"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import initData from "@/mixins/initData";
import eForm from "./form";
import Contact from "./module/contact";
import store from "@/store";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
import { parseTime } from "@/utils/index";
import {
  initCustomerOrderCode,
  add,
  edit,
  getCustomerOrderInfo
} from "@/api/customerOrder";

export default {
  mixins: [initData],
  components: { eForm, Contact },
  computed: {
    ...mapGetters(["qiNiuUploadApi"])
  },
  data() {
    return {
      isAdd: false,
      dialog: false,
      headers: { Authorization: "Bearer " + getToken() },
      delLoading: false,
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      files: [],
      newWin: null,
      downloadLoading: false,
      delLoading: false,
      id: "",
      focus: false,
      form: {
        customerId: "",
        customerName: "",
        deliveryDate: "",
        customerOrderCode: null,
        customerOrderProductList: [
          {
            productCode: "",
            productName: "",
            specifications: "",
            unitPrice: "",
            productNumber: "",
            totalPrice: "",
            remark: ""
          }
        ],
        customerOrderMakerName: ""
      },
      date: "",
      type: "custom",
      deliveryWayOptions: [
        {
          label: "物流",
          value: "0"
        },
        {
          label: "自提",
          value: "1"
        }
      ],
      payWayOptions: [
        {
          label: "支付宝",
          value: "0"
        },
        {
          label: "微信",
          value: "1"
        }
      ]
    };
  },
  created() {
    this.getDate();
    this.form.customerOrderMakerName = store.getters.user.username;
    const id = this.$route.params.id;
    if (id) {
      this.getCustomerOrderInfo(id);
      this.type = "edit";
    } else {
      this.initCustomerOrderCode();
    }
  },
  methods: {
    checkPermission,
    add() {
      const productList = this.form.customerOrderProductList;
      for (let i = 0; i < productList.length; i++) {
        if (productList[i].productCode === "") {
          productList.splice(i, 1);
          i = i - 1;
        }
      }
      if (productList.length > 0) {
        this.form.customerOrderProductList = productList;
        if (this.type === "edit") {
          delete this.form.createTime;
          delete this.form.updateTime;
          edit(this.form).then(res => {
            this.$notify({
              title: "编辑成功",
              type: "success",
              duration: 2500
            });
            setTimeout(() => {
              this.$router.replace({ path: "/order/customerOrder" });
            }, 2500);
          });
        } else {
          add(this.form).then(res => {
            this.$notify({
              title: "添加成功",
              type: "success",
              duration: 2500
            });
            setTimeout(() => {
              this.$router.replace({ path: "/order/customerOrder" });
            }, 2500);
          });
        }
      } else {
        this.form.customerOrderProductList = [
          {
            productCode: "",
            productName: "",
            specifications: "",
            unitPrice: "",
            productNumber: "",
            totalPrice: "",
            remark: ""
          }
        ];
        this.$notify({
          title: "请至少选择一个产品",
          type: "warning",
          duration: 2500
        });
      }
    },
    selectName(id, type) {
      let selectedName = {};
      if (type === "deliveryWay") {
        selectedName = this.deliveryWayOptions.find(item => {
          return item.value === id;
        });
        this.form.deliveryWayName = selectedName.label;
      } else {
        selectedName = this.payWayOptions.find(item => {
          return item.value === id;
        });
        this.form.payWayName = selectedName.label;
      }
    },
    handleRadio(radio) {
      this.form.customerName = radio.customerName;
      this.form.customerId = radio.id;
      this.form.deliveryAddress = radio.firstContactAddress;
      this.form.deliveryUser = radio.customerName;
      this.form.deliveryUserContact = radio.firstContactMobile;
    },
    getExtensionName(name) {
      const dot = name.lastIndexOf(".");
      if (dot > -1 && dot < name.length - 1) {
        return name.substring(dot + 1);
      }
      return name;
    },
    handleSuccess(response, file, fileList) {
      console.log(response.errno);
      if (response.errno == 0) {
        console.log(1111111);
        console.log(response.data[0]);
        this.fileList.push(response.data[0]);
      }
      console.log(this.fileList);
    },
    handleBeforeRemove(file, fileList) {
      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i].uid === file.uid) {
          del(this.files[i].id).then(res => {});
          return true;
        }
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 刷新列表数据
    doSubmit() {
      console.log(this.fileList);
      // this.fileList = [];
      // this.dialogVisible = false;
      // this.dialogImageUrl = "";
      // this.dialog = false;
      // this.init();
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      const msg = JSON.parse(e.message);
      this.$notify({
        title: msg.message,
        type: "error",
        duration: 2500
      });
    },
    changeType(type) {
      this.type = type;
    },
    getDate() {
      const date = new Date();
      const today =
        date.getFullYear() +
        "年" +
        (date.getMonth() + 1) +
        "月" +
        date.getDate() +
        "日";
      this.date = today;
    },
    addCode() {
      this.$refs.eform.dialog = true;
      this.$refs.eform.dataType = "custom";
    },
    updateContact(data) {
      this.form.customerOrderProductList = data;
    },
    handleFocus() {
      this.focus = true;
    },
    initCustomerOrderCode() {
      initCustomerOrderCode().then(res => {
        this.form.customerOrderCode = res;
      });
    },
    getCustomerOrderInfo(id) {
      getCustomerOrderInfo(id).then(res => {
        this.form = res;
        this.form.orderDate = parseTime(res.orderDate);
        this.form.deliveryDate = parseTime(res.deliveryDate);
      });
    },
    resetForm() {}
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
