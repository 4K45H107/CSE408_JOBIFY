import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col ">
      <div className="flex justify-between py-4 px-8 items-center bg-black">
        <div className="h-12 w-12 bg-amber-300 rounded-full"></div>
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <form className="flex flex-col border px-6 py-10 gap-3 justify-center">
          <h3 className="pb-8">Login/SignUp to JOBIFY</h3>
          <button
            type="submit"
            className="bg-gray-700 rounded text-white px-4 py-1 active:bg-slate-600 w-32 mx-auto"
          >
            <Link href="/login">Login</Link>
          </button>
          <button
            type="submit"
            className="bg-gray-700 rounded text-white px-4 py-1 active:bg-slate-600 w-32 mx-auto"
          >
            <Link href="/register">Sign Up</Link>
          </button>
        </form>
      </div>
    </div>
  );
}
