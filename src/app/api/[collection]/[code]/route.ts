import { NextRequest, NextResponse } from "next/server";
import models from "@/data/models";
import dbConnect from "@/lib/dbConnect";
import { getOne } from "@/utils/fns";

type TCode = {
  code?: string;
  killerCode?: string;
};

export const GET = async (
  req: NextRequest,
  {
    params: { collection, code },
  }: { params: { collection: string; code: string } }
) => {
  try {
    if (!models[collection]) {
      return NextResponse.json(
        {
          message: "The realm you are trying to reach is beyond your grasp.",
        },
        { status: 404 }
      );
    }

    await dbConnect();

    const resBody = await getOne(collection, code, req);
    return NextResponse.json(...resBody);
  } catch (err) {
    console.log(err);
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
