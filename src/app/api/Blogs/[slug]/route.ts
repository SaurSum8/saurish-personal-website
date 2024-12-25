import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import blogSchema from "@/database/blogSchema";

interface RouteParams {
  params: {
    slug: string;
  };
}

export async function GET(req: NextRequest, context: RouteParams) {
  await connectDB(); // function from db.ts before
  const { slug } = context.params; // another destructure

  try {
    const blog = await blogSchema.findOne({ slug }).orFail();
    return NextResponse.json(blog);
  } catch (err) {
    console.log("GET API ERROR: ", err);
    return NextResponse.json("Blog not found.", { status: 404 });
  }
}
