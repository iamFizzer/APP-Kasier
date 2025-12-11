<?php

namespace App\Http\Middleware;

use Closure;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class InertiaErrorHandler
{
    public function handle($request, Closure $next)
    {
        try {
            return $next($request);

        } catch (\Throwable $e) {

            // Get status code (404, 500, etc.)
            $status = $e instanceof HttpExceptionInterface
                ? $e->getStatusCode()
                : 500;

            // Return inertia component (React page)
            return Inertia::render('ErrorsPage', [
                'status' => $status,
                'message' => $e->getMessage(),
            ])
            ->toResponse($request)
            ->setStatusCode($status);
        }
    }
}
