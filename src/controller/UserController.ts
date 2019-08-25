import {User} from "../entity/User";
import { BaseController } from "./BaseController";
import { Request } from "express";

export class UserController extends BaseController<User>{
  constructor() {
    super(User);
  }

  async save(request: Request) {
    let _user = <User>request.body; // aqui faço um casting, tornando os dados do body em dados do User

    // estou herdando de dentro do BaseController, as notifications
    // passando as informações da orm do User para jogar entao pra baseController fazer as operações necessárias
    super.IsRequired(_user.name, 'O nome do usuário é obrigatório');
    super.IsRequired(_user.photo, 'A foto do usuário é obrigatória');
    super.IsRequired(_user.email, 'O email do usuário é obrigatório');
    super.IsRequired(_user.password, 'A senha do usuário é obrigatória');

    return super.save(_user);
  }
}
