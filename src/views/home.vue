<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <!--<panel-group/>-->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>个人信息</span>
            </div>
            <div>
              <div style="text-align: center">
                <img v-if="user.avatar" :src="user.avatar" title="点击上传头像" class="avatar">
              </div>
              <ul class="user-info">
                <li><svg-icon icon-class="user1" /> 用户名称 <div class="user-right">{{ user.username }}</div></li>
                <li><svg-icon icon-class="phone" /> 手机号码 <div class="user-right">{{ user.phone }}</div></li>
                <li><svg-icon icon-class="email" /> 用户邮箱 <div class="user-right">{{ user.email }}</div></li>
                <li><svg-icon icon-class="dept" /> 所属部门 <div class="user-right"> {{ user.dept }} / {{ user.job }}</div></li>
              </ul>
            </div>
          </el-card>
        </el-col>
        <el-col :span="18">
          <el-table
            :data="tableData"
            height="400"
            border
            style="width: 100%">
            <el-table-column
              prop="messContent"
              label="消息内容">
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="发送日期"
              width="180">
              <template slot-scope="scope">
                {{parseTime(scope.row.updateTime)}}
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row style="background:#fff;padding:16px 16px 0;margin:32px 0;">
        <line-chart/>
      </el-row>

      <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <raddar-chart/>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart/>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <bar-chart/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './dashboard/PanelGroup'
import LineChart from './dashboard/LineChart'
import RaddarChart from './dashboard/RaddarChart'
import PieChart from './dashboard/PieChart'
import BarChart from './dashboard/BarChart'
import { count } from '@/api/visits'
import { queryMessageList } from '@/api/message'
import store from '@/store'
import { parseTime } from '@/utils/index'

/**
 * 记录访问，只有页面刷新或者第一次加载才会记录
 */
count().then(res => {})

export default {
  name: 'Dashboard',
  data(){
    return {
      tableData: []
    }
  },
  created() {
    const _this=this
    queryMessageList(this.user.id).then(function (res) {
      _this.tableData=res
    })
  },
  methods: {
    parseTime
  },
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart },
  computed: {
    ...mapGetters([
      'roles',
      'user'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 18px 22px 22px 22px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%
  }
  .user-info {
    padding-left: 0px;
    list-style: none;
    li{
      border-bottom: 1px solid #F0F3F4;
      border-top: 1px solid #F0F3F4;
      padding: 11px 0px;
      font-size: 13px;
    }
    .user-right {
      float: right;

      a{
        color: #317EF3;
      }
    }
  }
</style>
