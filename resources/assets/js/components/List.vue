<template>
    <div>
        <div v-for="list, idx in lists">
            <div class="col-sm-12 col-md-3">
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
                                    ref="editTitleInput"
                                    @keyup="autoHeight($event.currentTarget)"
                                    @blur="updateTitle(list)"
                                    @keyup.enter="blurTextarea($event)"
                                    v-model="list.title"
                                ></textarea>
                            </div>

                            <span class="glyphicon glyphicon-option-horizontal list-title-edit" aria-hidden="true"></span>
                        </div>
                        <tasks :list="list.tasks" :index="idx" :id="list.id"></tasks>


                    </div>
                    <div class="newTaskContainer">
                        <div class="newTask"
                            @blur="cancelNewTask(list)"
                            v-show="list.newTask"
                        >
                            <div class="task">
                                <div class="textareaContainer">
                                    <textarea  
                                        ref="newTaskInput"
                                        @keyup.enter="submitTask(list)"
                                        @keyup="autoHeight($event.currentTarget)"
                                        v-model="tempTask"
                                    ></textarea>
                                </div>  
                            </div>

                            <div class="btn-group" role="group" aria-label="...">
                                <button type="button" class="btn btn-success"
                                    @click="submitTask(list)"
                                >
                                    Add
                                </button>
                            </div>
                            <span class="glyphicon glyphicon-remove newTask_remove" aria-hidden="true"
                                @click="cancelNewTask(list)"
                            ></span>
                        </div>

                        <div class="newTaskPlaceholder"
                            v-show="!list.newTask"
                            @click="newTask(idx,list)"
                        >
                            Add new task...
                        </div>
                    </div>
                </div>
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
</script>