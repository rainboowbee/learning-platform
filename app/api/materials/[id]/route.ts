import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const material = await prisma.material.findUnique({
      where: { id },
    });

    if (!material) {
      return NextResponse.json(
        { error: "Материал не найден" },
        { status: 404 }
      );
    }

    return NextResponse.json(material);
  } catch (error) {
    console.error("Ошибка при получении материала:", error);
    return NextResponse.json(
      { error: "Ошибка при получении материала" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { title, description, content, order, courseId } =
      await request.json();

    const updatedMaterial = await prisma.material.update({
      where: { id },
      data: {
        title,
        description,
        content,
        order,
        courseId,
      },
    });

    return NextResponse.json(updatedMaterial);
  } catch (error) {
    console.error("Ошибка при обновлении материала:", error);
    return NextResponse.json(
      { error: "Ошибка при обновлении материала" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.material.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ошибка при удалении материала:", error);
    return NextResponse.json(
      { error: "Ошибка при удалении материала" },
      { status: 500 }
    );
  }
}
