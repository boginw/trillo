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
                        <li><a href="#">Link</a></li>
                        <li><a href="#">Link</a></li>
                        <li><a href="#">Link</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="#">Link</a></li>
                        <li><a href="#">Link</a></li>
                        <li><a href="#">Link</a></li>               
                    </ul>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>
        <div class="container" id="board">

            <boards></boards>
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
                    <li class="task" v-for="task in list">
                        <p class="task-title">
                            @{{ task.body }}
                        </p>
                        <span class="glyphicon glyphicon-pencil task-edit" aria-hidden="true"></span>

                        <!--<div class="btn-group" role="group">
                            <button 
                                type="button" 
                                class="btn btn-default"
                                @click="deleteTask(task)"
                            >
                                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </button>
                        </div>-->
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
                                <tasks :list="list.tasks" :id="list.id"></tasks>


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

        <script src="https://unpkg.com/vue/dist/vue.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vue-resource/1.0.3/vue-resource.js"></script>
        <script src="//cdn.jsdelivr.net/sortable/latest/Sortable.min.js"></script>
        <script type="text/javascript" src="/js/vuedraggable.js"></script>
        <script type="text/javascript" src="/js/main.js"></script>
    </body>
</html>
