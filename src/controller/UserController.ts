import {User} from "../entity/User";
import { BaseController } from "./BaseController";
import { Request } from "express";

export class UserController extends BaseController<User>{
  constructor() {
    super(User);
  }

  async save(request: Request) {
    let _user = <User>request.body; 
    super.IsRequired(_user.name, 'O nome do usuário é obrigatório');
    super.IsRequired(_user.photo, 'A foto do usuário é obrigatória');
    super.IsRequired(_user.email, 'O email do usuário é obrigatório');
    super.IsRequired(_user.password, 'A senha do usuário é obrigatória');

    return super.save(_user);
  }
}
