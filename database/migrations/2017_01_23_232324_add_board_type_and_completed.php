<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBoardTypeAndCompleted extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->integer('list_id');
        });

        Schema::create('lists', function (Blueprint $table) {
            $table->increments('id');
            $table->text('title');
            $table->boolean('archived')->default(0);
            $table->timestamps();
        });

        DB::table('lists')->insert([
            "title" => "todo",
        ]);

        DB::query("UPDATE tasks SET list_id = (SELECT id FROM lists LIMIT 1);");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropColumn('list_id');
        });

        Schema::drop('lists');

    }
}
