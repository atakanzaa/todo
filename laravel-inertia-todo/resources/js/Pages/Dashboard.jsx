import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TaskForm from '@/Components/TaskForm';
import TaskItem from '@/Components/TaskItem';
import { toast } from 'react-toastify';

export default function Dashboard() {
    const { tasks } = usePage().props;
    const [editingTask, setEditingTask] = useState(null);

    // Görev silme işlemi
    const handleDelete = (id) => {
        router.delete(`/tasks/${id}`, {
            onSuccess: () => toast.success('Görev başarıyla silindi!'),
        });
    };

    // Görev durumunu güncelleme (tamamlandı/tamamlanmadı)
    const handleToggle = (task) => {
        router.put(`/tasks/${task.id}`, {
            ...task,
            is_completed: !task.is_completed,
        }, {
            onSuccess: () => toast.success('Görev durumu güncellendi!'),
        });
    };

    // Görev ekleme veya güncelleme işlemi
    const handleTaskSubmit = (task) => {
        if (editingTask) {
            router.put(`/tasks/${editingTask.id}`, task, {
                onSuccess: () => {
                    toast.success('Görev başarıyla güncellendi!');
                    setEditingTask(null);
                },
            });
        } else {
            router.post('/tasks', task, {
                onSuccess: () => toast.success('Görev başarıyla eklendi!'),
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {/* Görev Ekleme/Düzenleme Formu */}
                        <TaskForm 
                            editingTask={editingTask} 
                            setEditingTask={setEditingTask} 
                            onSubmit={handleTaskSubmit}
                        />

                        {/* Görev Listesi */}
                        <div className="mt-8 space-y-4">
                            {tasks.length > 0 ? (
                                tasks.map(task => (
                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                        onEdit={() => setEditingTask(task)}
                                        onDelete={handleDelete}
                                        onToggle={handleToggle}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-600">Henüz hiç görev eklemediniz.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}