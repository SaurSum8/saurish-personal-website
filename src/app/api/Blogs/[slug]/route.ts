import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import blogSchema from "@/database/blogSchema";

// If { params } looks confusing, check the note below this code block
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectDB(); // function from db.ts before
  const { slug } = await params; // another destructure

  try {
    const blog = await blogSchema.findOne({ slug }).orFail();
    return NextResponse.json(blog);
  } catch (err) {
    console.log("GET ERROR-", err);
    return NextResponse.json("Blog not found.", { status: 404 });
  }
}
