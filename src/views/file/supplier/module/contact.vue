<template>
  <el-row>
    <el-col>
      <el-table size="mini" :data="master_user.data" border style="width: 100%" highlight-current-row
                :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column label="操作" width="100" fixed>
          <template slot-scope="scope">
            <span class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;" @click="del(scope.$index)">
                                删除
                            </span>
            <span class="el-tag  el-tag--mini" style="cursor: pointer;"
                  @click="addMasterUser()">
                                添加
                            </span>
          </template>
        </el-table-column>
        <el-table-column v-for="(v,i) in master_user.columns" :key="v.field" :prop="v.field" :label="v.title"
                         :width="v.width">
          <template slot-scope="scope">
                            <span >
                                <el-input  v-if="!v.type" size="mini" placeholder="请输入内容" v-model="contactList[scope.$index][v.field]" @change="((val)=>{setContact(val,scope.$index,v.field)})">
                                </el-input>
                              <el-select v-else size="small" v-model="contactList[scope.$index][v.field]" style="width: 150px;" @change="((val)=>{setContact(val,scope.$index,v.field)})">
                                <el-option
                                  v-for="(item, index) in master_user.options"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id"/>
                              </el-select>
                            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    props:['contactList'],
    data() {
      return {
        master_user: {
          sel: null,//选中行
          columns: [
            {field: "name", title: "联系人", width: 120},
            {field: "mobile", title: "手机", width: 120},
            {field: "phone", title: "座机", width: 160},
            {field: "email", title: "邮箱", width: 160},
            {field: "weixin", title: "微信", width: 120},
            {field: "qq", title: "QQ", width: 120},
            {field: "firstTag", title: "首要联系人", width: 120, type: 'select'},
          ],
          data: [
          ],
          options: [
            {
              id: 1,
              name: '是'
            },
            {
              id: 0,
              name: '否'
            }
          ]
        },
      }
    },
    created:function(){
      this.addMasterUser()
      this.master_user.data=this.contactList
    },
    watch: {
      contactList: function (val) {
        this.master_user.data=val
      },
    },
    methods: {
      setContact(){
        this.$emit('setContacts',this.master_user.data)
      },
      //添加账号
      addMasterUser() {
        let j = {
          name: "",
          phone: "",
          mobile: "",
          email: "",
          weixin: "",
          qq: "",
          firstTag: 1,
        };
        this.master_user.data.push(j);
        this.master_user.sel = JSON.parse(JSON.stringify(j));
      },
      del(index) {
        if(this.master_user.data.length>1){
          this.master_user.data.splice(index, 1);
        }else{
          this.$message.warning("至少保留一项");
        }
      },
    }
  }
</script>

<style scoped>

</style>
