<template>
    <!-- The Modal -->
    <div class="task_modal" v-show="show">
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
                    <textarea  
                        ref="editTitleInput"
                        @keyup="autoHeight($event.currentTarget)"
                        @blur="updateTitle(list)"
                        @keyup.enter="updateTitle()"
                        v-model="openTask.body"
                    ></textarea>
                </div>

                <p>In list <a href="#">{{ taskList.title }}</a></p>
            </div>

            <div class="row">
                <div class="col-sm-12 col-md-9 left">
                    <div class="content">
                        <div class="description">
                            <div id="viewDescription">
                                <p class="grayText">
                                    Description.
                                    <a href="#"
                                        @click="toggleEditDescription()"
                                        v-show="!editDescription"
                                    >
                                        Edit
                                    </a>
                                </p>
                                <p 
                                    @click="toggleEditDescription()"
                                    v-html="compiledMarkdown"
                                    v-show="!editDescription"
                                ></p>
                            </div>
                            <div class="textareaContainer"
                                v-show="editDescription"
                            >
                                <textarea  
                                    ref="editDescriptionInput"
                                    @keyup="autoHeight($event.currentTarget)"
                                    v-model="tempDescription"
                                ></textarea>
                            </div>

                            <InlineDialog 
                                :shouldShow="editDescription"
                                :showIdle="false"
                                @dialogSubmit="descriptionEdit"
                                @dialogCancel="cancelDescriptionEdit"
                            >
                                <span slot="submit_text">Save</span>
                                <span slot="idle_text"></span>
                            </InlineDialog>
                        </div>
                    </div>

                    <div class="modal_icon">
                        <span class="glyphicon glyphicon-comment"></span>
                    </div>

                    <p  class="title">
                        Add Comment
                    </p>
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

<style lang="sass">    
    .task_modal {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4);
    }

    /* Modal Content/Box */
    .modal-content {
        background-color: #fefefe;
        margin: 5% auto 20px auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 80%; /* Could be more or less, depending on screen size */
        max-width: 730px;

        & p{
            white-space: initial;
        }
        & .modal_icon{
            width: 25px;
            margin: 0px;
            float: left;
            padding: 1px;
            font-size: 16px;
        }

        & .title{
            font-weight: 700;
            font-size: 16px;
        }

        & .modal_title{

            & .title, & textarea{
                font-weight: 700;
                font-size: 16px;
            }

            & textarea{
                background-color: #dedede;
            }

            & .textareaContainer{
                margin: 0px 25px 0px 25px;
                background-color: #FFF;
            }
            & p{
                margin: 0px 25px 0px 25px;
                user-select: none;
            }
        }

        & .modal_title textarea, .description textarea{
            margin: 0px;
            padding: 0px;
            width:100%;
            overflow: hidden;
            outline:none;
            border: 0 none #FFF;
            resize: none;
            border-radius: 5px;
            &:active{
                outline:none;
                border: 0 none #FFF;
            }
        }

        .description{
            & .textareaContainer{
                border-radius: 5px;
                border: 1px solid #ddd;
                padding: 5px;
                box-shadow: inset 0 0 6px #ddd;
            }

            & h1{
                font-size: 2em;
            }
        }


        & .actions{
            width:100%;
            margin-bottom: 15px;
            display: initial;
            & .btn{
                text-align: left;

            }
        }

        & .left .content{
            margin: 4px 28px 1pc 25px;

            & .grayText{
                color: #aaa;
            }
        }

        & .right{
            font-weight: bold;
            & a{
                font-weight: initial;
            }
        }

        & .row{
            white-space: nowrap;
            overflow-x: initial;
        }
    }
</style>

<script>
    export default ({
		data: function(){
			return {
				show: false,
				openTask: false,
				modal_body: "test",
				taskList: false,
                editTitle: false,
				editDescription: false,
                tempDescription: ""
			};
		},
		created(){
			var vm = this;
			Event.$on('modal_task', function(task, taskList){
                vm.openModal(task,taskList);
            });

            // Close modal on escape pressed;
            Event.$on('esc_pressed', function(){
				vm.closeModal();
			});

		},
        computed: {
            compiledMarkdown() {
                return this.openTask && this.openTask.description ?
                    marked(this.openTask.description, { sanitize: true }): 'No description';
            }
        },
		methods: {
            hasDescription(){
                return 
                    this.openTask && 
                    this.openTask.description &&
                    this.openTask.description.trim() != "";
            },
			fetchTaskInfo(){

			},
			openModal(task,taskList){
				this.show       = true;
				this.openTask   = task;
				this.taskList   = taskList;
			},
			closeModal(){
				this.show = false;
			},
            updateTitle(){
                this.openTask.body = this.openTask.body.trim().replace("\n","");
                this.editTitle = false;

                this.$http.patch('api/tasks/'+this.openTask.id+'/rename', {body: this.openTask.body});
            },
            toggleEditTitle(){
                this.editTitle = true;

                // Focus input field
                setTimeout(()=>{
                    this.$refs['editTitleInput'].focus();
                    this.$refs['editTitleInput'].select();
                    window.autoHeight(this.$refs['editTitleInput']);
                },1);
			},
            toggleEditDescription(){
                this.editDescription = true;
                this.tempDescription = this.openTask.description;
            },
            autoHeight(o){
                window.autoHeight(o);
            },
            descriptionEdit(){
                this.openTask.description = this.tempDescription;
                this.editDescription = false;

                this.$http.patch('api/tasks/'+this.openTask.id+'/description', {description: this.openTask.description});
            },
            cancelDescriptionEdit(){
                this.tempDescription = this.openTask.description;
                this.editDescription = false;
            }
		}
    });
</script>
