<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Trillo</title>
        <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">

        <style>
      
            .list-group > li > p{
                width: 100% !important;
                padding-right: 40px !important;
            }

            .list-group > li > .btn-group{
                position: absolute !important;
                right: 0px !important;
                top: 0px !important;
            }

        </style>
    </head>
    <body>


        <div class="container">
            <h1>Trillo</h1>
            <boards></boards>
        </div>

        <template id="tasks-template">
            
                <ul class="list-group">
                    <li class="list-group-item" v-for="task in list">
                        <p>
                            @{{ task.body }}
                        </p>
                        <div class="btn-group" role="group">
                            <button 
                                type="button" 
                                class="btn btn-default"
                                @click="deleteTask(task)"
                            >
                                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </button>
                        </div>
                    </li>
                </ul>
            
        </template>

        <template id="list-template">
            <div>
                <div v-for="list in lists">
                    <div class="col-sm-12 col-md-3">
                        <h3>@{{ list.title }}</h3>
                        <tasks :list="list.tasks"></tasks>
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
        <script type="text/javascript" src="/js/main.js"></script>
    </body>
</html>
