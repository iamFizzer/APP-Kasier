<?php

use App\Http\Middleware\InertiaErrorHandler;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->append(InertiaErrorHandler::class);
        $middleware->validateCsrfTokens(except: [
            '/admin/data/*'
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (Throwable $e, $request) {
            // Hanya untuk Inertia request
            $status = $e instanceof \Symfony\Component\HttpKernel\Exception\HttpException
                ? $e->getStatusCode()
                : 500;

            return inertia('ErrorsPage', [
                'status' => $status,
                'message' => config('app.debug') ? $e->getMessage() : null
            ])
            ->toResponse($request)
            ->setStatusCode($status);
        });
    })->create();
