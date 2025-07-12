import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    const response = await fetch(
      "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
        method: "POST",
        body: JSON.stringify({ inputs: text }),
      }
    );
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sentiment" }, { status: 500 });
  }
}
