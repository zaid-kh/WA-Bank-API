import fs from "fs";
import { filePath } from "../utils/dataFilePath.js";

const readUsersFromFile = () => {
  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    throw new Error("Error reading from user file");
  }
};

export { readUsersFromFile };
