import { ByGroup } from "./ByGroup";
import { Category } from "./Category";
import { Gender } from "./Gender";
import { Rol } from "./Rol";
import { Status } from "./Status";

export interface User {
  name: String;
  nickname: String;
  email: String;
  password: number;
  birthdate: String;
  phone_number: String;
  avatar_url: String;
  make_date: String;
  access: number;
  id_bygroup: ByGroup;
  id_gender: Gender;
  id_rol: Rol;
  id_status: Status;
  id_category: Category;
}
