
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
		}
	},
	created: function(){
		this.fetchTaskLists();
	},
	methods: {
		fetchTaskLists: function(){
			var resource = this.$resource('api/lists{/id}');

			resource.get({ id : this.list_id }).then((lists) => {

				for (var i = 0; i < lists.data.length; i++) {
					lists.data[i]['edit'] = false;
					lists.data[i]['title'] = lists.data[i]['title'].trim();
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

			if(this.tempEdit != list.title){
				this.$http.patch('api/lists/'+list.id, {title: list.title}).then((ret) => {
					this.tempEdit = list.title
				});
			}
		},
		blurTextarea(e){
			e.preventDefault();
			e.target.blur();
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