import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import blogSchema from "@/database/blogSchema";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await connectDB(); // function from db.ts before
  const { slug } = params; // another destructure

  try {
    const blog = await blogSchema.findOne({ slug }).orFail();
    return NextResponse.json(blog);
  } catch (err) {
    console.log("GET API ERROR: ", err);
    return NextResponse.json("Blog not found.", { status: 404 });
  }
}
