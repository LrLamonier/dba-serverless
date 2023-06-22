import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import models from "@/data/models";
import { TCode, limitFields } from "@/utils/fns";

export const GET = async (
  req: NextRequest,
  {
    params: { collection, code, additional },
  }: {
    params: { collection: string; code: string; additional: string };
  }
) => {
  try {
    const additionalName = additional.endsWith("s")
      ? additional.slice(0, -1)
      : additional;

    if (!models[collection + "-" + additionalName]) {
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
    }
    if (collection === "survivor") {
      codeFieldName.survivorCode = code;
    }
    if (collection === "item") {
      codeFieldName.itemType = code;
    }

    dbConnect();

    const document = await models[collection + "-" + additionalName]
      .find(codeFieldName)
      .select(limitFields(req));

    if (document.length === 0) {
      return NextResponse.json(
        {
          message:
            "What you are looking for is nowhere to be found on the Entity's realm.",
        },
        { status: 204 }
      );
    }

    return NextResponse.json({
      status: "fail",
      results: document.length,
      data: document,
    });
  } catch (err) {
    console.log(
      `error at route: /api/${collection}/${code}/${additional}`,
      err
    );
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
