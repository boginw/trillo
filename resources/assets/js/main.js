Vue.component('modal',        require('./components/Modal.vue'));
Vue.component('list',         require('./components/List.vue'));
Vue.component('Tasks',        require('./components/Tasks.vue'));
Vue.component('InlineDialog', require('./components/InlineDialog.vue'));

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
	el: "#board",
	created: function(){
		window.addEventListener('keyup', function(e){
			if(e.keyCode == 27){
				Event.$emit("esc_pressed");
			}
		},false);
	}
});

window.autoHeight = function(o){
	if(o != undefined && o.style != undefined){
		o.style.height = "1px";
    	o.style.height = (o.scrollHeight)+"px";
	}
}