const LoginPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <form className="flex flex-col border px-6 py-10">
        <lebel>Enter your User Name:</lebel>
        <input
          className="border rounded py-3 px-2 mb-3"
          type="text"
          placeholder="User Name"
        ></input>
        <lebel>Enter your Password:</lebel>
        <input
          className="border rounded py-2 px-2 mb-3"
          type="password"
          placeholder="Password"
        ></input>
        <button className="bg-gray-700 rounded text-white px-4 py-1 active:bg-slate-600 w-32 mx-auto">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
