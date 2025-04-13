import { redirect } from "next/navigation";
import { NEXT_AUTH } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { Sign_Up } from "../../../components/sign-up";

export default async function Signup() {
  const session = await getServerSession(NEXT_AUTH);
  if (session?.user) {
    redirect("/");
  } else {
    return <Sign_Up />;
  }
}
