"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Material = {
  id: string;
  title: string;
  description: string;
  order: number;
  courseId: string;
  course: {
    title: string;
  };
};

export default function MaterialsList() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch("/api/materials");
        if (response.ok) {
          const data = await response.json();
          setMaterials(data);
        }
      } catch (error) {
        console.error("Ошибка при загрузке материалов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот материал?")) {
      return;
    }

    try {
      const response = await fetch(`/api/materials/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMaterials(materials.filter((material) => material.id !== id));
        alert("Материал успешно удален");
      } else {
        alert("Ошибка при удалении материала");
      }
    } catch (error) {
      console.error("Ошибка при удалении материала:", error);
      alert("Ошибка при удалении материала");
    }
  };

  if (loading) {
    return (
      <div className="p-10 min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Загрузка материалов...</div>
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Управление материалами</h1>
          <Link
            href="/admin/materials"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Добавить материал
          </Link>
        </div>

        {materials.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Материалы отсутствуют
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">№</th>
                  <th className="py-3 px-4 text-left">Название</th>
                  <th className="py-3 px-4 text-left">Курс</th>
                  <th className="py-3 px-4 text-left">Действия</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material, index) => (
                  <tr key={material.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{material.order}</td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{material.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {material.description}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {material.course?.title || "Курс не найден"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/materials/edit/${material.id}`}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-sm"
                        >
                          Изменить
                        </Link>
                        <button
                          onClick={() => handleDelete(material.id)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
                        >
                          Удалить
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
