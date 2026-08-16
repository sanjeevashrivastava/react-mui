import BaseDTO from "./BaseDTO";

export default interface UserDTO extends BaseDTO {
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string;
  user_name: string;
  password: string;
  status: string;
}

export const USER: UserDTO = Object.freeze({
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  mobile_no: "",
  user_name: "",
  password: "",
  status: " ",
});
