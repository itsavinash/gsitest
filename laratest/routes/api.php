<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'App\Http\Controllers\AuthController@login');
    Route::post('signup', 'App\Http\Controllers\AuthController@signup');

    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::get('logout', 'App\Http\Controllers\AuthController@logout');
        Route::get('user', 'App\Http\Controllers\AuthController@user');
        Route::post('avatar-upload', 'App\Http\Controllers\UploadsController@uploadAvatar');
        Route::get('list-games', 'App\Http\Controllers\GamesController@listGames');
        Route::post('add-game', 'App\Http\Controllers\GamesController@addGame');
    });
});
Route::group([
    'prefix' => 'password'
], function () {
    Route::post('create', 'App\Http\Controllers\PasswordResetController@create');
    Route::get('find/{token}', 'App\Http\Controllers\PasswordResetController@find');
    Route::post('reset', 'App\Http\Controllers\PasswordResetController@reset');
});
