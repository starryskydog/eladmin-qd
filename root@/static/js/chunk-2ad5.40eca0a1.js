(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2ad5"],{"4QO8":function(i,t,s){},Bhgr:function(i,t,s){"use strict";s.r(t);var e=s("EJiy"),n=s.n(e),c=s("vDqi"),a=s.n(c),l={props:["propList"],data:function(){return{mapJson:"../../../static/map.json",provinceList:[],shi1:[],qu1:[],cityList:[],block:[],addressList:[]}},created:function(){this.getCityData(),this.addressList=this.propList},watch:{propList:function(i){this.addressList=i}},methods:{getCityData:function(){var i=this;a.a.get(this.mapJson).then(function(t){if(200==t.status){var s=t.data;for(var e in i.provinceList=[],i.cityList=[],i.block=[],s)e.match(/0000$/)?i.provinceList.push({id:e,value:s[e],children:[]}):e.match(/00$/)?i.cityList.push({id:e,value:s[e],children:[]}):i.block.push({id:e,value:s[e]});for(var n in i.provinceList)for(var c in i.cityList)i.provinceList[n].id.slice(0,2)===i.cityList[c].id.slice(0,2)&&i.provinceList[n].children.push(i.cityList[c]);for(var a in i.cityList)for(var l in i.block)i.block[l].id.slice(0,4)===i.cityList[a].id.slice(0,4)&&i.cityList[a].children.push(i.block[l])}else console.log(t.status)}).catch(function(i){console.log(n()(+i))})},choseProvince:function(i,t){for(var s in this.provinceList)i===this.provinceList[s].id&&(this.shi1=this.provinceList[s].children,this.addressList[t].city=this.provinceList[s].children[0].value,this.qu1=this.provinceList[s].children[0].children,this.addressList[t].area=this.provinceList[s].children[0].children[0].value,this.E=this.qu1[0].id,this.addressList[t].province=this.provinceList[s].value);this.setAddress()},choseCity:function(i,t){for(var s in this.cityList)i===this.cityList[s].id&&(this.qu1=this.cityList[s].children,this.addressList[t].area=this.cityList[s].children[0].value,this.E=this.qu1[0].id,this.addressList[t].city=this.cityList[s].value);this.setAddress()},choseBlock:function(i,t){for(var s in this.E=i,this.block)i===this.block[s].id&&(this.addressList[t].area=this.block[s].value);this.setAddress()},add:function(){this.propList.push({province:"",city:"",area:"",addressDetail:""})},subDelete:function(i){i>0?this.propList.splice(i,1):this.$notify({title:"至少保留一行",type:"warning",duration:2500})},setAddress:function(){this.$emit("setAddress",this.propList)}}},r=(s("n7u8"),s("KHd+")),o=Object(r.a)(l,function(){var i=this,t=i.$createElement,s=i._self._c||t;return s("div",{staticClass:"linkage"},i._l(i.addressList,function(t,e){return s("div",{key:e,staticStyle:{"margin-bottom":"20px"}},[s("span",{staticClass:"label"},[i._v("\n      联系地址"+i._s(e+1)+"：\n    ")]),i._v(" "),s("el-select",{staticStyle:{width:"100px"},attrs:{size:"small",placeholder:"省级地区"},on:{change:function(t){i.choseProvince(t,e)}},model:{value:t.province,callback:function(s){i.$set(t,"province",s)},expression:"v.province"}},i._l(i.provinceList,function(i){return s("el-option",{key:i.id,attrs:{label:i.value,value:i.id}})})),i._v(" "),s("el-select",{staticStyle:{width:"100px"},attrs:{size:"small",placeholder:"市级地区"},on:{change:function(t){i.choseCity(t,e)}},model:{value:t.city,callback:function(s){i.$set(t,"city",s)},expression:"v.city"}},i._l(i.shi1,function(i){return s("el-option",{key:i.id,attrs:{label:i.value,value:i.id}})})),i._v(" "),s("el-select",{staticStyle:{width:"100px"},attrs:{size:"small",placeholder:"区级地区"},on:{change:function(t){i.choseBlock(t,e)}},model:{value:t.area,callback:function(s){i.$set(t,"area",s)},expression:"v.area"}},i._l(i.qu1,function(i){return s("el-option",{key:i.id,attrs:{label:i.value,value:i.id}})})),i._v(" "),s("el-input",{staticStyle:{width:"250px"},attrs:{placeholder:"详细地址",size:"small"},on:{change:i.setAddress},model:{value:t.addressDetail,callback:function(s){i.$set(t,"addressDetail",s)},expression:"v.addressDetail"}}),i._v(" "),s("el-button",{attrs:{type:"primary",size:"small"},on:{click:i.add}},[i._v("添加")]),i._v(" "),s("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(t){i.subDelete(e)}}},[i._v("删除")])],1)}))},[],!1,null,"2dc0939d",null);o.options.__file="address.vue";t.default=o.exports},n7u8:function(i,t,s){"use strict";var e=s("4QO8");s.n(e).a}}]);