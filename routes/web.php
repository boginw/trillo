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

Route::get('/', function () {

    return view('welcome');
});
