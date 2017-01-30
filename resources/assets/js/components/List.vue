<template>
    <div>
            <div class="task-list" v-for="list, idx in lists">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="list-title">
                            <p v-show="!lists[idx].edit" @click="toggleEditTitle(idx,list)">
                                {{ list.title }}
                            </p>
                            <div class="textareaContainer"
                                v-show="list.edit"
                            >
                                <textarea
                                	v-click-outside="function(e){if(list.edit){blurTextarea(e)}}"
                                    ref="editTitleInput"
                                    @keyup="autoHeight($event.currentTarget)"
                                    @blur="updateTitle(list)"
                                    @keyup.enter="blurTextarea($event)"
                                    v-model="list.title"
                                ></textarea>
                            </div>

                            <span class="glyphicon glyphicon-option-horizontal list-title-edit" aria-hidden="true"></span>
                        </div>
                        <ul class="list-group" ref="listOfTasks">
                        	<tasks :list="list.tasks" :index="idx" :id="list.id"></tasks>
						
							<div class="task" v-show="list.newTask" ref="">
	                            <div class="textareaContainer">
	                                <textarea  
	                                    ref="newTaskInput"
	                                    @keyup.enter="submitTask(list,idx)"
	                                    @keyup="autoHeight($event.currentTarget)"
	                                    v-model="tempTask"
	                                ></textarea>
	                            </div>  
	                        </div>
						</ul>
                    </div>
                    <InlineDialog 
                    	:shouldShow="list.newTask"
                    	:idx="idx"
                    	@dialogSubmit="submitTask"
						@dialogCancel="cancelNewTask"
						@dialogShow="newTask"
						v-click-outside="function(e){outsideClick(e,idx)}"
                    >
                        <span slot="submit_text">Save</span>
                        <span slot="idle_text">Add new task...</span>
                    </InlineDialog>
                </div>
            </div>

			<div class="newList">
				<div class="task-list">

					<div class="list-title">
                        <div class="textareaContainer"
                            v-show="false"
                        >
                            <textarea
                            ></textarea>
                        </div>
                    </div>

					<InlineDialog 
                    	:shouldShow="false"
                    >
                        <span slot="submit_text">Save</span>
                        <span slot="idle_text">Add new list</span>
                    </InlineDialog>
				</div>
			</div>
    </div>
</template>

<script>
	export default ({
		props: ['list_id'],
		data: function(){
			return {
				lists: [],
				tempEdit: "",
				tempTask: ""
			}
		},
		created: function(){
			var vm = this;
			
			this.fetchTaskLists();

			// Close newtask on escape pressed
            Event.$on('esc_pressed', function(){
				for (var i = 0; i < vm.lists.length; i++) {
					vm.lists[i].newTask = false;
					vm.lists[i].edit    = false;
				}
			});
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
				window.autoHeight(o);
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
			outsideClick(e,idx){
				var el = e.target;
				var cl = el.className;
				var ta = el.tagName;

				if(cl == "textareaContainer" || ta == "TEXTAREA"){
					return;
				}

				if(this.lists[idx].newTask){
					this.$refs['newTaskInput'][idx].blur();
				}
			},
			blurTextarea(e){
				e.preventDefault();
				e.target.blur();
			},
			hideNewTask(idx){
				this.lists[idx].newTask = false;
			},
			cancelNewTask(idx){
				this.lists[idx].newTask = false;
				this.tempTask = "";
			},
			newTask(idx){
				var list = this.lists[idx];
				list.newTask = true;

				// Focus input field
	        	setTimeout(()=>{
	        		this.$refs['newTaskInput'][idx].focus();
	        		this.$refs['newTaskInput'][idx].select();
	            	this.autoHeight(this.$refs['newTaskInput'][idx]);

	            	//scroll to bottom when new task
	            	this.scrollToBottom(idx);
	        	},1);
			},
			scrollToBottom(idx){
				var listOfTasksToScroll = this.$refs['listOfTasks'][idx];
	            listOfTasksToScroll.scrollTop = listOfTasksToScroll.scrollHeight;
			},
			submitTask(idx){
				this.tempTask = this.tempTask.trim();
				var list = idx;
				console.log(idx);
				var body = this.tempTask;

				if(body != ""){

					list.tasks.push({
						body: body,
						completed: 0,
						created_at: "",
						task_list_id: list.id,
						updated_at: "",
						id: 0,
						description: "# Hello"
					});

					this.$http.put('api/tasks', {body: body, task_list_id: list.id}).then((ret) => {
						list.tasks[list.tasks.length-1].id = ret.body;
						this.scrollToBottom(this.lists.indexOf(idx));
					});

					this.tempTask = "";
				}
			}
		}
	});
</script>