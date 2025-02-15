<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;

class TaskPolicy
{
    /**
     * Görevi güncelleme yetkisi.
     */
    public function update(User $user, Task $task)
    {
        \Log::info('Policy Check: User ID ' . $user->id . ' can update Task ID ' . $task->id);
        \Log::info('Task User ID: ' . $task->user_id);
    
        // Debug için her zaman true döndür
        return true;
    }

    /**
     * Görevi silme yetkisi.
     */
    public function delete(User $user, Task $task)
    {
       return true;
    }
}