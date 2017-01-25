/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

eval("\r\nVue.component('boards', {\r\n\ttemplate: '#boards-template',\r\n\tdata: function(){\r\n\t\treturn {\r\n\t\t\tlist: []\r\n\t\t}\r\n\t},\r\n\tcreated: function created(){\r\n\t\tthis.fetchBoards();\r\n\t},\r\n\tmethods:{\r\n\t\tfetchBoards: function fetchBoards(){\r\n\t\t\treturn {};\r\n\t\t},\r\n\t\tdeleteBoard: function deleteBoard(board){\r\n\t\t\tthis.list.splice(this.list.indexOf(board),1);\r\n\t\t}\r\n\t}\r\n});\r\n\r\n\r\n\r\nVue.component('list', {\r\n\ttemplate: '#list-template',\r\n\tprops: ['list_id'],\r\n\tdata: function(){\r\n\t\treturn {\r\n\t\t\tlists: [],\r\n\t\t\ttempEdit: \"\",\r\n\t\t}\r\n\t},\r\n\tcreated: function(){\r\n\t\tthis.fetchTaskLists();\r\n\t},\r\n\tmethods: {\r\n\t\tfetchTaskLists: function(){\n\t\t\tvar this$1 = this;\n\r\n\t\t\tvar resource = this.$resource('api/lists{/id}');\r\n\r\n\t\t\tresource.get({ id : this.list_id }).then(function (lists) {\r\n\r\n\t\t\t\tfor (var i = 0; i < lists.data.length; i++) {\r\n\t\t\t\t\tlists.data[i]['edit'] = false;\r\n\t\t\t\t\tlists.data[i]['title'] = lists.data[i]['title'].trim();\r\n\t\t\t\t}\r\n\r\n\t\t\t\tthis$1.lists = lists.data;\r\n\t\t\t});\r\n\t\t},\r\n\t\tdeleteTask: function(task){\r\n\t\t\tthis.lists.splice(this.lists.indexOf(task),1);\r\n\t\t},\r\n\t\ttoggleEditTitle: function(idx, list){\n\t\t\tvar this$1 = this;\n\r\n\t\t\tlist.edit = true;\r\n\t        // Focus input field\r\n        \tsetTimeout(function (){\r\n        \t\tthis$1.$refs['editTitleInput'][idx].focus();\r\n        \t\tthis$1.$refs['editTitleInput'][idx].select();\r\n            \tthis$1.autoHeight(this$1.$refs['editTitleInput'][idx]);\r\n        \t},1);\r\n\r\n        \tthis.tempEdit = list.title;\r\n\t\t},\r\n\t\tautoHeight: function autoHeight(o){\r\n\t\t\to.style.height = \"1px\";\r\n\t\t    o.style.height = (o.scrollHeight)+\"px\";\r\n\t\t},\r\n\t\tupdateTitle: function updateTitle(list){\n\t\t\tvar this$1 = this;\n\r\n\t\t\tlist.edit = false;\r\n\r\n\t\t\tlist.title = list.title.trim();\r\n\r\n\t\t\tif(this.tempEdit != list.title){\r\n\t\t\t\tthis.$http.patch('api/lists/'+list.id, {title: list.title}).then(function (ret) {\r\n\t\t\t\t\tthis$1.tempEdit = list.title\r\n\t\t\t\t});\r\n\t\t\t}\r\n\t\t},\r\n\t\tblurTextarea: function blurTextarea(e){\r\n\t\t\te.preventDefault();\r\n\t\t\te.target.blur();\r\n\t\t}\r\n\t}\r\n});\r\n\r\nVue.component('tasks', {\r\n\ttemplate: \"#tasks-template\",\r\n\tprops: [\"list\"],\r\n\tmethods: {\r\n\t\tdeleteTask: function(task){\r\n\t\t\tthis.list.splice(this.list.indexOf(task),1);\r\n\t\t}\r\n\t}\r\n});\r\n\r\nnew Vue({\r\n\tel: \"#board\",\r\n\tdata: {\r\n\r\n\t}\r\n});//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL21haW4uanM/NmU0YiJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuVnVlLmNvbXBvbmVudCgnYm9hcmRzJywge1xyXG5cdHRlbXBsYXRlOiAnI2JvYXJkcy10ZW1wbGF0ZScsXHJcblx0ZGF0YTogZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGxpc3Q6IFtdXHJcblx0XHR9XHJcblx0fSxcclxuXHRjcmVhdGVkKCl7XHJcblx0XHR0aGlzLmZldGNoQm9hcmRzKCk7XHJcblx0fSxcclxuXHRtZXRob2RzOntcclxuXHRcdGZldGNoQm9hcmRzKCl7XHJcblx0XHRcdHJldHVybiB7fTtcclxuXHRcdH0sXHJcblx0XHRkZWxldGVCb2FyZChib2FyZCl7XHJcblx0XHRcdHRoaXMubGlzdC5zcGxpY2UodGhpcy5saXN0LmluZGV4T2YoYm9hcmQpLDEpO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcblxyXG5cclxuXHJcblZ1ZS5jb21wb25lbnQoJ2xpc3QnLCB7XHJcblx0dGVtcGxhdGU6ICcjbGlzdC10ZW1wbGF0ZScsXHJcblx0cHJvcHM6IFsnbGlzdF9pZCddLFxyXG5cdGRhdGE6IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRsaXN0czogW10sXHJcblx0XHRcdHRlbXBFZGl0OiBcIlwiLFxyXG5cdFx0fVxyXG5cdH0sXHJcblx0Y3JlYXRlZDogZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMuZmV0Y2hUYXNrTGlzdHMoKTtcclxuXHR9LFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdGZldGNoVGFza0xpc3RzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgcmVzb3VyY2UgPSB0aGlzLiRyZXNvdXJjZSgnYXBpL2xpc3Rzey9pZH0nKTtcclxuXHJcblx0XHRcdHJlc291cmNlLmdldCh7IGlkIDogdGhpcy5saXN0X2lkIH0pLnRoZW4oKGxpc3RzKSA9PiB7XHJcblxyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdHMuZGF0YS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0bGlzdHMuZGF0YVtpXVsnZWRpdCddID0gZmFsc2U7XHJcblx0XHRcdFx0XHRsaXN0cy5kYXRhW2ldWyd0aXRsZSddID0gbGlzdHMuZGF0YVtpXVsndGl0bGUnXS50cmltKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLmxpc3RzID0gbGlzdHMuZGF0YTtcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0ZGVsZXRlVGFzazogZnVuY3Rpb24odGFzayl7XHJcblx0XHRcdHRoaXMubGlzdHMuc3BsaWNlKHRoaXMubGlzdHMuaW5kZXhPZih0YXNrKSwxKTtcclxuXHRcdH0sXHJcblx0XHR0b2dnbGVFZGl0VGl0bGU6IGZ1bmN0aW9uKGlkeCwgbGlzdCl7XHJcblx0XHRcdGxpc3QuZWRpdCA9IHRydWU7XHJcblx0ICAgICAgICAvLyBGb2N1cyBpbnB1dCBmaWVsZFxyXG4gICAgICAgIFx0c2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgIFx0XHR0aGlzLiRyZWZzWydlZGl0VGl0bGVJbnB1dCddW2lkeF0uZm9jdXMoKTtcclxuICAgICAgICBcdFx0dGhpcy4kcmVmc1snZWRpdFRpdGxlSW5wdXQnXVtpZHhdLnNlbGVjdCgpO1xyXG4gICAgICAgICAgICBcdHRoaXMuYXV0b0hlaWdodCh0aGlzLiRyZWZzWydlZGl0VGl0bGVJbnB1dCddW2lkeF0pO1xyXG4gICAgICAgIFx0fSwxKTtcclxuXHJcbiAgICAgICAgXHR0aGlzLnRlbXBFZGl0ID0gbGlzdC50aXRsZTtcclxuXHRcdH0sXHJcblx0XHRhdXRvSGVpZ2h0KG8pe1xyXG5cdFx0XHRvLnN0eWxlLmhlaWdodCA9IFwiMXB4XCI7XHJcblx0XHQgICAgby5zdHlsZS5oZWlnaHQgPSAoby5zY3JvbGxIZWlnaHQpK1wicHhcIjtcclxuXHRcdH0sXHJcblx0XHR1cGRhdGVUaXRsZShsaXN0KXtcclxuXHRcdFx0bGlzdC5lZGl0ID0gZmFsc2U7XHJcblxyXG5cdFx0XHRsaXN0LnRpdGxlID0gbGlzdC50aXRsZS50cmltKCk7XHJcblxyXG5cdFx0XHRpZih0aGlzLnRlbXBFZGl0ICE9IGxpc3QudGl0bGUpe1xyXG5cdFx0XHRcdHRoaXMuJGh0dHAucGF0Y2goJ2FwaS9saXN0cy8nK2xpc3QuaWQsIHt0aXRsZTogbGlzdC50aXRsZX0pLnRoZW4oKHJldCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy50ZW1wRWRpdCA9IGxpc3QudGl0bGVcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGJsdXJUZXh0YXJlYShlKXtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRlLnRhcmdldC5ibHVyKCk7XHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcblZ1ZS5jb21wb25lbnQoJ3Rhc2tzJywge1xyXG5cdHRlbXBsYXRlOiBcIiN0YXNrcy10ZW1wbGF0ZVwiLFxyXG5cdHByb3BzOiBbXCJsaXN0XCJdLFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdGRlbGV0ZVRhc2s6IGZ1bmN0aW9uKHRhc2spe1xyXG5cdFx0XHR0aGlzLmxpc3Quc3BsaWNlKHRoaXMubGlzdC5pbmRleE9mKHRhc2spLDEpO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcblxyXG5uZXcgVnVlKHtcclxuXHRlbDogXCIjYm9hcmRcIixcclxuXHRkYXRhOiB7XHJcblxyXG5cdH1cclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvanMvbWFpbi5qcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);