Vue.component('modal', require('./components/Modal.vue'));
Vue.component('list',  require('./components/List.vue'));
Vue.component('Tasks', require('./components/Tasks.vue'));

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

let Event = new Vue({});
window.Event = Event;

let app = new Vue({
	el: "#board"
});
