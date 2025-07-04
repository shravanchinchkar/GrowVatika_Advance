import { redirect } from "next/navigation";
import { NEXT_AUTH } from "../../../lib/auth";
import { getServerSession } from "next-auth";
import { Sign_Up } from "../../../components/user-signup";

export default async function Signup() {
  const session = await getServerSession(NEXT_AUTH);
  if (session?.user) {
    redirect("/");
  } else {
    return <Sign_Up />;
  }
}
