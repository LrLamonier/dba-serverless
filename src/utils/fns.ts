import models from "@/data/models";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

interface IExclude {
  $project: {
    _id: 0;
  };
}

interface IAdd {
  $project: {
    [key: string]: 1;
  };
}

export type TCode = {
  code?: string;
  survivorCode?: string;
  killerCode?: string;
  itemType?: string;
};

type TQueryMessage = {
  status?: string;
  results?: number | null;
  data?: any;
  message?: string;
};

type TQueryStatus = {
  status: number;
};

type TQuery = [message: TQueryMessage, status: TQueryStatus];

export type TProject = [exclude: IExclude, add?: IAdd];

export const limitFields = (req: NextRequest): string => {
  const queryString: string | null = req.nextUrl.searchParams.get("fields");

  if (!queryString) {
    return "-_id -__v";
  }

  return "-_id " + queryString.split(",").join(" ");
};

export const limitFieldsAggregate = (req: NextRequest): TProject => {
  const queryString: string | null = req.nextUrl.searchParams.get("fields");

  const exclude: IExclude = {
    $project: {
      _id: 0,
    },
  };

  if (!queryString) {
    return [exclude];
  }

  const add: IAdd = {
    $project: {},
  };

  const fields: string[] = queryString.split(",");

  fields.forEach((f) => {
    add.$project[f] = 1;
  });
  return [exclude, add];
};

export const getOne = async (
  collection: string,
  code: string,
  req: NextRequest
): Promise<TQuery> => {
  try {
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
      return [
        {
          status: "fail",
          results: 0,
          message:
            "What you are looking for is nowhere to be found on the Entity's realm.",
        },
        { status: 404 },
      ];
    }

    return [
      {
        status: "success",
        results: document.length,
        data: document,
      },
      { status: 200 },
    ];
  } catch (err) {
    return [
      {
        status: "fail",
        results: null,
        message:
          "Claudette burned a Sacrificial Ward and cancelled your endpoint offering.",
      },
      { status: 500 },
    ];
  }
};
