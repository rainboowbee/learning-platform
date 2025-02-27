"use client";

import React, { useState, useEffect } from "react";
import Editor from "../../../../components/shared/Editor";
import { useRouter } from "next/navigation";

type Course = {
  id: string;
  title: string;
};

export default function EditMaterial({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [order, setOrder] = useState(0);
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получаем список курсов
        const coursesResponse = await fetch("/api/courses");
        if (coursesResponse.ok) {
          const coursesData = await coursesResponse.json();
          setCourses(coursesData);
        }

        // Получаем данные материала
        const materialResponse = await fetch(`/api/materials/${params.id}`);
        if (materialResponse.ok) {
          const materialData = await materialResponse.json();
          setTitle(materialData.title);
          setDescription(materialData.description);
          setContent(materialData.content);
          setOrder(materialData.order);
          setCourseId(materialData.courseId);
        } else {
          alert("Ошибка загрузки материала");
          router.push("/admin/materials/list");
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        alert("Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, router]);

  const handleSave = async () => {
    if (!title || !description || !content || !courseId) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/materials/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          content,
          courseId,
          order,
        }),
      });

      if (response.ok) {
        alert("Материал успешно обновлен");
        router.push("/admin/materials/list");
      } else {
        const error = await response.json();
        alert(`Ошибка обновления: ${error.message || "Неизвестная ошибка"}`);
      }
    } catch (error) {
      console.error("Ошибка обновления материала:", error);
      alert("Произошла ошибка при обновлении материала");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Загрузка материала...</div>
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Редактирование материала</h1>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Курс</label>
          <select
            className="w-full p-2 border rounded"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            disabled={saving}
          >
            <option value="">Выберите курс</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Название</label>
          <input
            className="w-full p-2 border rounded"
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={saving}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Краткое описание</label>
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Краткое описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={saving}
            rows={3}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Порядковый номер</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Порядковый номер"
            value={order}
            onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
            disabled={saving}
            min={0}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Содержание</label>
          <Editor content={content} setContent={setContent} />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleSave}
            className={`bg-blue-500 text-white p-2 rounded ${
              saving ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={saving}
          >
            {saving ? "Сохранение..." : "Сохранить"}
          </button>

          <button
            onClick={() => router.push("/admin/materials/list")}
            className="bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400"
            disabled={saving}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
