import Link from "next/link";
import RegisterForm from "../components/RegisterForm";
import { getUserFromCookie } from "../lib/getUser";

export default async function Page() {
  const user = await getUserFromCookie();

  return (
    <>
      {user && <p>Welcome, You are logged in.</p>}
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
