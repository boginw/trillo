<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Trillo</title>
        <link rel="stylesheet" type="text/css" href="/css/app.css">
        <link rel="stylesheet" type="text/css" href="/css/board.css">
    </head>
    <body>


        <nav class="navbar navbar-default" role="navigation">
            <div class="container">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-brand-centered">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    </button>
                    <div class="navbar-brand navbar-brand-centered">Trillo</div>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="navbar-brand-centered">
                    <ul class="nav navbar-nav">
                        <li><a href="#">Boards</a></li>
                        <li><a href="#">Search</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="#">New</a></li>
                        <li><a href="#">Me</a></li>
                        <li><a href="#">Help</a></li>               
                    </ul>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>
        <div class="container" id="board">
            <p class="board-title">Trillo todo list</p>
            <boards></boards>
            <modal></modal>
        </div>

        <template id="tasks-template">
            <ul class="list-group">
                <draggable 
                        :list="list" 
                        :options="{
                            element:'li', 
                            group:'tasks',
                            sort:true,
                            ghostClass: 'ghost-task',
                            animation:150
                        }" 
                        style="min-height:25px"
                        @change="movedTask($event)"
                > 
                    <li class="task" 
                        v-for="task in list" 
                        @click="openTask(task)"
                    >
                        <p class="task-title">
                            @{{ task.body }}
                        </p>
                        <span class="glyphicon glyphicon-pencil task-edit" aria-hidden="true"></span>
                    </li>
                </draggable>
            </ul>
            
        </template>

        <template id="list-template">
            <div>
                <div v-for="list, idx in lists">
                    <div class="col-sm-12 col-md-3">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <div class="list-title">
                                    <p v-show="!lists[idx].edit" @click="toggleEditTitle(idx,list)">
                                        @{{ list.title }}
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

        <template id="boards-template">
            <div class="row">
                <list></list>
            </div>
        </template>

        <template id="modal-template">
            <!-- The Modal -->
            <div class="task_modal" v-show="show" @keyup:esc="closeModal()">
                <!-- Modal content -->
                <div class="modal-content">
                    <span class="close" @click="closeModal()">&times;</span>

                    <div class="modal_title">
                        <div class="modal_icon">
                            <span class="glyphicon glyphicon-th-list"></span>
                        </div>
                        <p class="title">@{{ openTask.body }}</p>

                        <p>In list <a href="#">@{{ taskList.title }}</a></p>
                    </div>

                    <div class="row">
                        <div class="col-sm-12 col-md-9 left">
                            <div class="content">
                                <p><br />This should be description</p>
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


        <script src="https://unpkg.com/vue/dist/vue.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vue-resource/1.0.3/vue-resource.js"></script>
        <script src="//cdn.jsdelivr.net/sortable/latest/Sortable.min.js"></script>
        <script type="text/javascript" src="/js/vuedraggable.js"></script>
        <script type="text/javascript" src="/js/main.js"></script>
    </body>
</html>
