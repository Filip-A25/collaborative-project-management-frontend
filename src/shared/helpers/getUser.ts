import { cookies } from "next/headers";
import { decodeJwt } from "jose";

export const getUser = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;

  return authToken ? decodeJwt(authToken) : null;
};
