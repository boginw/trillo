<!--
	Binds:
		shoudShow ( Defines if textarea shoud show or not )
		idx       ( Custom variable, used for lists of dialogs )
	Events:
		dialogSubmit ( idx )
		dialogCancel ( idx )
		dialogShow   ( idx )
-->

<template>
	<div class="newTaskContainer">
        <div class="newTask"
            @blur="$emit('dialogCancel', idx)"
            v-show="shouldShow"
        >
            <div class="btn-group" role="group" aria-label="...">
                <button type="button" class="btn btn-success"
                    @click="$emit('dialogSubmit', idx)"
                >
                    <slot name="submit_text"></slot>
                </button>
            </div>
            <span class="glyphicon glyphicon-remove newTask_remove" aria-hidden="true"
                @click="$emit('dialogCancel', idx)"
            ></span>



            <span class="formattingHelp" 
                v-show="showRight"
                @click="$emit('dialogRight',idx)"
            >
                    <slot name="right_text"></slot>
            </span>
        </div>

        <div class="newTaskPlaceholder"
            v-show="!shouldShow && (showIdle == undefined || showIdle)"
            @click="$emit('dialogShow',idx)"
        >
            <slot name="idle_text"></slot>
        </div>
    </div>
</template>

<script>
	export default({
		props: ['shouldShow', 'idx','showIdle','showRight']
	});	
</script>

<style lang="sass">
    .formattingHelp{
        float: right;
        padding: 5px;
        background: #ddd;
        border-radius: 4px;
        cursor: pointer;

        &:hover{
            color: black;
            text-decoration: underline;
        }
    }
</style>