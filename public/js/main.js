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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ function(module, exports) {

eval("\r\nVue.component('boards', {\r\n\ttemplate: '#boards-template',\r\n\tdata: function(){\r\n\t\treturn {\r\n\t\t\tlist: []\r\n\t\t}\r\n\t},\r\n\tcreated: function created(){\r\n\t\tthis.fetchBoards();\r\n\t},\r\n\tmethods:{\r\n\t\tfetchBoards: function fetchBoards(){\r\n\t\t\treturn {};\r\n\t\t},\r\n\t\tdeleteBoard: function deleteBoard(board){\r\n\t\t\tthis.list.splice(this.list.indexOf(board),1);\r\n\t\t}\r\n\t}\r\n});\r\n\r\n\r\n\r\nVue.component('list', {\r\n\ttemplate: '#list-template',\r\n\tprops: ['list_id'],\r\n\tdata: function(){\r\n\t\treturn {\r\n\t\t\tlists: [],\r\n\t\t\ttempEdit: \"\",\r\n\t\t\ttempTask: \"\"\r\n\t\t}\r\n\t},\r\n\tcreated: function(){\r\n\t\tthis.fetchTaskLists();\r\n\t},\r\n\tmethods: {\r\n\t\tfetchTaskLists: function(){\n\t\t\tvar this$1 = this;\n\r\n\t\t\tvar resource = this.$resource('api/lists{/id}');\r\n\r\n\t\t\tresource.get({ id : this.list_id }).then(function (lists) {\r\n\r\n\t\t\t\t// insert new fields\r\n\t\t\t\tfor (var i = 0; i < lists.data.length; i++) {\r\n\t\t\t\t\tlists.data[i]['edit']    = false;\r\n\t\t\t\t\tlists.data[i]['newTask'] = false;\r\n\t\t\t\t\tlists.data[i]['title']   = lists.data[i]['title'].trim();\r\n\t\t\t\t}\r\n\r\n\t\t\t\tthis$1.lists = lists.data;\r\n\t\t\t});\r\n\t\t},\r\n\t\tdeleteTask: function(task){\r\n\t\t\tthis.lists.splice(this.lists.indexOf(task),1);\r\n\t\t},\r\n\t\ttoggleEditTitle: function(idx, list){\n\t\t\tvar this$1 = this;\n\r\n\t\t\tlist.edit = true;\r\n\t        // Focus input field\r\n        \tsetTimeout(function (){\r\n        \t\tthis$1.$refs['editTitleInput'][idx].focus();\r\n        \t\tthis$1.$refs['editTitleInput'][idx].select();\r\n            \tthis$1.autoHeight(this$1.$refs['editTitleInput'][idx]);\r\n        \t},1);\r\n\r\n        \tthis.tempEdit = list.title;\r\n\t\t},\r\n\t\tautoHeight: function autoHeight(o){\r\n\t\t\to.style.height = \"1px\";\r\n\t\t    o.style.height = (o.scrollHeight)+\"px\";\r\n\t\t},\r\n\t\tupdateTitle: function updateTitle(list){\n\t\t\tvar this$1 = this;\n\r\n\t\t\tlist.edit = false;\r\n\r\n\t\t\tlist.title = list.title.trim();\r\n\r\n\t\t\tif(list.title == \"\"){\r\n\t\t\t\tlist.title = this.tempEdit;\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tif(this.tempEdit != list.title){\r\n\t\t\t\tthis.$http.patch('api/lists/'+list.id, {title: list.title}).then(function (ret) {\r\n\t\t\t\t\tthis$1.tempEdit = list.title\r\n\t\t\t\t});\r\n\t\t\t}\r\n\t\t},\r\n\t\tblurTextarea: function blurTextarea(e){\r\n\t\t\te.preventDefault();\r\n\t\t\te.target.blur();\r\n\t\t},\r\n\t\tcancelNewTask: function cancelNewTask(list){\r\n\t\t\tlist.newTask = false;\r\n\t\t},\r\n\t\tnewTask: function newTask(idx,list){\n\t\t\tvar this$1 = this;\n\r\n\t\t\tlist.newTask = true;\r\n\r\n\t\t\t// Focus input field\r\n        \tsetTimeout(function (){\r\n        \t\tthis$1.$refs['newTaskInput'][idx].focus();\r\n        \t\tthis$1.$refs['newTaskInput'][idx].select();\r\n            \tthis$1.autoHeight(this$1.$refs['newTaskInput'][idx]);\r\n        \t},1);\r\n\t\t},\r\n\t\tsubmitTask: function submitTask(list){\r\n\t\t\tthis.tempTask = this.tempTask.trim();\r\n\r\n\t\t\tvar body = this.tempTask;\r\n\t\t\t\r\n\r\n\t\t\tif(body != \"\"){\r\n\r\n\r\n\t\t\t\t/*this.lists[this.lists.indexOf(list)].push({\r\n\t\t\t\t\tbody: body,\r\n\t\t\t\t\tcompleted: 0,\r\n\t\t\t\t\tcreated_at: \"\",\r\n\t\t\t\t\ttask_list_id: list.id,\r\n\t\t\t\t\tupdated_at: \"\",\r\n\t\t\t\t\tid: 0\r\n\t\t\t\t});*/\r\n\r\n\t\t\t\tlist.tasks.push({\r\n\t\t\t\t\tbody: body,\r\n\t\t\t\t\tcompleted: 0,\r\n\t\t\t\t\tcreated_at: \"\",\r\n\t\t\t\t\ttask_list_id: list.id,\r\n\t\t\t\t\tupdated_at: \"\",\r\n\t\t\t\t\tid: 0\r\n\t\t\t\t});\r\n\r\n\t\t\t\tthis.$http.put('api/tasks', {body: body, task_list_id: list.id}).then(function (ret) {\r\n\t\t\t\t\tlist.tasks[list.tasks.length-1].id = ret.body;\r\n\t\t\t\t});\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n});\r\n\r\nVue.component('tasks', {\r\n\ttemplate: \"#tasks-template\",\r\n\tprops: [\"list\",\"id\"],\r\n\tmethods: {\r\n\t\tdeleteTask: function(task){\r\n\t\t\tthis.list.splice(this.list.indexOf(task),1);\r\n\t\t},\r\n\t\tmovedTask: function movedTask(evt){\r\n\t\t\tvar id = undefined;\r\n\t\t\tif(evt.added != undefined){\r\n\t\t\t\tid = evt.added.element.id;\r\n\t\t\t\tthis.$http.patch('api/tasks/'+id+'/move', {task_list_id: this.id}).then(function (ret) {\r\n\t\t\t\t\tconsole.log(\"moved\");\r\n\t\t\t\t});\r\n\t\t\t}else if(evt.moved != undefined){\r\n\t\t\t\tid = evt.moved.element.id;\r\n\t\t\t}else{\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n});\r\n\r\nnew Vue({\r\n\tel: \"#board\",\r\n\tdata: {\r\n\r\n\t}\r\n});//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL21haW4uanM/NmU0YiJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuVnVlLmNvbXBvbmVudCgnYm9hcmRzJywge1xyXG5cdHRlbXBsYXRlOiAnI2JvYXJkcy10ZW1wbGF0ZScsXHJcblx0ZGF0YTogZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGxpc3Q6IFtdXHJcblx0XHR9XHJcblx0fSxcclxuXHRjcmVhdGVkKCl7XHJcblx0XHR0aGlzLmZldGNoQm9hcmRzKCk7XHJcblx0fSxcclxuXHRtZXRob2RzOntcclxuXHRcdGZldGNoQm9hcmRzKCl7XHJcblx0XHRcdHJldHVybiB7fTtcclxuXHRcdH0sXHJcblx0XHRkZWxldGVCb2FyZChib2FyZCl7XHJcblx0XHRcdHRoaXMubGlzdC5zcGxpY2UodGhpcy5saXN0LmluZGV4T2YoYm9hcmQpLDEpO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcblxyXG5cclxuXHJcblZ1ZS5jb21wb25lbnQoJ2xpc3QnLCB7XHJcblx0dGVtcGxhdGU6ICcjbGlzdC10ZW1wbGF0ZScsXHJcblx0cHJvcHM6IFsnbGlzdF9pZCddLFxyXG5cdGRhdGE6IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRsaXN0czogW10sXHJcblx0XHRcdHRlbXBFZGl0OiBcIlwiLFxyXG5cdFx0XHR0ZW1wVGFzazogXCJcIlxyXG5cdFx0fVxyXG5cdH0sXHJcblx0Y3JlYXRlZDogZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMuZmV0Y2hUYXNrTGlzdHMoKTtcclxuXHR9LFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdGZldGNoVGFza0xpc3RzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgcmVzb3VyY2UgPSB0aGlzLiRyZXNvdXJjZSgnYXBpL2xpc3Rzey9pZH0nKTtcclxuXHJcblx0XHRcdHJlc291cmNlLmdldCh7IGlkIDogdGhpcy5saXN0X2lkIH0pLnRoZW4oKGxpc3RzKSA9PiB7XHJcblxyXG5cdFx0XHRcdC8vIGluc2VydCBuZXcgZmllbGRzXHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0cy5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRsaXN0cy5kYXRhW2ldWydlZGl0J10gICAgPSBmYWxzZTtcclxuXHRcdFx0XHRcdGxpc3RzLmRhdGFbaV1bJ25ld1Rhc2snXSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0bGlzdHMuZGF0YVtpXVsndGl0bGUnXSAgID0gbGlzdHMuZGF0YVtpXVsndGl0bGUnXS50cmltKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLmxpc3RzID0gbGlzdHMuZGF0YTtcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0ZGVsZXRlVGFzazogZnVuY3Rpb24odGFzayl7XHJcblx0XHRcdHRoaXMubGlzdHMuc3BsaWNlKHRoaXMubGlzdHMuaW5kZXhPZih0YXNrKSwxKTtcclxuXHRcdH0sXHJcblx0XHR0b2dnbGVFZGl0VGl0bGU6IGZ1bmN0aW9uKGlkeCwgbGlzdCl7XHJcblx0XHRcdGxpc3QuZWRpdCA9IHRydWU7XHJcblx0ICAgICAgICAvLyBGb2N1cyBpbnB1dCBmaWVsZFxyXG4gICAgICAgIFx0c2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgIFx0XHR0aGlzLiRyZWZzWydlZGl0VGl0bGVJbnB1dCddW2lkeF0uZm9jdXMoKTtcclxuICAgICAgICBcdFx0dGhpcy4kcmVmc1snZWRpdFRpdGxlSW5wdXQnXVtpZHhdLnNlbGVjdCgpO1xyXG4gICAgICAgICAgICBcdHRoaXMuYXV0b0hlaWdodCh0aGlzLiRyZWZzWydlZGl0VGl0bGVJbnB1dCddW2lkeF0pO1xyXG4gICAgICAgIFx0fSwxKTtcclxuXHJcbiAgICAgICAgXHR0aGlzLnRlbXBFZGl0ID0gbGlzdC50aXRsZTtcclxuXHRcdH0sXHJcblx0XHRhdXRvSGVpZ2h0KG8pe1xyXG5cdFx0XHRvLnN0eWxlLmhlaWdodCA9IFwiMXB4XCI7XHJcblx0XHQgICAgby5zdHlsZS5oZWlnaHQgPSAoby5zY3JvbGxIZWlnaHQpK1wicHhcIjtcclxuXHRcdH0sXHJcblx0XHR1cGRhdGVUaXRsZShsaXN0KXtcclxuXHRcdFx0bGlzdC5lZGl0ID0gZmFsc2U7XHJcblxyXG5cdFx0XHRsaXN0LnRpdGxlID0gbGlzdC50aXRsZS50cmltKCk7XHJcblxyXG5cdFx0XHRpZihsaXN0LnRpdGxlID09IFwiXCIpe1xyXG5cdFx0XHRcdGxpc3QudGl0bGUgPSB0aGlzLnRlbXBFZGl0O1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYodGhpcy50ZW1wRWRpdCAhPSBsaXN0LnRpdGxlKXtcclxuXHRcdFx0XHR0aGlzLiRodHRwLnBhdGNoKCdhcGkvbGlzdHMvJytsaXN0LmlkLCB7dGl0bGU6IGxpc3QudGl0bGV9KS50aGVuKChyZXQpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMudGVtcEVkaXQgPSBsaXN0LnRpdGxlXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRibHVyVGV4dGFyZWEoZSl7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0ZS50YXJnZXQuYmx1cigpO1xyXG5cdFx0fSxcclxuXHRcdGNhbmNlbE5ld1Rhc2sobGlzdCl7XHJcblx0XHRcdGxpc3QubmV3VGFzayA9IGZhbHNlO1xyXG5cdFx0fSxcclxuXHRcdG5ld1Rhc2soaWR4LGxpc3Qpe1xyXG5cdFx0XHRsaXN0Lm5ld1Rhc2sgPSB0cnVlO1xyXG5cclxuXHRcdFx0Ly8gRm9jdXMgaW5wdXQgZmllbGRcclxuICAgICAgICBcdHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICBcdFx0dGhpcy4kcmVmc1snbmV3VGFza0lucHV0J11baWR4XS5mb2N1cygpO1xyXG4gICAgICAgIFx0XHR0aGlzLiRyZWZzWyduZXdUYXNrSW5wdXQnXVtpZHhdLnNlbGVjdCgpO1xyXG4gICAgICAgICAgICBcdHRoaXMuYXV0b0hlaWdodCh0aGlzLiRyZWZzWyduZXdUYXNrSW5wdXQnXVtpZHhdKTtcclxuICAgICAgICBcdH0sMSk7XHJcblx0XHR9LFxyXG5cdFx0c3VibWl0VGFzayhsaXN0KXtcclxuXHRcdFx0dGhpcy50ZW1wVGFzayA9IHRoaXMudGVtcFRhc2sudHJpbSgpO1xyXG5cclxuXHRcdFx0dmFyIGJvZHkgPSB0aGlzLnRlbXBUYXNrO1xyXG5cdFx0XHRcclxuXHJcblx0XHRcdGlmKGJvZHkgIT0gXCJcIil7XHJcblxyXG5cclxuXHRcdFx0XHQvKnRoaXMubGlzdHNbdGhpcy5saXN0cy5pbmRleE9mKGxpc3QpXS5wdXNoKHtcclxuXHRcdFx0XHRcdGJvZHk6IGJvZHksXHJcblx0XHRcdFx0XHRjb21wbGV0ZWQ6IDAsXHJcblx0XHRcdFx0XHRjcmVhdGVkX2F0OiBcIlwiLFxyXG5cdFx0XHRcdFx0dGFza19saXN0X2lkOiBsaXN0LmlkLFxyXG5cdFx0XHRcdFx0dXBkYXRlZF9hdDogXCJcIixcclxuXHRcdFx0XHRcdGlkOiAwXHJcblx0XHRcdFx0fSk7Ki9cclxuXHJcblx0XHRcdFx0bGlzdC50YXNrcy5wdXNoKHtcclxuXHRcdFx0XHRcdGJvZHk6IGJvZHksXHJcblx0XHRcdFx0XHRjb21wbGV0ZWQ6IDAsXHJcblx0XHRcdFx0XHRjcmVhdGVkX2F0OiBcIlwiLFxyXG5cdFx0XHRcdFx0dGFza19saXN0X2lkOiBsaXN0LmlkLFxyXG5cdFx0XHRcdFx0dXBkYXRlZF9hdDogXCJcIixcclxuXHRcdFx0XHRcdGlkOiAwXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHRoaXMuJGh0dHAucHV0KCdhcGkvdGFza3MnLCB7Ym9keTogYm9keSwgdGFza19saXN0X2lkOiBsaXN0LmlkfSkudGhlbigocmV0KSA9PiB7XHJcblx0XHRcdFx0XHRsaXN0LnRhc2tzW2xpc3QudGFza3MubGVuZ3RoLTFdLmlkID0gcmV0LmJvZHk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxuVnVlLmNvbXBvbmVudCgndGFza3MnLCB7XHJcblx0dGVtcGxhdGU6IFwiI3Rhc2tzLXRlbXBsYXRlXCIsXHJcblx0cHJvcHM6IFtcImxpc3RcIixcImlkXCJdLFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdGRlbGV0ZVRhc2s6IGZ1bmN0aW9uKHRhc2spe1xyXG5cdFx0XHR0aGlzLmxpc3Quc3BsaWNlKHRoaXMubGlzdC5pbmRleE9mKHRhc2spLDEpO1xyXG5cdFx0fSxcclxuXHRcdG1vdmVkVGFzayhldnQpe1xyXG5cdFx0XHR2YXIgaWQgPSB1bmRlZmluZWQ7XHJcblx0XHRcdGlmKGV2dC5hZGRlZCAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdGlkID0gZXZ0LmFkZGVkLmVsZW1lbnQuaWQ7XHJcblx0XHRcdFx0dGhpcy4kaHR0cC5wYXRjaCgnYXBpL3Rhc2tzLycraWQrJy9tb3ZlJywge3Rhc2tfbGlzdF9pZDogdGhpcy5pZH0pLnRoZW4oKHJldCkgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJtb3ZlZFwiKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fWVsc2UgaWYoZXZ0Lm1vdmVkICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0aWQgPSBldnQubW92ZWQuZWxlbWVudC5pZDtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcbm5ldyBWdWUoe1xyXG5cdGVsOiBcIiNib2FyZFwiLFxyXG5cdGRhdGE6IHtcclxuXHJcblx0fVxyXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ }

/******/ });