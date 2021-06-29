import { NextFunction, Request, Response } from "express";

const rPadStr = (s: string, len: number) => {
  if (len <= 0) {
    throw new Error("bad arg " + len);
  }

  let diff = len - s.length;
  let res = s;
  for (; diff > 0; diff -= 1) {
    res += " ";
  }
  return res;
};

const logBody = (body: any, method: string) => {
  if (typeof body === "string") {
    return body;
  } else if (typeof body === "object") {
    const result = JSON.stringify(body);
    if (["POST", "PATCH", "PUT", "DELETE"].includes(method)) {
      return result;
    } else {
      return "";
    }
  } else if (!body || typeof body.toString !== "function") {
    return "";
  } else {
    return body.toString();
  }
};

export default (req: Request, res: Response, next: NextFunction) => {
  const isProd = process.env.NODE_ENV === "production";
  res.on("finish", () => {
    console.log(
      `${res.statusCode} ${rPadStr(req.method, 6)} ${req.originalUrl}${
        isProd ? "" : " " + logBody(req.body, req.method)
      }`
    );
  });

  next();
};
