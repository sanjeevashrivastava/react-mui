import http from "../http-common";
import UserDTO from "../types/UserDTO";
class UserService {
  async GetPage(
    filterText: string,
    sortField: string,
    sortDirection: string,
    startIndex: number,
    pageSize: number,
  ): Promise<{users:UserDTO[], totalRecords: number}> {
    return (await http.get(
      "/user/getPage?filterText=" +
        filterText 
        +"&sortField=" +
        sortField +
        "&sortDirection=" +
        sortDirection +
        "&startIndex=" +
        startIndex +
        "&pageSize=" +
        pageSize,
    )).data;
  }
  async Insert(data: any): Promise<boolean> {
    return await http.post("/user/insert", data);
  }
  async Update(data: any): Promise<boolean> {
    return await http.put("/user/update", data);
  }
  async Delete(ids: any): Promise<boolean> {
    return await http.delete("/user/delete", {data:{ids: ids.join(',')}});
  }
  async Get(id: string): Promise<UserDTO> {
    return (await http.get("/user/get?id=" + id)).data;
  }
   async EMailExists(id: string, email: string): Promise<boolean> {
    return (await http.get("/user/emailExists?id=" + id + "&email=" + email)).data;
  }
   async MobileNoExists(id:string, mobile_no: string): Promise<boolean> {
    return (await http.get("/user/mobileNoExists?id=" + id + "&mobile_no=" + encodeURIComponent(mobile_no))).data;
  }
   async UserNameExists(id: string, user_name: string): Promise<boolean> {
    return (await http.get("/user/userNameExists?id=" + id + "&user_name=" + user_name)).data;
  }
}
const userServiceObject = new UserService()
export default userServiceObject;
