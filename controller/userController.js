import STATUS_CODES from "../constants/statusCodes.js";
import { readUsersFromFile, writeUsersToFile } from "../model/user.js";
import { v4 as uuidv4 } from "uuid";

let users = readUsersFromFile();

// const users =
/**
 * @desc Get all the users
 * @route GET /api/v1/users/
 * @access public
 */
export const getAllUsers = async (req, res, next) => {
  // Implementation for getting all users
  try {
    res.send(users);
  } catch (error) {
    res.status(404).send("No users found.");
  }
};

/**
 * @desc Get a user by ID
 * @route GET /api/v1/users/:id
 * @access public
 * @returns {Promise<Object>} The user object
 */
export const getUserById = async (req, res, next) => {
  // Implementation for getting a user by ID
  try {
    const { id } = req.params;
    const user = users.find((user) => user.ID == id);
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("User not found");
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Create a new user
 * @route POST /api/v1/users/
 * @access public
 * @returns {Promise<Object>} The created user object
 */
export const createUser = async (req, res, next) => {
  try {
    // get data from request body
    const { name, birthdate, gender } = req.body;
    if (!name || !birthdate || !gender) {
      res.status(STATUS_CODES.BAD_REQUEST);
      throw new Error("All fields (name, birthdate, gender) are required");
    }
    const userData = req.body;
    // check if user exists (checking for unique name)
    if (
      users.some((user) => {
        user.name == userData.name;
      })
    ) {
      res.status(STATUS_CODES.CONFLICT);
      throw new Error("A user with the same name already exists");
    }
    const user = {
      ID: uuidv4(),
      ...userData,
      cash: 0,
      credit: 0,
    };
    users.push(user);
    writeUsersToFile(users);
    res.status(STATUS_CODES.CREATED).send(user);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Deposit cash to a user
 * @route PUT /api/v1/users/:id/deposit
 * @access public
 * @returns {Promise<Object>} The updated user object
 */
export const depositToUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    if (!amount) {
      res.status(STATUS_CODES.BAD_REQUEST);
      throw new Error("Amount is required");
    }
    const user = users.find((user) => user.ID == id);
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("User not found");
    }
    user.cash += amount;
    writeUsersToFile(users);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @desc Withdraw cash from a user
 * @route PUT /api/v1/users/:id/withdraw
 * @access public
 * @returns {Promise<Object>} The updated user object
 */
export const withdrawFromUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    if (!amount) {
      res.status(STATUS_CODES.BAD_REQUEST);
      throw new Error("Amount is required");
    }
    const user = users.find((user) => user.ID == id);
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("User not found");
    }
    if (user.cash < amount) {
      res.status(STATUS_CODES.BAD_REQUEST);
      throw new Error("Not enough cash");
    }
    user.cash -= amount;
    writeUsersToFile(users);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Delete a user
 * @route DELETE /api/v1/users/:id
 * @access public
 * @returns {Promise<Object>} The deleted user object
 */
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = users.find((user) => user.ID == id);
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("User not found");
    }
    users = users.filter((user) => user.ID != id);
    writeUsersToFile(users);
    res.send(user);
  } catch (error) {}
};

/**
 * @desc Transfer cash from one user to another
 * @route PATCH /api/v1/users/:from/transfer/:to
 * @access public
 * @returns {Promise<Object>} The updated user object
 */
export const transferFromUser = async (req, res, next) => {
  try {
    const { from, to } = req.params;
    const { amount } = req.body;
    if (!amount) {
      res.status(STATUS_CODES.BAD_REQUEST);
      throw new Error("Amount is required");
    }
    const userFrom = users.find((user) => user.ID == from);
    const userTo = users.find((user) => user.ID == to);
    if (!userFrom || !userTo) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("User not found");
    }
    if (userFrom.cash < amount) {
      res.status(STATUS_CODES.BAD_REQUEST);
      throw new Error("Not enough cash");
    }
    userFrom.cash -= amount;
    userTo.cash += amount;
    writeUsersToFile(users);
    res.send(userFrom);
  } catch (error) {
    next(error);
  }
};
