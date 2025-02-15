import React from 'react';

export default function TaskItem({ task, onEdit, onDelete, onToggle }) {
    return (
        <div className={`p-4 border rounded ${task.is_completed ? 'bg-green-50' : 'bg-white'}`}>
            <div className="flex justify-between items-center">
                <div className="flex-1">
                    <h3 className="font-bold">{task.title}</h3>
                    <p className="text-gray-600">{task.description}</p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onToggle(task)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                        {task.is_completed ? 'Tamamlanmadı' : 'Tamamlandı'}
                    </button>
                    <button
                        onClick={() => onEdit(task)}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                        Düzenle
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                        Sil
                    </button>
                </div>
            </div>
        </div>
    );
}