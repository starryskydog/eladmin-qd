<template>
  <div class="app-container">
    <eForm ref="eform" :is-add="isAdd" />
    <div v-permission="['ADMIN','ROLES_ALL','ROLES_CREATE']" style="display: inline-block;margin: 0px 2px;">
      <el-button
        class="filter-item"
        size="small"
        type="primary"
        @click="add">保存</el-button>
    </div>
    <el-form ref="form" :inline="true" :model="form" size="large" label-width="100px">
      <p class="form-title" style="text-align: center; font-size: 18px">
        无锡市海星船舶动力有限公司
      </p>
      <p class="form-sub-title" style="text-align: center;">
        客户订单
      </p>
      <p>
        订单日期：{{date}}
      </p>
      <el-form-item label="客户" prop="custom">
        <el-input v-model="form.custom" size="small">
          <span class="el-tag  el-tag--mini" slot="suffix" style="cursor: pointer;"
                @click="addCustom()">
                                选择
                            </span>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import checkPermission from '@/utils/permission'
  import initData from '@/mixins/initData'
  import eForm from './form'
  export default {
    mixins: [initData],
    components: { eForm },
    data() {
      return {
        isAdd:false,
        delLoading: false,
        id:'',
        form:{

        },
        date:''
      }
    },
    created() {
      this.getDate()
    },
    methods: {
      checkPermission,
      add(){
        console.log(this.form)
      },
      getDate(){
        const date = new Date();
        const today=date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date .getDate()+'日'
        this.date=today
      },
      addCustom(){

      }
    }
  }
</script>

<style scoped>
.check-btn{
  height: 20px;
}
</style>
