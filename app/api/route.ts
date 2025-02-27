import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Предполагается, что у вас есть файл для подключения к Prisma

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      description,
      content,
      courseId,
      order = 0,
    } = await request.json();

    if (!title || !description || !content || !courseId) {
      return NextResponse.json(
        { error: "Необходимы title, description, content и courseId" },
        { status: 400 }
      );
    }

    const material = await prisma.material.create({
      data: {
        title,
        description,
        content,
        courseId,
        order,
      },
    });

    return NextResponse.json(material);
  } catch (error) {
    console.error("Ошибка создания материала:", error);
    return NextResponse.json(
      { error: "Ошибка создания материала" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (courseId) {
      const materials = await prisma.material.findMany({
        where: { courseId },
        orderBy: { order: "asc" },
      });
      return NextResponse.json(materials);
    }

    const materials = await prisma.material.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(materials);
  } catch (error) {
    console.error("Ошибка при получении материалов:", error);
    return NextResponse.json(
      { error: "Ошибка при получении материалов" },
      { status: 500 }
    );
  }
}
