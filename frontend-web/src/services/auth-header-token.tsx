import { AuthContext } from "@/context/auth.context";
import { useContext } from "react";

export default function AuthHeader() {
  const {user} = useContext(AuthContext);
  if (user) {
    console.log('hsdfh')
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}