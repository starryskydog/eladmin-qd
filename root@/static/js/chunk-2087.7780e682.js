(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2087","chunk-7c0f","chunk-40d9"],{"14Xm":function(t,e,i){t.exports=i("ls82")},"1zm+":function(t,e,i){},"3ADX":function(t,e,i){"use strict";var n=i("14Xm"),r=i.n(n),o=i("4d7F"),a=i.n(o),s=i("D3Ub"),u=i.n(s),c=i("t3Un");function l(t,e){return Object(c.a)({url:t,method:"get",params:e})}e.a={data:function(){return{loading:!0,data:[],page:0,size:10,total:0,url:"",params:{},query:{},time:170,isAdd:!1}},methods:{init:function(){var t=this;return u()(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.beforeInit();case 2:if(e.sent){e.next=4;break}return e.abrupt("return");case 4:return e.abrupt("return",new a.a(function(e,i){t.loading=!0,l(t.url,t.params).then(function(i){t.total=i.totalElements,t.data=i.content,setTimeout(function(){t.loading=!1},t.time),e(i)}).catch(function(e){t.loading=!1,i(e)})}));case 5:case"end":return e.stop()}},e,t)}))()},beforeInit:function(){return!0},pageChange:function(t){this.page=t-1,this.init()},sizeChange:function(t){this.page=0,this.size=t,this.init()},dleChangePage:function(t){void 0===t&&(t=1),this.data.length===t&&0!==this.page&&(this.page=this.page-1)},toQuery:function(){this.page=0,this.init()}}}},"41Be":function(t,e,i){"use strict";i.d(e,"a",function(){return r});var n=i("Q2AE");function r(t){if(t&&t instanceof Array&&t.length>0){var e=t;return!!(n.a.getters&&n.a.getters.roles).some(function(t){return e.includes(t)})}return console.error("need roles! Like v-permission=\"['admin','editor']\""),!1}},"4JC0":function(t,e,i){"use strict";i.r(e);var n=i("oLdV"),r=(i("8mnm"),{components:{},props:["formType","productList","itemList"],data:function(){return{dialog:!1,i:0,page:0,size:10,loading:!1,dataList:[],categoryList:[],form:{radio:""},url:"",total:0,dataType:"",customColumns:[{field:"productCode",title:"产品编号",width:220},{field:"productName",title:"产品名称",width:120},{field:"remark",title:"备注",width:100}],productColumns:[{field:"outSourceProcessSheetCode",title:"编号",width:220},{field:"outSourceCompanyName",title:"公司名称",width:120},{field:"outSourceAdminName",title:"负责人",width:160},{field:"contactWay",title:"联系方式",width:100}]}},created:function(){},watch:{dataType:function(t){this.getData()}},methods:{getData:function(){var t={page:this.page,size:this.size};"product"===this.dataType||this.queryOutSourceProcessSheetPage(t)},queryCustom:function(t){},pageChange:function(t){this.page=t-1,this.getData()},sizeChange:function(t){this.page=0,this.size=t,this.getData()},queryOutSourceProcessSheetPage:function(t){var e=this;Object(n.f)(t).then(function(t){e.dataList=t.content,e.total=t.totalElements,e.loading=!1})},cancel:function(){this.resetForm()},doSubmit:function(){this.form.radio&&("outSourceInspectionCertificate"===this.dataType?this.$emit("setIndex",this.form.radio):this.$emit("setContact",this.form.radio)),this.resetForm()},resetForm:function(){this.form={radio:""},this.dialog=!1,this.page=0,this.size=10}}}),o=(i("AacY"),i("KHd+")),a=Object(o.a)(r,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{visible:t.dialog,title:"outSourceInspectionCertificate"===t.dataType?"选择委外加工单":"选择产品","append-to-body":"",width:"800px","show-close":!1},on:{"update:visible":function(e){t.dialog=e}}},[i("el-form",{ref:"form",attrs:{inline:!0,model:t.form,size:"small","label-width":"100px"}},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:"outSourceInspectionCertificate"===t.dataType?t.dataList:t.itemList,size:"small","header-cell-style":{"text-align":"center"},border:""}},[i("el-table-column",{attrs:{type:"index",width:"50",align:"center",label:"编号"}}),t._v(" "),i("el-table-column",{attrs:{label:"选择",width:"50px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-radio",{attrs:{label:e.row},model:{value:t.form.radio,callback:function(e){t.$set(t.form,"radio",e)},expression:"form.radio"}},[t._v(" ")])]}}])}),t._v(" "),t._l("product"===t.formType?t.customColumns:t.productColumns,function(t,e){return i("el-table-column",{key:t.field,attrs:{prop:t.field,label:t.title}})})],2),t._v(" "),i("el-pagination",{staticStyle:{"margin-top":"8px"},attrs:{total:t.total,"current-page":t.page+1,layout:"total, prev, pager, next, sizes"},on:{"size-change":t.sizeChange,"current-change":t.pageChange}})],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"text"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.doSubmit}},[t._v("确认")])],1)],1)},[],!1,null,"12146084",null);a.options.__file="form.vue";e.default=a.exports},"8mnm":function(t,e,i){"use strict";i.d(e,"d",function(){return r}),i.d(e,"e",function(){return o}),i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s}),i.d(e,"c",function(){return u});var n=i("t3Un");function r(){return Object(n.a)({url:"api/initOutSourceInspectionCertificateCode",method:"get"})}function o(t){return Object(n.a)({url:"api/outSourceInspectionCertificate/"+t,method:"get"})}function a(t){return Object(n.a)({url:"api/outSourceInspectionCertificate",method:"post",data:t})}function s(t){return Object(n.a)({url:"api/outSourceInspectionCertificate/"+t,method:"delete"})}function u(t){return Object(n.a)({url:"api/outSourceInspectionCertificate",method:"put",data:t})}},AacY:function(t,e,i){"use strict";var n=i("RhAs");i.n(n).a},D3Ub:function(t,e,i){"use strict";e.__esModule=!0;var n=function(t){return t&&t.__esModule?t:{default:t}}(i("4d7F"));e.default=function(t){return function(){var e=t.apply(this,arguments);return new n.default(function(t,i){return function r(o,a){try{var s=e[o](a),u=s.value}catch(t){return void i(t)}if(!s.done)return n.default.resolve(u).then(function(t){r("next",t)},function(t){r("throw",t)});t(u)}("next")})}}},JoIq:function(t,e,i){"use strict";var n=i("O+lO");i.n(n).a},"O+lO":function(t,e,i){},RhAs:function(t,e,i){},a7Nq:function(t,e,i){"use strict";i.r(e);var n={props:["dataList","itemList"],components:{eForm:i("4JC0").default},data:function(){return{master_user:{sel:null,columns:[{field:"productCode",title:"产品编号",width:220},{field:"productName",title:"名称",width:160},{field:"productNumber",title:"产品数量",width:80},{field:"qualifiedNumber",title:"合格数量",width:80},{field:"scrapNumber",title:"报废数量",width:80},{field:"remark",title:"备注"}],data:[]},showBtn:!1,type:"product",index:null}},created:function(){this.master_user.data=this.dataList},watch:{dataList:function(t){this.master_user.data=t}},methods:{setContact:function(){this.$emit("setContacts",this.master_user.data)},handleSet:function(t){t.qualifiedNumber=t.productNumber,t.scrapNumber=0,this.master_user.data.push(t),this.master_user.data.splice(this.master_user.data.findIndex(function(t){return""===t.productCode}),1),this.$emit("setContacts",this.master_user.data)},handleFocus:function(t){this.showBtn="productCode"===t},addMasterUser:function(){this.master_user.data.push({productCode:"",productName:"",qualifiedNumber:"",scrapNumber:"",productNumber:"",remark:""})},del:function(t){this.master_user.data.length>1?this.master_user.data.splice(t,1):this.$message.warning("至少保留一项")},addCode:function(){this.$refs.eform.dialog=!0,this.$refs.eform.dataType="product"},getSummaries:function(t){var e=t.columns,i=t.data,n=[];return e.forEach(function(t,e){if(0===e)n[e]="总计";else if(4===e||5===e||3===e){var r=i.map(function(e){return Number(e[t.property])});r.every(function(t){return isNaN(t)})?n[e]="0":n[e]=r.reduce(function(t,e){var i=Number(e);return isNaN(i)?t:t+e},0)}else n[e]="--"}),n}}},r=(i("eS0p"),i("KHd+")),o=Object(r.a)(n,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-row",[i("el-col",[i("eForm",{ref:"eform",attrs:{formType:t.type,itemList:t.itemList,productList:t.dataList},on:{setContact:t.handleSet}}),t._v(" "),i("el-table",{staticStyle:{width:"100%"},attrs:{size:"mini",data:t.master_user.data,border:"","highlight-current-row":"","header-cell-style":{"text-align":"center"},"cell-style":{"text-align":"center"},"show-summary":"","summary-method":t.getSummaries}},[t._l(t.master_user.columns,function(e,n){return i("el-table-column",{key:e.field,attrs:{prop:e.field,label:e.title,width:e.width},scopedSlots:t._u([{key:"default",fn:function(n){return[i("span",[i("el-input",{attrs:{size:"mini",placeholder:"请输入内容",disabled:e.disabled},on:{change:function(i){t.setContact(i,n.$index,e.field)},focus:function(i){t.handleFocus(e.field)}},model:{value:t.master_user.data[n.$index][e.field],callback:function(i){t.$set(t.master_user.data[n.$index],e.field,i)},expression:"master_user.data[scope.$index][v.field]"}},["productCode"===e.field&&t.showBtn?i("span",{staticClass:"el-tag  el-tag--mini",staticStyle:{cursor:"pointer","margin-top":"4px"},attrs:{slot:"suffix"},on:{click:function(e){t.addCode(n.$index)}},slot:"suffix"},[t._v("\n                              选择\n                          ")]):t._e()])],1)]}}])})}),t._v(" "),i("el-table-column",{attrs:{label:"操作",width:"100",fixed:""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",{staticClass:"el-tag el-tag--danger el-tag--mini",staticStyle:{cursor:"pointer"},on:{click:function(i){t.del(e.$index)}}},[t._v("\n                              删除\n                          ")]),t._v(" "),i("span",{staticClass:"el-tag  el-tag--mini",staticStyle:{cursor:"pointer"},on:{click:function(e){t.addMasterUser()}}},[t._v("\n                              添加\n                          ")])]}}])})],2)],1)],1)},[],!1,null,"752002ca",null);o.options.__file="contact.vue";e.default=o.exports},"bAc/":function(t,e,i){"use strict";i.r(e);var n=i("QbLZ"),r=i.n(n),o=i("41Be"),a=i("3ADX"),s=i("4JC0"),u=i("a7Nq"),c=i("Q2AE"),l=i("8mnm"),d={mixins:[a.a],components:{eForm:s.default,Contact:u.default},data:function(){return{isAdd:!1,delLoading:!1,id:"",focus:!1,showBtn:!1,dateTime:"",adminList:[],itemList:[],form:{makePeopleName:"",outSourceProcessSheetCode:"",outSourceInspectionCertificateCode:"",outSourceInspectionCertificateProductList:[{productCode:"",productName:"",productId:"",productNumber:"",qualifiedNumber:"",scrapNumber:"",remark:""}]},rules:{contactWay:[{required:!0,message:"联系方式不能为空",trigger:"blur"}],remark:[{required:!0,message:"备注不能为空",trigger:"blur"}]}}},created:function(){var t=this.$route.params.id;this.form.makePeopleName=c.a.getters.user.username,this.form.makePeopleId=c.a.getters.user.id,t?(this.queryOutSourceInspectionCertificateById(t),this.type="edit"):this.initInvoiceCode()},methods:{checkPermission:o.a,handleFocus:function(){this.showBtn=!0},handleData:function(t){this.form.outSourceInspectionCertificateProductList=t},add:function(){var t=this;this.$refs.form.validate(function(e){e&&("edit"===t.type?(delete t.form.createTime,delete t.form.updateTime,Object(l.c)(t.form).then(function(e){t.$notify({title:"编辑成功",type:"success",duration:2500}),setTimeout(function(){t.$router.replace({path:"/outSourceProcess/outSourceInspectionCertificate"})},2500)})):Object(l.a)(t.form).then(function(e){t.$notify({title:"添加成功",type:"success",duration:2500}),setTimeout(function(){t.$router.replace({path:"/outSourceProcess/outSourceInspectionCertificate"})},2500)}))})},initInvoiceCode:function(){var t=this;Object(l.d)().then(function(e){t.form.outSourceInspectionCertificateCode=e})},queryOutSourceInspectionCertificateById:function(t){var e=this;Object(l.e)(t).then(function(t){e.form=t})},handleRadio:function(t){this.form.outSourceProcessSheetCode=t.outSourceProcessSheetCode;var e=t.outSourceProcessSheetProductList;this.itemList=e;var i=e.map(function(t){return r()({},t,{qualifiedNumber:t.productNumber,scrapNumber:"0"})});this.form.outSourceInspectionCertificateProductList=i},changeType:function(t){this.type=t},addCode:function(){this.$refs.eform.dialog=!0,this.$refs.eform.dataType="outSourceInspectionCertificate"}}},f=(i("JoIq"),i("KHd+")),m=Object(f.a)(d,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("eForm",{ref:"eform",on:{setIndex:t.handleRadio}}),t._v(" "),i("div",{directives:[{name:"permission",rawName:"v-permission",value:["ADMIN","OUT_SOURCE_INSPECTION_CERTIFICATE_ALL","OUT_SOURCE_INSPECTION_CERTIFICATE_CREATE"],expression:"['ADMIN','OUT_SOURCE_INSPECTION_CERTIFICATE_ALL','OUT_SOURCE_INSPECTION_CERTIFICATE_CREATE']"}],staticStyle:{display:"inline-block",margin:"0px 2px"}},[i("el-button",{staticClass:"filter-item",attrs:{size:"small",type:"primary"},on:{click:t.add}},[t._v("保存\n    ")])],1),t._v(" "),i("el-form",{ref:"form",attrs:{inline:!0,model:t.form,rules:t.rules,size:"large","label-width":"80px","label-position":"left"}},[i("p",{staticClass:"form-title",staticStyle:{"text-align":"center","font-size":"18px"}},[t._v("\n      无锡市海星船舶动力有限公司\n      "),i("span",{staticStyle:{position:"absolute",right:"30px","font-size":"12px",color:"#666"}},[t._v("\n        单据编号："+t._s(t.form.outSourceInspectionCertificateCode)+"\n      ")])]),t._v(" "),i("p",{staticClass:"form-sub-title",staticStyle:{"text-align":"center"}},[t._v("\n      委外验收单\n    ")]),t._v(" "),i("el-form-item",{attrs:{type:"index","label-width":"350",align:"center",label:"委外加工单"}},[i("el-input",{staticStyle:{width:"200px"},attrs:{size:"mini",placeholder:"请输入内容"},on:{focus:function(e){t.handleFocus()}},model:{value:t.form.outSourceProcessSheetCode,callback:function(e){t.$set(t.form,"outSourceProcessSheetCode",e)},expression:"form.outSourceProcessSheetCode"}},[t.showBtn?i("span",{staticClass:"el-tag  el-tag--mini",staticStyle:{cursor:"pointer","margin-top":"4px"},attrs:{slot:"suffix"},on:{click:function(e){t.addCode()}},slot:"suffix"},[t._v("\n                              选择\n                          ")]):t._e()])],1),t._v(" "),i("Contact",{attrs:{dataList:t.form.outSourceInspectionCertificateProductList,itemList:t.itemList},on:{setContacts:t.handleData}}),t._v(" "),i("el-form-item",{staticStyle:{margin:"20px auto"},attrs:{label:"制单人:",prop:"makePeopleName"}},[t._v("\n      "+t._s(t.form.makePeopleName)+"\n    ")])],1)],1)},[],!1,null,"2c32c5f1",null);m.options.__file="index.vue";e.default=m.exports},eS0p:function(t,e,i){"use strict";var n=i("1zm+");i.n(n).a},oLdV:function(t,e,i){"use strict";i.d(e,"e",function(){return r}),i.d(e,"f",function(){return o}),i.d(e,"b",function(){return a}),i.d(e,"a",function(){return s}),i.d(e,"c",function(){return u}),i.d(e,"d",function(){return c});var n=i("t3Un");function r(){return Object(n.a)({url:"api/initOutSourceProcessSheetCode",method:"get"})}function o(){return Object(n.a)({url:"api/queryOutSourceProcessSheetPage",method:"get"})}function a(t){return Object(n.a)({url:"api/outSourceProcessSheet/"+t,method:"get"})}function s(t){return Object(n.a)({url:"api/outSourceProcessSheet",method:"post",data:t})}function u(t){return Object(n.a)({url:"api/outSourceProcessSheet/"+t,method:"delete"})}function c(t){return Object(n.a)({url:"api/outSourceProcessSheet",method:"put",data:t})}}}]);