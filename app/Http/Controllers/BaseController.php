<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BaseController extends Controller
{
    protected function react_view(string $component = '', array $props = []) {
        $data = [];
        return Inertia::render($component, array_merge($data, $props));
    }

    protected function blade_view(string $page = '', array $props = []) {
        $data = [];
        return view($page, $props, $data);
    }

    private function is_superuser_exist() {
        return User::where(['is_superuser' => true])->exists();
    }

    /**
     * SUCCESS RESPONSE (200)
     * @param mixed $data
     * @param string $message
     */
    protected function json_200($data = [], string $message = 'Success')
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data'    => $data,
        ], 200);
    }

    /**
     * ERROR RESPONSE (400)
     * @param string $message
     * @param mixed $errors
     */
    protected function json_error(string $message = 'Bad Request', $errors = null)
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors'  => $errors,
        ], 400);
    }

    /**
     * NOT FOUND RESPONSE (404)
     * @param string $message
     */
    protected function json_404(string $message = 'Data not found')
    {
        return response()->json([
            'success' => false,
            'message' => $message,
        ], 404);
    }

    /**
     * VALIDATION ERROR RESPONSE (422)
     * @param mixed $errors
     * @param string $message
     */
    protected function json_422($errors = [], string $message = 'Validation error')
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors'  => $errors,
        ], 422);
    }

    /**
     * SERVER ERROR RESPONSE (500)
     * @param string $message
     * @param mixed $errors
     */
    protected function json_500(string $message = 'Server Error', $errors = null)
    {
        return response()->json([
            'success' => false,
            'message' => $message ?? $errors->getMessage(),
            'errors' => $errors,
        ], 500);
    }
}
