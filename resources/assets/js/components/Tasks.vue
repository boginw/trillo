<template>
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
                <task-tags :task="task"></task-tags>
            </p>
            <span class="glyphicon glyphicon-pencil task-edit" aria-hidden="true"></span>
        </li>
    </draggable>
</template>

<script>
    export default({
        props: ["list","id","index"],
        methods: {
            hasDescription(task){
                return 
                    !!task && 
                    !!task.description &&
                    task.description.trim() != "";
            },
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
        },
        components:{
            'task-tags':{
                template: `
                    <span class="task-tags">
                        <span class="label label-default" v-if="compHasDescription"><i class="glyphicon glyphicon-check"></i> 5/7</span>
                        <i class="glyphicon glyphicon-align-left" v-if="compHasDescription"></i>
                    </span>`,
                props: ['task'],
                computed:{
                    compHasDescription(){
                        return !!this.task && 
                            !!this.task.description &&
                            this.task.description.trim() != "";
                    }
                }
            }
        }
    });
</script>