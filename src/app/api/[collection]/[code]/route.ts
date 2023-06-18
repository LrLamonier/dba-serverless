import { NextRequest, NextResponse } from "next/server";
import models from "@/data/models";
import dbConnect from "@/lib/dbConnect";
import { limitFields } from "@/utils/fns";

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

    const codeFieldName: TCode = {};

    if (collection === "killer") {
      codeFieldName.killerCode = code;
    } else {
      codeFieldName.code = code;
    }

    const document = await models[collection]
      .find(codeFieldName)
      .select(limitFields(req));

    if (document.length === 0) {
      return NextResponse.json(
        {
          status: "fail",
          message:
            "What you are looking for is nowhere to be found on the Entity's realm.",
        },
        { status: 204 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        data: document,
      },
      { status: 200 }
    );
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
