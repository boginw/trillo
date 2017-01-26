<template>
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
                    {{ task.body }}
                </p>
                <span class="glyphicon glyphicon-pencil task-edit" aria-hidden="true"></span>
            </li>
        </draggable>
    </ul>
</template>

<script>
    export default({
        props: ["list","id","index"],
        methods: {
            deleteTask: function(task){
                this.list.splice(this.list.indexOf(task),1);
            },
            movedTask(evt){
                var id = undefined;
                if(evt.added != undefined){
                    id = evt.added.element.id;
                    this.$http.patch('api/tasks/'+id+'/move', {task_list_id: this.id}).then((ret) => {
                        console.log("moved");
                    });
                }else if(evt.moved != undefined){
                    id = evt.moved.element.id;
                }else{
                    return;
                }
            },
            openTask(task){
                Event.$emit("modal_task", task, this.$parent._data.lists[this.index]);
            }
        }
    });
</script>