"use client";

import React, { useState } from "react";
import Editor from "../../components/shared/Editor";

export default function MaterialsEditor() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    const response = await fetch("/api/materials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        content,
        courseId: "some-course-id",
      }),
    });

    if (response.ok) alert("Материал сохранён!");
    else alert("Ошибка сохранения");
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Создание материала</h1>
        <input
          className="w-full p-2 border rounded mb-4"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded mb-4"
          placeholder="Краткое описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Editor content={content} setContent={setContent} />
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}
