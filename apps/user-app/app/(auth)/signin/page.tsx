import { redirect } from "next/navigation";
import { NEXT_AUTH } from "../../../lib/auth";
import { getServerSession } from "next-auth";
import { Sign_In } from "../../../components/user-signin";

export default async function Signin() {
  const session = await getServerSession(NEXT_AUTH);
  console.log("Userapp session is:", session);
  if (session?.user) {
    redirect("/");
  } else {
    return <Sign_In />;
  }
}
