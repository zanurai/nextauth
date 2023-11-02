import { getServerSession } from "next-auth";
import RegisterForm from "../components/RegisterForm";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
