"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Material = {
  id: string;
  title: string;
  description: string;
  content: string;
  order: number;
};

export default function MaterialPage({
  params,
}: {
  params: { courseId: string; materialId: string };
}) {
  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await fetch(`/api/materials/${params.materialId}`);
        if (response.ok) {
          const data = await response.json();
          setMaterial(data);
        } else {
          console.error("Ошибка при загрузке материала");
        }
      } catch (error) {
        console.error("Ошибка при загрузке материала:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterial();
  }, [params.materialId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Загрузка материала...</div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Материал не найден</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link
          href={`/courses/${params.courseId}/materials`}
          className="text-blue-500 hover:underline mb-4 inline-flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Назад к материалам
        </Link>

        <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
          <h1 className="text-3xl font-bold">{material.title}</h1>
          <p className="text-gray-600 mt-2 mb-6">{material.description}</p>

          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: material.content }} />
          </div>
        </div>
      </div>
    </div>
  );
}
