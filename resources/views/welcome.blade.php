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