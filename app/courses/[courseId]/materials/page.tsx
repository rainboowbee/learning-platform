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

type Course = {
  id: string;
  title: string;
  description: string;
};

export default function CourseMaterials({
  params,
}: {
  params: { courseId: string };
}) {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получаем информацию о курсе
        const courseResponse = await fetch(`/api/courses/${params.courseId}`);
        if (courseResponse.ok) {
          const courseData = await courseResponse.json();
          setCourse(courseData);
        }

        // Получаем материалы курса
        const materialsResponse = await fetch(
          `/api/materials?courseId=${params.courseId}`
        );
        if (materialsResponse.ok) {
          const materialsData = await materialsResponse.json();
          setMaterials(materialsData);
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.courseId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Загрузка материалов...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-8 px-4">
        {course && (
          <div className="mb-8">
            <Link
              href={`/courses/${params.courseId}`}
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
              Назад к курсу
            </Link>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-gray-600 mt-2">{course.description}</p>
          </div>
        )}

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Материалы курса</h2>

            {materials.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                В этом курсе пока нет материалов
              </div>
            ) : (
              <div className="space-y-6">
                {materials.map((material, index) => (
                  <Link
                    href={`/courses/${params.courseId}/materials/${material.id}`}
                    key={material.id}
                    className="block"
                  >
                    <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all">
                      <div className="flex items-center">
                        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                          {material.order}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">
                            {material.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {material.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
