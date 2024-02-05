import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col ">
      <div className="flex justify-between py-4 px-8 items-center bg-black">
        <img src="logo.jpg" className="h-12 rounded" />
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <form className="flex flex-col border px-6 py-10 gap-3 justify-center">
          <h3 className="pb-8">Login/SignUp to JOBIFY</h3>
          <Link
            href="/login"
            className="flex bg-gray-700 rounded text-white px-4 py-1 active:bg-slate-600 w-32 mx-auto justify-center"
          >
            <p>Login</p>
          </Link>
          <Link
            href="/register"
            className="flex bg-gray-700 rounded text-white px-4 py-1 active:bg-slate-600 w-32 mx-auto justify-center"
          >
            <p>Sign Up</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
