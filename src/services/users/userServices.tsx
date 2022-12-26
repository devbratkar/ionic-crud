import axios from "axios";
import { User } from "../../types/userTypes";

export const getAllUser = async () => {
  return await axios.get("http://localhost:5050/user/all").then(res => res).catch(err => err)
}

export const getOneUser = async (id: number) => {
  return await axios.get(`http://localhost:5050/user/${id}`).then(res => res).catch(err => err)
}

export const updateOneUser = async (id:number, data: User | any) => {
  return await axios.put(`http://localhost:5050/user/edit/${id}`, {...data}).then(res => res).catch(err => err)
}

export const deleteUser = async (id: number) => {
  return await axios.delete(`http://localhost:5050/user/${id}`).then(res => res).catch(err => err)
}

export const addUser = async (data: User | any) => {
  return await axios.post(`http://localhost:5050/user/add`, {...data})
}