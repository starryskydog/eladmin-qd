(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0d25","chunk-06af"],{"/V8q":function(e,t,n){"use strict";var i=/\.\/(.*)\.svg/,o=function(e){return e.keys()}(n("Uf/o")).map(function(e){return e.match(i)[1]});t.a=o},"14Xm":function(e,t,n){e.exports=n("ls82")},"1XQY":function(e,t,n){"use strict";var i=n("jZRq");n.n(i).a},"3ADX":function(e,t,n){"use strict";var i=n("14Xm"),o=n.n(i),a=n("4d7F"),r=n.n(a),s=n("D3Ub"),l=n.n(s),c=n("t3Un");function u(e,t){return Object(c.a)({url:e,method:"get",params:t})}t.a={data:function(){return{loading:!0,data:[],page:0,size:10,total:0,url:"",params:{},query:{},time:170,isAdd:!1}},methods:{init:function(){var e=this;return l()(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.beforeInit();case 2:if(t.sent){t.next=4;break}return t.abrupt("return");case 4:return t.abrupt("return",new r.a(function(t,n){e.loading=!0,u(e.url,e.params).then(function(n){e.total=n.totalElements,e.data=n.content,setTimeout(function(){e.loading=!1},e.time),t(n)}).catch(function(t){e.loading=!1,n(t)})}));case 5:case"end":return t.stop()}},t,e)}))()},beforeInit:function(){return!0},pageChange:function(e){this.page=e-1,this.init()},sizeChange:function(e){this.page=0,this.size=e,this.init()},dleChangePage:function(e){void 0===e&&(e=1),this.data.length===e&&0!==this.page&&(this.page=this.page-1)},toQuery:function(){this.page=0,this.init()}}}},"41Be":function(e,t,n){"use strict";n.d(t,"a",function(){return o});var i=n("Q2AE");function o(e){if(e&&e instanceof Array&&e.length>0){var t=e;return!!(i.a.getters&&i.a.getters.roles).some(function(e){return t.includes(e)})}return console.error("need roles! Like v-permission=\"['admin','editor']\""),!1}},"6bP5":function(e,t,n){"use strict";var i=n("Qq1u");n.n(i).a},"7JPK":function(e,t,n){"use strict";var i=n("e/OT");n.n(i).a},"95TX":function(e,t,n){"use strict";n.r(t);var i=n("41Be"),o=n("itRl"),a=n("3ADX"),r=n("Hycs"),s=n("7Qib"),l=n("Jgmf"),c={components:{treeTable:o.a,eForm:l.default},mixins:[a.a],data:function(){return{columns:[{text:"名称",value:"name"}],delLoading:!1,expand:!0}},created:function(){var e=this;this.$nextTick(function(){e.init()})},methods:{parseTime:s.d,checkPermission:i.a,beforeInit:function(){this.url="api/menus";var e=this.query.value;return this.params={page:this.page,size:this.size,sort:"id,desc"},e&&(this.params.name=e),!0},subDelete:function(e){var t=this;this.delLoading=!0,Object(r.c)(e).then(function(n){t.delLoading=!1,t.$refs[e].doClose(),t.init(),t.$notify({title:"删除成功",type:"success",duration:2500})}).catch(function(n){t.delLoading=!1,t.$refs[e].doClose(),console.log(n.response.data.message)})},add:function(){this.isAdd=!0,this.$refs.form.getMenus(),this.$refs.form.dialog=!0},edit:function(e){this.isAdd=!1;var t=this.$refs.form;t.getMenus(),t.form={id:e.id,component:e.component,name:e.name,sort:e.sort,pid:e.pid,path:e.path,iframe:e.iframe.toString(),roles:[],icon:e.icon},t.dialog=!0},changExpand:function(){this.expand=!this.expand,this.init()}}},u=(n("7JPK"),n("KHd+")),d=Object(u.a)(c,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"head-container"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"输入名称搜索"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.toQuery(t):null}},model:{value:e.query.value,callback:function(t){e.$set(e.query,"value",t)},expression:"query.value"}}),e._v(" "),n("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"success",icon:"el-icon-search"},on:{click:e.toQuery}},[e._v("搜索")]),e._v(" "),n("div",{directives:[{name:"permission",rawName:"v-permission",value:["ADMIN","MENU_ALL","MENU_CREATE"],expression:"['ADMIN','MENU_ALL','MENU_CREATE']"}],staticStyle:{display:"inline-block",margin:"0px 2px"}},[n("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-plus"},on:{click:e.add}},[e._v("新增")])],1),e._v(" "),n("div",{staticStyle:{display:"inline-block"}},[n("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"warning",icon:"el-icon-more"},on:{click:e.changExpand}},[e._v(e._s(e.$parent.expand?"折叠":"展开"))]),e._v(" "),n("eForm",{ref:"form",attrs:{"is-add":!0}})],1)],1),e._v(" "),n("eForm",{ref:"form",attrs:{"is-add":e.isAdd}}),e._v(" "),n("tree-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.data,"expand-all":e.expand,columns:e.columns,size:"small"}},[n("el-table-column",{attrs:{prop:"icon",label:"图标",align:"center",width:"80px"},scopedSlots:e._u([{key:"default",fn:function(e){return[n("svg-icon",{attrs:{"icon-class":e.row.icon}})]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"sort",align:"center",width:"100px",label:"排序"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-tag",[e._v(e._s(t.row.sort))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"path",label:"链接地址"}}),e._v(" "),n("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"component",label:"组件路径"}}),e._v(" "),n("el-table-column",{attrs:{prop:"iframe",width:"100px",label:"内部菜单"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.iframe?n("span",[e._v("否")]):n("span",[e._v("是")])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"createTime",label:"创建日期"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e.parseTime(t.row.createTime)))])]}}])}),e._v(" "),e.checkPermission(["ADMIN","MENU_ALL","MENU_EDIT","MENU_DELETE"])?n("el-table-column",{attrs:{label:"操作",width:"130px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["ADMIN","MENU_ALL","MENU_EDIT"],expression:"['ADMIN','MENU_ALL','MENU_EDIT']"}],attrs:{size:"mini",type:"primary",icon:"el-icon-edit"},on:{click:function(n){e.edit(t.row)}}}),e._v(" "),n("el-popover",{directives:[{name:"permission",rawName:"v-permission",value:["ADMIN","MENU_ALL","MENU_DELETE"],expression:"['ADMIN','MENU_ALL','MENU_DELETE']"}],ref:t.row.id,attrs:{placement:"top",width:"200"}},[n("p",[e._v("确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！")]),e._v(" "),n("div",{staticStyle:{"text-align":"right",margin:"0"}},[n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(n){e.$refs[t.row.id].doClose()}}},[e._v("取消")]),e._v(" "),n("el-button",{attrs:{loading:e.delLoading,type:"primary",size:"mini"},on:{click:function(n){e.subDelete(t.row.id)}}},[e._v("确定")])],1),e._v(" "),n("el-button",{attrs:{slot:"reference",type:"danger",icon:"el-icon-delete",size:"mini"},slot:"reference"})],1)]}}])}):e._e()],1)],1)},[],!1,null,"59016e3a",null);d.options.__file="index.vue";t.default=d.exports},D3Ub:function(e,t,n){"use strict";t.__esModule=!0;var i=function(e){return e&&e.__esModule?e:{default:e}}(n("4d7F"));t.default=function(e){return function(){var t=e.apply(this,arguments);return new i.default(function(e,n){return function o(a,r){try{var s=t[a](r),l=s.value}catch(e){return void n(e)}if(!s.done)return i.default.resolve(l).then(function(e){o("next",e)},function(e){o("throw",e)});e(l)}("next")})}}},"G+Eq":function(e,t,n){"use strict";var i=n("k5Zz");n.n(i).a},HufR:function(e,t,n){"use strict";var i=n("oDta");n.n(i).a},Jgmf:function(e,t,n){"use strict";n.r(t);var i=n("Hycs"),o=n("cCY5"),a=n.n(o),r=n("/V8q"),s={name:"IconSelect",data:function(){return{name:"",iconList:r.a}},methods:{filterIcons:function(){var e=this;this.name?this.iconList=this.iconList.filter(function(t){return t.includes(e.name)}):this.iconList=r.a},selectedIcon:function(e){this.$emit("selected",e),document.body.click()},reset:function(){this.name="",this.iconList=r.a}}},l=(n("HufR"),n("KHd+")),c=Object(l.a)(s,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"icon-body"},[n("el-input",{staticStyle:{position:"relative"},attrs:{clearable:"",placeholder:"请输入图标名称"},on:{clear:e.filterIcons},nativeOn:{input:function(t){return e.filterIcons(t)}},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}},[n("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})]),e._v(" "),n("div",{staticClass:"icon-list"},e._l(e.iconList,function(t,i){return n("div",{key:i,on:{click:function(n){e.selectedIcon(t)}}},[n("svg-icon",{staticStyle:{height:"30px",width:"16px"},attrs:{"icon-class":t}}),e._v(" "),n("span",[e._v(e._s(t))])],1)}))],1)},[],!1,null,"1628183e",null);c.options.__file="index.vue";var u=c.exports,d=(n("VCwm"),{components:{Treeselect:a.a,IconSelect:u},props:{isAdd:{type:Boolean,required:!0}},data:function(){return{loading:!1,dialog:!1,menus:[],form:{name:"",sort:999,path:"",component:"",iframe:"false",roles:[],pid:0,icon:""},rules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}],sort:[{required:!0,message:"请输入序号",trigger:"blur",type:"number"}],iframe:[{required:!0,message:"请选择菜单类型",trigger:"blur"}]}}},methods:{cancel:function(){this.resetForm()},doSubmit:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return!1;e.loading=!0,e.isAdd?e.doAdd():e.doEdit()})},doAdd:function(){var e=this;Object(i.a)(this.form).then(function(t){e.resetForm(),e.$notify({title:"添加成功",type:"success",duration:2500}),e.loading=!1,e.$parent.init()}).catch(function(t){e.loading=!1,console.log(t.response.data.message)})},doEdit:function(){var e=this;Object(i.d)(this.form).then(function(t){e.resetForm(),e.$notify({title:"修改成功",type:"success",duration:2500}),e.loading=!1,e.$parent.init()}).catch(function(t){e.loading=!1,console.log(t.response.data.message)})},resetForm:function(){this.dialog=!1,this.$refs.form.resetFields(),this.form={name:"",sort:999,path:"",component:"",iframe:"false",roles:[],pid:0,icon:""}},selected:function(e){this.form.icon=e},getMenus:function(){var e=this;Object(i.e)().then(function(t){e.menus=[];var n={id:0,label:"顶级类目",children:[]};n.children=t,e.menus.push(n)})}}}),f=(n("G+Eq"),Object(l.a)(d,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-dialog",{attrs:{visible:e.dialog,title:e.isAdd?"新增菜单":"编辑菜单","append-to-body":"",width:"600px"},on:{"update:visible":function(t){e.dialog=t}}},[n("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,size:"small","label-width":"80px"}},[n("el-form-item",{attrs:{label:"菜单图标"}},[n("el-popover",{attrs:{placement:"bottom-start",width:"460",trigger:"click"},on:{show:function(t){e.$refs.iconSelect.reset()}}},[n("IconSelect",{ref:"iconSelect",on:{selected:e.selected}}),e._v(" "),n("el-input",{staticStyle:{width:"460px"},attrs:{slot:"reference",placeholder:"点击选择图标",readonly:""},slot:"reference",model:{value:e.form.icon,callback:function(t){e.$set(e.form,"icon",t)},expression:"form.icon"}},[e.form.icon?n("svg-icon",{staticClass:"el-input__icon",staticStyle:{height:"32px",width:"16px"},attrs:{slot:"prefix","icon-class":e.form.icon},slot:"prefix"}):n("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"prefix"},slot:"prefix"})],1)],1)],1),e._v(" "),n("el-form-item",{attrs:{label:"菜单名称",prop:"name"}},[n("el-input",{staticStyle:{width:"460px"},attrs:{placeholder:"名称"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"菜单排序",prop:"sort"}},[n("el-input-number",{staticStyle:{width:"460px"},attrs:{min:0,max:999,"controls-position":"right"},model:{value:e.form.sort,callback:function(t){e.$set(e.form,"sort",e._n(t))},expression:"form.sort"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"内部菜单",prop:"iframe"}},[n("el-radio",{attrs:{label:"false"},model:{value:e.form.iframe,callback:function(t){e.$set(e.form,"iframe",t)},expression:"form.iframe"}},[e._v("是")]),e._v(" "),n("el-radio",{attrs:{label:"true"},model:{value:e.form.iframe,callback:function(t){e.$set(e.form,"iframe",t)},expression:"form.iframe"}},[e._v("否")])],1),e._v(" "),n("el-form-item",{attrs:{label:"链接地址"}},[n("el-input",{staticStyle:{width:"460px"},attrs:{placeholder:"菜单路径"},model:{value:e.form.path,callback:function(t){e.$set(e.form,"path",t)},expression:"form.path"}})],1),e._v(" "),"false"===e.form.iframe?n("el-form-item",{attrs:{label:"组件路径"}},[n("el-input",{staticStyle:{width:"460px"},attrs:{placeholder:"菜单路径"},model:{value:e.form.component,callback:function(t){e.$set(e.form,"component",t)},expression:"form.component"}})],1):e._e(),e._v(" "),n("el-form-item",{attrs:{label:"上级类目"}},[n("treeselect",{staticStyle:{width:"460px"},attrs:{options:e.menus,placeholder:"选择上级类目"},model:{value:e.form.pid,callback:function(t){e.$set(e.form,"pid",t)},expression:"form.pid"}})],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"text"},on:{click:e.cancel}},[e._v("取消")]),e._v(" "),n("el-button",{attrs:{loading:e.loading,type:"primary"},on:{click:e.doSubmit}},[e._v("确认")])],1)],1)},[],!1,null,"7d9d528c",null));f.options.__file="form.vue";t.default=f.exports},Qq1u:function(e,t,n){},"e/OT":function(e,t,n){},itRl:function(e,t,n){"use strict";var i=n("jr1U"),o=n.n(i),a=n("rfXi"),r=n.n(a),s=n("Kw5r");function l(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,o=[];return r()(e).forEach(function(e){void 0===e._expanded&&s.default.set(e,"_expanded",t);var a=1;if(void 0!==i&&null!==i&&(a=i+1),s.default.set(e,"_level",a),n&&s.default.set(e,"parent",n),o.push(e),e.children&&e.children.length>0){var r=l(e.children,t,e,a);o=o.concat(r)}}),o}var c={name:"TreeTable",props:{data:{type:[Array,Object],required:!0},columns:{type:Array,default:function(){return[]}},evalFunc:Function,evalArgs:Array,expandAll:{type:Boolean,default:!1}},computed:{formatData:function(){var e=void 0;e=Array.isArray(this.data)?this.data:[this.data];var t=this.evalFunc||l,n=this.evalArgs?o()([e,this.expandAll],this.evalArgs):[e,this.expandAll];return t.apply(null,n)}},methods:{showRow:function(e){var t=!e.row.parent||e.row.parent._expanded&&e.row.parent._show;return e.row._show=t,t?"animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;":"display:none;"},toggleExpanded:function(e){var t=this.formatData[e];t._expanded=!t._expanded},iconShow:function(e,t){return 0===e&&t.children&&t.children.length>0}}},u=(n("6bP5"),n("1XQY"),n("KHd+")),d=Object(u.a)(c,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-table",e._b({attrs:{data:e.formatData,"row-style":e.showRow}},"el-table",e.$attrs,!1),[0===e.columns.length?n("el-table-column",{attrs:{width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._l(t.row._level,function(e){return n("span",{key:e,staticClass:"ms-tree-space"})}),e._v(" "),e.iconShow(0,t.row)?n("span",{staticClass:"tree-ctrl",on:{click:function(n){e.toggleExpanded(t.$index)}}},[t.row._expanded?n("i",{staticClass:"el-icon-minus"}):n("i",{staticClass:"el-icon-plus"})]):e._e(),e._v("\n      "+e._s(t.$index)+"\n    ")]}}])}):e._l(e.columns,function(t,i){return n("el-table-column",{key:t.value,attrs:{label:t.text,width:t.width},scopedSlots:e._u([{key:"default",fn:function(o){return[e._l(o.row._level,function(t){return 0===i?n("span",{key:t,staticClass:"ms-tree-space"}):e._e()}),e._v(" "),e.iconShow(i,o.row)?n("span",{staticClass:"tree-ctrl",on:{click:function(t){e.toggleExpanded(o.$index)}}},[o.row._expanded?n("i",{staticClass:"el-icon-minus"}):n("i",{staticClass:"el-icon-plus"})]):e._e(),e._v("\n      "+e._s(o.row[t.value])+"\n    ")]}}])})}),e._v(" "),e._t("default")],2)},[],!1,null,"60a8d106",null);d.options.__file="index.vue";t.a=d.exports},jZRq:function(e,t,n){},jr1U:function(e,t,n){e.exports={default:n("wObO"),__esModule:!0}},k5Zz:function(e,t,n){},oDta:function(e,t,n){},wObO:function(e,t){e.exports=function(){return Function.call.apply(Array.prototype.concat,arguments)}}}]);