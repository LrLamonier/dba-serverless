import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import APIFeatures from "@/utils/ApiFeatures";
import models from "@/data/models";
import AppError from "@/utils/AppError";

export const GET = async (
  req: NextRequest,
  { params: { collection } }: { params: { collection: string } }
) => {
  // if (collection === "nbelieve") {
  //   return NextResponse.redirect(new URL("/api/omagah", req.url));
  // }
  try {
    if (!models[collection]) {
      return NextResponse.json(
        {
          message: "The realm you are trying to reach if beyond your grasp.",
        },
        { status: 404 }
      );
    }

    await dbConnect();

    const queryString: string | null = req.nextUrl.searchParams.get("fields");

    const document: any = await new APIFeatures(
      models[collection].find(),
      queryString
    ).limitFields().query;

    if (document.length === 0) {
      return NextResponse.json(
        {
          message:
            "What you are looking for is nowhere to be found on the Entity's realm.",
        },
        { status: 204 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        results: document.length,
        data: document,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        status: "fail",
        message:
          "Claudette burned a Sacrificial Ward and cancelled your endpoint offering.",
      },
      { status: 500 }
    );
  }
};
