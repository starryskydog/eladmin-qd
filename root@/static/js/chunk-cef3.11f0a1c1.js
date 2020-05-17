(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-cef3","chunk-7ce2"],{"3iYq":function(t,e,i){"use strict";i.r(e);var n={props:["dataList"],components:{eForm:i("zeEX").default},data:function(){return{master_user:{sel:null,columns:[{field:"productCode",title:"产品编号",width:220},{field:"productName",title:"产品名称",width:120},{field:"specifications",title:"规格",width:160},{field:"unitPrice",title:"*单价",width:100},{field:"productNumber",title:"*数量",width:100},{field:"totalPrice",title:"销售金额",width:120,disabled:!0},{field:"remark",title:"备注"}],data:[]},showBtn:!1,type:"product",index:null}},created:function(){this.master_user.data=this.dataList},watch:{dataList:function(t){this.master_user.data=t}},computed:{totalPrice:function(){}},methods:{setContact:function(t,e,i){this.master_user.data[e].totalPrice=this.master_user.data[e].unitPrice*this.master_user.data[e].productNumber,this.$emit("setContacts",this.master_user.data)},handleSet:function(t){this.master_user.data[this.index].productCode=t.productCode,this.master_user.data[this.index].productName=t.name,this.master_user.data[this.index].specifications=t.specifications,this.master_user.data[this.index].unitPrice=t.unitPrice},handleFocus:function(t){this.showBtn="productCode"===t},addMasterUser:function(){this.master_user.data.push({productCode:"",productName:"",specifications:"",unitPrice:"",productNumber:"",totalPrice:"",remark:""})},del:function(t){this.master_user.data.length>1?this.master_user.data.splice(t,1):this.$message.warning("至少保留一项")},addCode:function(t){this.$refs.eform.dialog=!0,this.$refs.eform.dataType="product",this.index=t},getSummaries:function(t){var e=t.columns,i=t.data,n=[];return e.forEach(function(t,e){if(0===e)n[e]="总计";else if(5===e||6===e){var a=i.map(function(e){return Number(e[t.property])});a.every(function(t){return isNaN(t)})?n[e]="N/A":n[e]=a.reduce(function(t,e){var i=Number(e);return isNaN(i)?t:t+e},0)}else n[e]="--"}),n}}},a=(i("ZKK6"),i("KHd+")),o=Object(a.a)(n,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-row",[i("el-col",[i("eForm",{ref:"eform",attrs:{formType:t.type},on:{setContact:t.handleSet}}),t._v(" "),i("el-table",{staticStyle:{width:"100%"},attrs:{size:"mini",data:t.master_user.data,border:"","highlight-current-row":"","header-cell-style":{"text-align":"center"},"cell-style":{"text-align":"center"},"show-summary":"","summary-method":t.getSummaries}},[t._l(t.master_user.columns,function(e,n){return i("el-table-column",{key:e.field,attrs:{prop:e.field,label:e.title,width:e.width},scopedSlots:t._u([{key:"default",fn:function(n){return[i("span",["totalPrice"===e.field?i("span",[t._v("\n                              "+t._s(t.dataList[n.$index].totalPrice)+"\n                            ")]):i("el-input",{attrs:{size:"mini",placeholder:"请输入内容",disabled:e.disabled},on:{change:function(i){t.setContact(i,n.$index,e.field)},focus:function(i){t.handleFocus(e.field)}},model:{value:t.dataList[n.$index][e.field],callback:function(i){t.$set(t.dataList[n.$index],e.field,i)},expression:"dataList[scope.$index][v.field]"}},["productCode"===e.field&&t.showBtn?i("span",{staticClass:"el-tag  el-tag--mini",staticStyle:{cursor:"pointer","margin-top":"4px"},attrs:{slot:"suffix"},on:{click:function(e){t.addCode(n.$index)}},slot:"suffix"},[t._v("\n                              选择\n                          ")]):t._e()])],1)]}}])})}),t._v(" "),i("el-table-column",{attrs:{label:"操作",width:"100",fixed:""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",{staticClass:"el-tag el-tag--danger el-tag--mini",staticStyle:{cursor:"pointer"},on:{click:function(i){t.del(e.$index)}}},[t._v("\n                              删除\n                          ")]),t._v(" "),i("span",{staticClass:"el-tag  el-tag--mini",staticStyle:{cursor:"pointer"},on:{click:function(e){t.addMasterUser()}}},[t._v("\n                              添加\n                          ")])]}}])})],2)],1)],1)},[],!1,null,"463287ec",null);o.options.__file="contact.vue";e.default=o.exports},"7AWP":function(t,e,i){},"9ngC":function(t,e,i){},"K+O6":function(t,e,i){"use strict";i.d(e,"e",function(){return a}),i.d(e,"a",function(){return o}),i.d(e,"c",function(){return r}),i.d(e,"f",function(){return s}),i.d(e,"b",function(){return u}),i.d(e,"d",function(){return d});var n=i("t3Un");function a(){return Object(n.a)({url:"api/initProductInfoCode",method:"get"})}function o(t){return Object(n.a)({url:"api/productInfo",method:"post",data:t})}function r(t){return Object(n.a)({url:"api/productInfo",method:"put",data:t})}function s(t){return Object(n.a)({url:"api/queryProductInfoPage",method:"get",params:t})}function u(t){return Object(n.a)({url:"api/productInfo/"+t,method:"delete"})}function d(t){return Object(n.a)({url:"api/productInfo/"+t,method:"get"})}},LPW8:function(t,e,i){"use strict";i.d(e,"e",function(){return a}),i.d(e,"f",function(){return o}),i.d(e,"a",function(){return r}),i.d(e,"c",function(){return s}),i.d(e,"b",function(){return u}),i.d(e,"d",function(){return d});var n=i("t3Un");function a(){return Object(n.a)({url:"api/initCustomerCode",method:"get"})}function o(t){return Object(n.a)({url:"api/queryCustomerInfoPage",method:"get",params:t})}function r(t){return Object(n.a)({url:"api/customerInfo",method:"post",data:t})}function s(t){return Object(n.a)({url:"api/customerInfo/update",method:"put",data:t})}function u(t){return Object(n.a)({url:"api/customerInfo/"+t,method:"delete"})}function d(t){return Object(n.a)({url:"api/customerInfo/"+t,method:"get"})}},ZKK6:function(t,e,i){"use strict";var n=i("9ngC");i.n(n).a},wSPo:function(t,e,i){"use strict";var n=i("7AWP");i.n(n).a},zeEX:function(t,e,i){"use strict";i.r(e);var n=i("LPW8"),a=i("K+O6"),o={components:{},props:{formType:{type:String}},data:function(){return{dialog:!1,page:0,size:10,loading:!1,categoryList:[],form:{radio:""},url:"",data:[],total:0,dataType:"",customColumns:[{field:"customerCode",title:"客户编号",width:220},{field:"customerName",title:"客户名称",width:120},{field:"firstContactName",title:"联系人",width:100},{field:"firstContactMobile",title:"手机号",width:100}],productColumns:[{field:"productCode",title:"产品编号",width:220},{field:"name",title:"产品名称",width:120},{field:"specifications",title:"规格",width:160},{field:"unitPrice",title:"单价",width:100},{field:"measureUnitName",title:"单位",width:100},{field:"productCategoryName",title:"类别",width:100}]}},created:function(){},watch:{dataType:function(t){this.loading=!0,this.getData()}},methods:{getData:function(){var t={page:this.page,size:this.size};"custom"===this.dataType?this.queryCustom(t):this.queryProduct(t)},queryCustom:function(t){var e=this;Object(n.f)(t).then(function(t){e.data=t.content,e.total=t.totalElements,e.loading=!1})},pageChange:function(t){this.page=t-1,this.getData()},sizeChange:function(t){this.page=0,this.size=t,this.getData()},queryProduct:function(t){var e=this;Object(a.f)(t).then(function(t){e.data=t.content,e.total=t.totalElements,e.loading=!1})},cancel:function(){this.resetForm()},doSubmit:function(){this.form.radio&&("product"===this.dataType?this.$emit("setContact",this.form.radio):this.$emit("setRadio",this.form.radio)),this.resetForm()},resetForm:function(){this.form={radio:""},this.dialog=!1,this.page=0,this.size=10}}},r=(i("wSPo"),i("KHd+")),s=Object(r.a)(o,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{visible:t.dialog,title:"custom"===t.dataType?"选择客户名称":"选择产品","append-to-body":"",width:"800px","show-close":!1},on:{"update:visible":function(e){t.dialog=e}}},[i("el-form",{ref:"form",attrs:{inline:!0,model:t.form,size:"small","label-width":"100px"}},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.data,size:"small","header-cell-style":{"text-align":"center"},border:""}},[i("el-table-column",{attrs:{type:"index",width:"50",align:"center",label:"编号"}}),t._v(" "),i("el-table-column",{attrs:{label:"选择",width:"50px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-radio",{attrs:{label:e.row},model:{value:t.form.radio,callback:function(e){t.$set(t.form,"radio",e)},expression:"form.radio"}},[t._v(" ")])]}}])}),t._v(" "),t._l("custom"===t.dataType?t.customColumns:t.productColumns,function(t,e){return i("el-table-column",{key:t.field,attrs:{prop:t.field,label:t.title}})})],2),t._v(" "),i("el-pagination",{staticStyle:{"margin-top":"8px"},attrs:{total:t.total,"current-page":t.page+1,layout:"total, prev, pager, next, sizes"},on:{"size-change":t.sizeChange,"current-change":t.pageChange}})],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"text"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.doSubmit}},[t._v("确认")])],1)],1)},[],!1,null,"c9a5bd56",null);s.options.__file="form.vue";e.default=s.exports}}]);