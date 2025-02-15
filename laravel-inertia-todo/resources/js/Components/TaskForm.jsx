import React from 'react';
import { useForm } from '@inertiajs/react';

export default function TaskForm({ editingTask, setEditingTask, onSubmit }) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: editingTask?.title || '',
        description: editingTask?.description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        onSubmit(data); // onSubmit prop'unu çağır
    };

    return (
        <form onSubmit={submit} className="mb-8">
            <div className="flex gap-4">
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    placeholder="Görev başlığı"
                    className="flex-1 p-2 border rounded"
                    required
                />
                <textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Görev açıklaması"
                    className="flex-1 p-2 border rounded"
                />
                <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    {editingTask ? 'Görevi Güncelle' : 'Görev Ekle'}
                </button>
                {editingTask && (
                    <button
                        type="button"
                        onClick={() => setEditingTask(null)}
                        className="px-4 py-2 bg-gray-500 text-white rounded"
                    >
                        İptal
                    </button>
                )}
            </div>
            {errors.title && <div className="text-red-500 mt-2">{errors.title}</div>}
        </form>
    );
}