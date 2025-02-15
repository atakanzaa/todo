<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests; // Bu trait'i ekleyin

class TaskController extends Controller
{
    use AuthorizesRequests; // Trait'i kullanın

    // Görevleri listele
    public function index()
    {
        return Auth::user()->tasks;
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
    
        $task = Auth::user()->tasks()->create([
            'title' => $request->title,
            'description' => $request->description,
            'user_id' => Auth::id(),
        ]);
    
        return response()->json([
            'message' => 'Görev başarıyla eklendi!',
            'task' => $task,
        ]);
    }
    
    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task);
    
        $task->update($request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'is_completed' => 'sometimes|boolean',
        ]));
    
        return response()->json([
            'message' => 'Görev başarıyla güncellendi!',
            'task' => $task,
        ]);
    }
    // Görevi sil
    public function destroy(Task $task)
    {
        $this->authorize('delete', $task); // Yetkilendirme kontrolü
        $task->delete();
        return response()->noContent();
    }
}