import "./global.css";
import Link from "next/link";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-gray-100 shadow-md">
          <div className="container mx-auto">
          <div className="navbar">
            <div className="flex-1">
              <Link href = "/" className="btn btn-ghost text-xl">Haiku App</Link>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li>
                <Link href = "/login">Log In</Link>
                </li>
               
              </ul>
            </div>
          </div>
          </div>
        </header>
          <main className="container mx-auto p-10"> {children}</main>
       <footer className="text-gray-400 text-center text-xs py-5">
          <p>Copyright &copy; {new Date().getFullYear()} - All rights reserved.</p>
       </footer>
      </body>
    </html>
  );
}
