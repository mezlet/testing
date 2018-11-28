/* eslint-disable class-methods-use-this */

import db from '../db/db';

class UserController {
  getAllUsers(req, res) {
    return res.status(200).send({
      status: 200,
      data: db[0].users,
    });
  }
}

const userControllers = new UserController();
export default userControllers;
