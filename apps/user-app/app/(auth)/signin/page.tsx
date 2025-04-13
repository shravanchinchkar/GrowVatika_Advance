import { redirect } from "next/navigation";
import { NEXT_AUTH } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { Sign_In } from "../../../components/sign-in";

export default async function Signin() {
  const session = await getServerSession(NEXT_AUTH);
  if (session?.user) {
    redirect("/");
  } else {
    return <Sign_In />;
  }
}
