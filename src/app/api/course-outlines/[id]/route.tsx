export { GET } from "./get"
import { CourseOutlineDetail } from "@/types";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const updatedCourseOutline: CourseOutlineDetail = await req.json();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json(updatedCourseOutline, { status: 200 });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json(id, { status: 200 });
}
