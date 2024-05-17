import { compare, hash } from "bcryptjs";

export const ValidEmail = (email: string) => {
  if (!email || String(email).length <= 2) return false;
  const regEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regEmail.test(String(email).toLowerCase());
};

export const GetToken = (barerToken: string) => {
  return String(barerToken).split(' ')[1] || '';
} 

export const GenerateHash = async (payload: string, salts: number) => {
  return await hash(payload, salts);
};

export const CompareHash = async (payload: string, hashed: string) => {
  return await compare(payload, hashed);
};
