"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Пример данных о курсах
const courses = [
  {
    id: 1,
    title: "Python для начинающих",
    description: "Изучите основы программирования на Python с нуля",
    image: "/course-python.jpg", // вы можете добавить изображения в папку public
    level: "Начинающий",
    color: "bg-purple-500",
  },
  {
    id: 2,
    title: "Подготовка к ЕГЭ по информатике",
    description: "Комплексная подготовка к сдаче ЕГЭ на высокий балл",
    image: "/course-ege.jpg",
    level: "Продвинутый",
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Алгоритмы и структуры данных",
    description: "Фундаментальные знания для программиста",
    image: "/course-algorithms.jpg",
    level: "Средний",
    color: "bg-green-500",
  },
  {
    id: 4,
    title: "ОГЭ по информатике",
    description: "Подготовка к успешной сдаче ОГЭ",
    image: "/course-oge.jpg",
    level: "Начинающий",
    color: "bg-yellow-500",
  },
];

// Компонент анимированного текста
const AnimatedTitle = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <h1 className="text-4xl sm:text-6xl font-bold mb-6 relative">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 animate-gradient-x">
        BitLab
      </span>
      <span> — ваш путь в мир</span>
      <br />
      <span className="relative">
        <span
          className={`inline-block transition-transform duration-1000 ${
            mounted ? "transform-none" : "translate-y-8 opacity-0"
          }`}
        >
          информатики
        </span>
        <span
          className={`inline-block ml-2 transition-transform duration-1000 delay-300 ${
            mounted ? "transform-none" : "translate-y-8 opacity-0"
          }`}
        >
          и программирования
        </span>
      </span>
    </h1>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      {/* Hero секция */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 sm:py-32 overflow-hidden">
        {/* Фоновые элементы декора */}
        <div className="absolute -z-10 w-full h-full">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 -left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <AnimatedTitle />
          <p className="text-lg sm:text-xl mb-10 opacity-80">
            Изучайте информатику, программирование на Python и готовьтесь к ЕГЭ
            и ОГЭ вместе с нами
          </p>
          <Link
            href="/courses"
            className="rounded-full text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 px-8 font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            Начать обучение
          </Link>
        </div>
      </section>

      {/* Секция курсов */}
      <section className="py-16 px-4 sm:px-8 bg-black/[.05] dark:bg-white/[.03] relative overflow-hidden">
        {/* Узоры на фоне */}
        <div className="absolute inset-0 -z-10 opacity-5">
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-purple-500/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-500/20 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Популярные курсы
          </h2>
          <p className="text-center mb-12 max-w-2xl mx-auto opacity-70">
            Выберите направление обучения и начните свой путь к успеху в мире IT
            и сдаче экзаменов
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex flex-col bg-background rounded-xl overflow-hidden shadow-lg border border-black/[.08] dark:border-white/[.08] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 transform"
              >
                <div className="h-48 bg-black/[.05] dark:bg-white/[.05] relative overflow-hidden group">
                  {/* Заглушка для изображения с градиентом */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/20 to-black/60 dark:from-black/40 dark:to-black/80">
                    <div
                      className={`w-16 h-16 ${course.color} text-white rounded-full flex items-center justify-center text-2xl font-bold`}
                    >
                      {course.title[0]}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <span className="text-white p-4 font-medium">
                      Подробнее о курсе
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-2">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full text-white ${course.color}`}
                    >
                      {course.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-sm opacity-70 mb-4">
                    {course.description}
                  </p>
                  <div className="mt-auto">
                    <Link
                      href={`/courses/${course.id}`}
                      className="text-sm font-medium px-4 py-2 rounded-lg bg-black/[.05] dark:bg-white/[.05] hover:bg-black/[.1] dark:hover:bg-white/[.1] transition-colors inline-flex items-center"
                    >
                      Начать курс
                      <svg
                        className="w-4 h-4 ml-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19M19 12L13 6M19 12L13 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/courses"
              className="rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-solid border-black/[.08] dark:border-white/[.145] transition-all duration-300 inline-flex items-center justify-center hover:from-blue-500/30 hover:to-purple-500/30 text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8"
            >
              Смотреть все курсы
              <svg
                className="w-5 h-5 ml-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 8L21 12M21 12L17 16M21 12H3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Секция преимуществ */}
      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Почему выбирают{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              BitLab
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/5 to-purple-500/10 border border-purple-500/10">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center mb-4 text-white">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 6V12M12 12V18M12 12H18M12 12H6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Современные методики</h3>
              <p className="opacity-70">
                Обучение построено на современных методиках, учитывающих
                особенности усвоения материала
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/10">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center mb-4 text-white">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 6L20 6M9 12H20M9 18H20M5 6V6.01M5 12V12.01M5 18V18.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">
                Структурированный подход
              </h3>
              <p className="opacity-70">
                Материал подается в логической последовательности, от простого к
                сложному
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/5 to-green-500/10 border border-green-500/10">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center mb-4 text-white">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 7L9 18L4 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Гарантия результата</h3>
              <p className="opacity-70">
                Наши методики доказали свою эффективность на практике при
                подготовке к экзаменам
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="py-8 px-4 border-t border-black/[.08] dark:border-white/[.08] mt-auto bg-black/[.02] dark:bg-white/[.02]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-6 sm:mb-0">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              BitLab
            </div>
            <p className="text-sm opacity-60 mt-1">© 2025 Все права защищены</p>
          </div>
          <div className="flex gap-8 flex-wrap items-center justify-center">
            <a
              className="flex items-center gap-2 hover:text-purple-500 transition-colors"
              href="#"
            >
              О нас
            </a>
            <a
              className="flex items-center gap-2 hover:text-purple-500 transition-colors"
              href="#"
            >
              Контакты
            </a>
            <a
              className="flex items-center gap-2 hover:text-purple-500 transition-colors"
              href="#"
            >
              Блог
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
