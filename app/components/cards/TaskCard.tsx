import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Difficulty, Status } from "@prisma/client";
import clsx from "clsx";

type TaskCardProps = {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  points: number;
  status: Status;
  image?: string;
};

const difficultyColors = {
  EASY: "bg-green-100 text-green-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  HARD: "bg-orange-100 text-orange-800",
  EXPERT: "bg-red-100 text-red-800",
};

const statusColors = {
  NOT_STARTED: "bg-gray-100 text-gray-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-emerald-100 text-emerald-800",
};

export function TaskCard({
  id,
  title,
  description,
  difficulty,
  points,
  status,
  image = "/images/task-default.jpg",
}: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden shadow-lg h-72 cursor-pointer"
      whileHover={{
        scale: 1.03,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/tasks/${id}`} className="block h-full">
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative h-full flex flex-col justify-between p-5">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span
                className={clsx(
                  "px-2 py-1 rounded-full text-xs font-semibold",
                  difficultyColors[difficulty]
                )}
              >
                {difficulty}
              </span>
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {points} pts
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mt-2 mb-1">{title}</h3>

            <motion.p
              className="text-white/80 text-sm line-clamp-2"
              animate={{ opacity: isHovered ? 1 : 0.8 }}
            >
              {description}
            </motion.p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span
              className={clsx(
                "px-3 py-1 rounded-full text-sm font-medium",
                statusColors[status]
              )}
            >
              {status.replace("_", " ")}
            </span>

            <motion.div
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
