(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0c8a"],{"K+O6":function(t,e,o){"use strict";o.d(e,"e",function(){return n}),o.d(e,"a",function(){return r}),o.d(e,"c",function(){return a}),o.d(e,"f",function(){return u}),o.d(e,"b",function(){return d}),o.d(e,"d",function(){return c});var i=o("t3Un");function n(){return Object(i.a)({url:"api/initProductInfoCode",method:"get"})}function r(t){return Object(i.a)({url:"api/productInfo",method:"post",data:t})}function a(t){return Object(i.a)({url:"api/productInfo",method:"put",data:t})}function u(t){return Object(i.a)({url:"api/queryProductInfoPage",method:"get",params:t})}function d(t){return Object(i.a)({url:"api/productInfo/"+t,method:"delete"})}function c(t){return Object(i.a)({url:"api/productInfo/"+t,method:"get"})}},"Lr+n":function(t,e,o){},oShK:function(t,e,o){"use strict";o.r(e);var i=o("uPGW"),n=o("K+O6"),r={components:{},props:{formType:{type:String}},data:function(){return{dialog:!1,page:0,size:10,loading:!1,categoryList:[],form:{radio:""},url:"",data:[],total:0,dataType:"",customColumns:[{field:"customerOrderCode",title:"订单编号",width:220},{field:"customerName",title:"客户名称",width:120},{field:"deliveryUser",title:"联系人",width:100},{field:"deliveryUserContact",title:"手机号",width:100}],productColumns:[{field:"productCode",title:"产品编号",width:220},{field:"name",title:"产品名称",width:120},{field:"specifications",title:"规格",width:160},{field:"unitPrice",title:"单价",width:100},{field:"measureUnitName",title:"单位",width:100},{field:"productCategoryName",title:"类别",width:100}]}},created:function(){},watch:{dataType:function(t){this.loading=!0,this.getData()}},methods:{getData:function(){var t={page:this.page,size:this.size};"custom"===this.dataType?this.queryCustom(t):this.queryProduct(t)},queryCustom:function(t){var e=this;Object(i.f)(t).then(function(t){e.data=t.content,e.total=t.totalElements,e.loading=!1})},pageChange:function(t){this.page=t-1,this.getData()},sizeChange:function(t){this.page=0,this.size=t,this.getData()},queryProduct:function(t){var e=this;Object(n.f)(t).then(function(t){e.data=t.content,e.total=t.totalElements,e.loading=!1})},cancel:function(){this.resetForm()},doSubmit:function(){this.form.radio&&("product"===this.dataType?this.$emit("setContact",this.form.radio):this.$emit("setRadio",this.form.radio)),this.resetForm()},resetForm:function(){this.form={radio:""},this.dialog=!1,this.page=0,this.size=10}}},a=(o("vo+o"),o("KHd+")),u=Object(a.a)(r,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dialog",{attrs:{visible:t.dialog,title:"custom"===t.formType?"选择订单":"选择产品","append-to-body":"",width:"800px","show-close":!1},on:{"update:visible":function(e){t.dialog=e}}},[o("el-form",{ref:"form",attrs:{inline:!0,model:t.form,size:"small","label-width":"100px"}},[o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.data,size:"small","header-cell-style":{"text-align":"center"},border:""}},[o("el-table-column",{attrs:{type:"index",width:"50",align:"center",label:"编号"}}),t._v(" "),o("el-table-column",{attrs:{label:"选择",width:"50px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-radio",{attrs:{label:e.row},model:{value:t.form.radio,callback:function(e){t.$set(t.form,"radio",e)},expression:"form.radio"}},[t._v(" ")])]}}])}),t._v(" "),t._l("custom"===t.formType?t.customColumns:t.productColumns,function(t,e){return o("el-table-column",{key:t.field,attrs:{prop:t.field,label:t.title}})})],2),t._v(" "),o("el-pagination",{staticStyle:{"margin-top":"8px"},attrs:{total:t.total,"current-page":t.page+1,layout:"total, prev, pager, next, sizes"},on:{"size-change":t.sizeChange,"current-change":t.pageChange}})],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"text"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.doSubmit}},[t._v("确认")])],1)],1)},[],!1,null,"8b54bbce",null);u.options.__file="form.vue";e.default=u.exports},uPGW:function(t,e,o){"use strict";o.d(e,"e",function(){return n}),o.d(e,"f",function(){return r}),o.d(e,"a",function(){return a}),o.d(e,"c",function(){return u}),o.d(e,"b",function(){return d}),o.d(e,"d",function(){return c});var i=o("t3Un");function n(){return Object(i.a)({url:"api/initCustomerOrderCode",method:"get"})}function r(){return Object(i.a)({url:"api/queryCustomerOrderPage",method:"get"})}function a(t){return Object(i.a)({url:"api/customerOrder",method:"post",data:t})}function u(t){return Object(i.a)({url:"api/customerOrder",method:"put",data:t})}function d(t){return Object(i.a)({url:"api/customerOrder/"+t,method:"delete"})}function c(t){return Object(i.a)({url:"api/customerOrder/"+t,method:"get"})}},"vo+o":function(t,e,o){"use strict";var i=o("Lr+n");o.n(i).a}}]);