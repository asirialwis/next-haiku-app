import Link from "next/link";
import RegisterForm from "../components/RegisterForm";
import { getUserFromCookie } from "../lib/getUser";
import Dashboard from "../components/Dashboard";

export default async function Page() {
  const user = await getUserFromCookie();

  return (
    <>
      {user && <Dashboard user = {user}/>}
      {!user && (
        <>
          <p className="text-center text-2xl text-grey-600 mb-5">
            Don&rsquo;t have an account <strong>Create One</strong>
          </p>
          <RegisterForm />
        </>
      )}
    </>
  );
}
