import { NextRequest, NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";
import type { InfoTrack } from "@/types/song";

export async function POST(req: NextRequest) {
  let data: InfoTrack[] = [];
  const res = await req.json();

  try {
    const info = await ytdl.getInfo(
      "https://www.youtube.com/watch?v=" + res?.id,
    );

    if (info && info.formats) {
      const formats = info.formats;
      const audioFormats = formats
        .filter((x) => x.mimeType?.startsWith("audio/"))
        .sort((a, b) => {
          return (b?.audioBitrate || 0) - (a?.audioBitrate || 0);
        });
      data.push({
        id: res?.id,
        url: audioFormats[0].url,
        metadata: info,
      });
    }

    return NextResponse.json(
      {
        message: "successfully",
        data,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "a error have occurred!",
      },
      { status: 500 },
    );
  }
}
