<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\WebController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', [WebController::class, 'index']);

Route::get('/', function () {
    return Inertia::render('Home');
});

