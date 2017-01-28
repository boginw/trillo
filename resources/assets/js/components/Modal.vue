<template>
    <!-- The Modal -->
    <div class="task_modal" v-show="show" @keyup:esc="closeModal()">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close" @click="closeModal()">&times;</span>

            <div class="modal_title">
                <div class="modal_icon">
                    <span class="glyphicon glyphicon-th-list"></span>
                </div>

                <p  class="title"
                	v-show="!editTitle"
					@click="toggleEditTitle()"
                >
                	{{ openTask.body }}
                </p>

                <div class="textareaContainer"
                    v-show="editTitle"
                >
                    <!--<textarea  
                        ref="editTitleInput"
                        @keyup="autoHeight($event.currentTarget)"
                        @blur="updateTitle(list)"
                        @keyup.enter="blurTextarea($event)"
                        v-model="openTask.body"
                    ></textarea>-->
                </div>

                <p>In list <a href="#">{{ taskList.title }}</a></p>
            </div>

            <div class="row">
                <div class="col-sm-12 col-md-9 left">
                    <div class="content">
                        <p v-html="compiledMarkdown"></p>
                    </div>
                </div>



                <div class="col-sm-12 col-md-3 right">
                    <p>Add</p>
                    <div class="btn-group-vertical actions" role="group" aria-label="...">
                        <button type="button" class="btn btn-default">
                            <i class="glyphicon glyphicon-user"></i> Members
                        </button>
                        <button type="button" class="btn btn-default">
                            <i class="glyphicon glyphicon-tag"></i> Labels
                        </button>
                        <button type="button" class="btn btn-default">
                            <i class="glyphicon glyphicon-check"></i> Checklist
                        </button>
                        <button type="button" class="btn btn-default">
                            <i class="glyphicon glyphicon-time"></i> Due Date
                        </button>
                        <button type="button" class="btn btn-default">
                            <i class="glyphicon glyphicon-paperclip"></i> Attachment
                        </button>
                    </div>

                    <p>Actions</p>
                    <div class="btn-group-vertical actions" role="group" aria-label="...">
                        <button type="button" class="btn btn-default">
                            <i class="glyphicon glyphicon-arrow-right"></i> Move
                        </button>
                        <button type="button" class="btn btn-default">
                            <i class="glyphicon glyphicon-copy"></i> Copy
                        </button>
                        <button type="button" class="btn btn-default">
                            <i class="glyphicon glyphicon-eye-open"></i> Subscribe
                        </button>
                        <button type="button" class="btn btn-default">
                            <i class="glyphicon glyphicon-trash"></i> Archive
                        </button>
                    </div>

                    <a href="#">
                        Share task and more...
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
    export default ({
		data: function(){
			return {
				show: false,
				openTask: false,
				modal_body: "test",
				taskList: false,
				editTitle: false
			};
		},
		created(){
			var vm = this;
			Event.$on('modal_task', function(task, taskList){
				vm.openModal(task,taskList);
			});
		},
        computed: {
            compiledMarkdown() {
                return this.openTask && this.openTask.description ?
                    marked(this.openTask.description, { sanitize: true }): 'No description';
            }
        },
		methods: {
			fetchTaskInfo(){

			},
			openModal(task,taskList){
				this.show       = true;
				this.openTask   = task;
				this.taskList   = taskList
			},
			closeModal(){
				this.show = false;
			},
			toggleEditTitle(){

			}
		}
    });
</script>
