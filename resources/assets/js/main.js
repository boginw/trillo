
Vue.component('boards', {
	template: '#boards-template',
	data: function(){
		return {
			list: []
		}
	},
	created(){
		this.fetchBoards();
	},
	methods:{
		fetchBoards(){
			return {};
		},
		deleteBoard(board){
			this.list.splice(this.list.indexOf(board),1);
		}
	}
});



Vue.component('list', {
	template: '#list-template',
	props: ['list_id'],
	data: function(){
		return {
			lists: [],
			tempEdit: "",
			tempTask: ""
		}
	},
	created: function(){
		this.fetchTaskLists();
	},
	methods: {
		fetchTaskLists: function(){
			var resource = this.$resource('api/lists{/id}');

			resource.get({ id : this.list_id }).then((lists) => {

				// insert new fields
				for (var i = 0; i < lists.data.length; i++) {
					lists.data[i]['edit']    = false;
					lists.data[i]['newTask'] = false;
					lists.data[i]['title']   = lists.data[i]['title'].trim();
				}

				this.lists = lists.data;
			});
		},
		deleteTask: function(task){
			this.lists.splice(this.lists.indexOf(task),1);
		},
		toggleEditTitle: function(idx, list){
			list.edit = true;
	        // Focus input field
        	setTimeout(()=>{
        		this.$refs['editTitleInput'][idx].focus();
        		this.$refs['editTitleInput'][idx].select();
            	this.autoHeight(this.$refs['editTitleInput'][idx]);
        	},1);

        	this.tempEdit = list.title;
		},
		autoHeight(o){
			o.style.height = "1px";
		    o.style.height = (o.scrollHeight)+"px";
		},
		updateTitle(list){
			list.edit = false;

			list.title = list.title.trim();

			if(list.title == ""){
				list.title = this.tempEdit;
				return;
			}

			if(this.tempEdit != list.title){
				this.$http.patch('api/lists/'+list.id, {title: list.title}).then((ret) => {
					this.tempEdit = list.title
				});
			}
		},
		blurTextarea(e){
			e.preventDefault();
			e.target.blur();
		},
		cancelNewTask(list){
			list.newTask = false;
		},
		newTask(idx,list){
			list.newTask = true;

			// Focus input field
        	setTimeout(()=>{
        		this.$refs['newTaskInput'][idx].focus();
        		this.$refs['newTaskInput'][idx].select();
            	this.autoHeight(this.$refs['newTaskInput'][idx]);
        	},1);
		},
		submitTask(list){
			this.tempTask = this.tempTask.trim();

			var body = this.tempTask;
			

			if(body != ""){


				/*this.lists[this.lists.indexOf(list)].push({
					body: body,
					completed: 0,
					created_at: "",
					task_list_id: list.id,
					updated_at: "",
					id: 0
				});*/

				list.tasks.push({
					body: body,
					completed: 0,
					created_at: "",
					task_list_id: list.id,
					updated_at: "",
					id: 0
				});

				this.$http.put('api/tasks', {body: body, task_list_id: list.id}).then((ret) => {
					list.tasks[list.tasks.length-1].id = ret.body;
				});
			}
		}
	}
});

Vue.component('tasks', {
	template: "#tasks-template",
	props: ["list"],
	methods: {
		deleteTask: function(task){
			this.list.splice(this.list.indexOf(task),1);
		}
	}
});

new Vue({
	el: "#board",
	data: {

	}
});