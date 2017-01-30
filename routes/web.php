<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/api/lists', function(){
	return App\TaskList::with('tasks')->get();
});

Route::patch('/api/lists/{id}', 'TaskListController@update');

Route::get('/api/tasks', function(){
	return App\Task::latest()->get();
});

Route::put('/api/tasks', function(){
	$id = DB::table('tasks')
		->insertGetId([
				"body" => Request::input("body"),
				"task_list_id" => Request::input("task_list_id")
			]);
	return $id;
});

Route::put('/api/lists', function(){
	$id = DB::table('task_lists')
		->insertGetId([
				"title" => Request::input("title")
			]);
	return $id;
});

Route::patch('/api/tasks/{id}/move', function($id){
	return !!DB::table('tasks')
            ->where('id', $id)
            ->update(['task_list_id' => Request::input('task_list_id')]) ? "true" : "false";
});


Route::patch('/api/tasks/{id}/rename', function($id){
	return !!DB::table('tasks')
            ->where('id', $id)
            ->update(['body' => Request::input('body')]) ? "true" : "false";
});

Route::patch('/api/tasks/{id}/description', function($id){
	return !!DB::table('tasks')
            ->where('id', $id)
            ->update(['description' => Request::input('description')]) ? "true" : "false";
});


Route::get('/', function () {

    return view('welcome');
});
