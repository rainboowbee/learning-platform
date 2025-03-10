"use client";

import React, { useState, useEffect } from "react";
import Editor from "../../components/shared/Editor";

type Course = {
  id: string;
  title: string;
};

export default function MaterialsEditor() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [order, setOrder] = useState(0);
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Получение списка курсов
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
          if (data.length > 0) {
            setCourseId(data[0].id);
          }
        }
      } catch (error) {
        console.error("Ошибка при получении курсов:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSave = async () => {
    if (!title || !description || !content || !courseId) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/materials", {
        method: "POST",
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
        alert("Материал успешно сохранён!");
        // Очистить форму
        setTitle("");
        setDescription("");
        setContent("");
        setOrder(0);
      } else {
        const error = await response.json();
        alert(`Ошибка сохранения: ${error.message || "Неизвестная ошибка"}`);
      }
    } catch (error) {
      alert("Произошла ошибка при сохранении материала");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Создание материала</h1>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Курс</label>
          <select
            className="w-full p-2 border rounded"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            disabled={loading}
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
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Краткое описание</label>
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Краткое описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
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
            disabled={loading}
            min={0}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Содержание</label>
          <Editor content={content} setContent={setContent} />
        </div>

        <button
          onClick={handleSave}
          className={`bg-blue-500 text-white p-2 rounded mt-4 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Сохранение..." : "Сохранить"}
        </button>
      </div>
    </div>
  );
}
