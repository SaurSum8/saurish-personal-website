import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import blogSchema from "@/database/blogSchema";

type Params = { slug: string };

export async function GET(req: NextRequest, { params }: { params: Params }) {
  await connectDB();
  const { slug } = params;

  try {
    const blog = await blogSchema.findOne({ slug }).orFail();
    return NextResponse.json(blog);
  } catch (err) {
    console.log("GET API ERROR: ", err);
    return NextResponse.json("Blog not found.", { status: 404 });
  }
}
