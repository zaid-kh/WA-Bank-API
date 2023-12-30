import "dotenv/config";
import STATUS_CODES from "../constants/statusCodes.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode === STATUS_CODES.OK
      ? STATUS_CODES.INTERNAL_SERVER_ERROR
      : res.statusCode;
  res.status(statusCode);
  res.send({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // error stack to be hidden on production
  });
};
