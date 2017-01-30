

Vue.directive('click-outside', {
	/* Credit to: https://jsfiddle.net/Linusborg/Lx49LaL8/ */
	bind: function(el, binding, vNode) {
		// Provided expression must evaluate to a function.
		if (typeof binding.value !== 'function') {
			const compName = vNode.context.name;
			let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
			if (compName) {
				warn += `Found in component '${compName}'`;
			}

			console.warn(warn);
		}
		// Define Handler and cache it on the element
		const bubble = binding.modifiers.bubble;
		const handler = (e) => {
			if (bubble || (!el.contains(e.target) && el !== e.target)) {
				binding.value(e);
			}
		}
		el.__vueClickOutside__ = handler;

		// add Event Listeners
		document.addEventListener('click', handler);
	},

	unbind: function(el, binding) {
		// Remove Event Listeners
		document.removeEventListener('click', el.__vueClickOutside__);
		el.__vueClickOutside__ = null;
	}
});


Vue.component('modal',        require('./components/Modal.vue'));
Vue.component('list',         require('./components/List.vue'));
Vue.component('Tasks',        require('./components/Tasks.vue'));
Vue.component('InlineDialog', require('./components/InlineDialog.vue'));
Vue.component('DropOver',     require('./components/DropOver.vue'));

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