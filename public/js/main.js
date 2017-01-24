Vue.component('boards', {
	template: '#boards-template',
	data: function(){
		list: []
	},
	created: function (){
		this.fetchBoards();
	},
	methods:{
		fetchBoards:function(){
			return {};
		},
		deleteBoard:function(board){
			this.list.splice(this.list.indexOf(board),1);
		}
	}
});



Vue.component('list', {
	template: '#list-template',
	props: ['list_id'],
	data: function(){
		return {
			lists: []
		}
	},
	created: function(){
		this.fetchTaskLists();
	},
	methods: {
		fetchTaskLists: function(){
			var resource = this.$resource('api/lists{/id}');

			resource.get({ id : this.list_id }).then((lists) => {
				this.lists = lists.data;
			});
		},
		deleteTask: function(task){
			this.lists.splice(this.lists.indexOf(task),1);
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
	el: ".container",
	data: {

	}
});