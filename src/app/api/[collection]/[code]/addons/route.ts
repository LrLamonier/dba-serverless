import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import models from "@/data/models";
import { TCode, getOne, limitFields } from "@/utils/fns";

export const GET = async (
  req: NextRequest,
  {
    params: { collection, code },
  }: {
    params: { collection: string; code: string };
  }
) => {
  try {
    if (
      !models[collection] ||
      (collection !== "killer" && collection !== "item")
    ) {
      return NextResponse.json(
        {
          message: "The realm you are trying to reach is beyond your grasp.",
        },
        { status: 404 }
      );
    }

    const codeFieldName: TCode = {};
    if (collection === "killer") {
      codeFieldName.killerCode = code;
    } else {
      codeFieldName.itemType = code;
    }

    dbConnect();

    const document = await models[collection + "-addon"]
      .find(codeFieldName)
      .select(limitFields(req));

    if (document.length === 0) {
      return NextResponse.json(
        {
          status: "fail",
          results: 0,
          message:
            "What you are looking for is nowhere to be found on the Entity's realm.",
        },
        { status: 404 }
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
  } catch (err) {
    return NextResponse.json(
      {
        status: "fail",
        results: null,
        message:
          "Claudette burned a Sacrificial Ward and cancelled your endpoint offering.",
      },
      { status: 500 }
    );
  }
};
