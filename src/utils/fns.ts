import { NextRequest } from "next/server";

interface IProject {
  _id: 0;
  __v: 0;
  [key: string]: 0 | 1;
}

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
