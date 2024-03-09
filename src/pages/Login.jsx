import { FaGoogle } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import auth from "../firebase/firebaseConf";
import { useLoginMutation } from "../slices/auth/authApiSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { setToken, setUser } from "../slices/auth/authSlice";

function Login() {
  const provider = new GoogleAuthProvider();
  const [login, states] = useLoginMutation();
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { isLoading, isError, error } = states;
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const googleSignIn = async () => {
    const res = await signInWithPopup(auth, provider);
    const serverRes = await login({
      user: {
        identity: res?.user?.email,
        password: res?.user?.uid,
      },
    });
    console.log(
      "consolesdkfjasdjfl;safjasdfasfdlaskdjflasdfjalsdfj",
      serverRes,
    );
    if (serverRes.data) {
      dispatch(setToken(serverRes.data.token));
      dispatch(setUser({ ...serverRes.data.user }));
      navigate("/");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login({ user: formData });
    if (response?.data) {
      dispatch(setToken(response.data.token));
      dispatch(setUser({ ...response.data.user }));
      navigate("/");
    }
  };

  return (
    <>
      {token ? (
        <Navigate to="/" />
      ) : (
        <div className="w-100 flex h-screen items-center justify-center bg-gray-50">
          <div className="mx-auto flex w-2/3 flex-col items-center rounded-lg border border-t-gray-100 bg-white px-8 py-8 shadow-lg md:w-[500px] md:py-16">
            <h1 className="md:text3xl mb-10 text-2xl font-bold">Log In</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="mb-2 box-border w-full rounded-lg border border-gray-200 px-6 py-2 outline-none"
                placeholder="Username or Email"
                onChange={handleChange}
                name="identity"
              />
              <input
                type="password"
                className="mb-2 box-border w-full rounded-lg border border-gray-200 px-6 py-2 outline-none"
                placeholder="Password"
                onChange={handleChange}
                name="password"
              />

              <button
                className="my-2  box-border flex h-10 w-full  justify-center rounded-lg bg-blue-600 px-6 py-2 font-bold text-white outline-none transition-all hover:bg-blue-700"
                type="submit"
              >
                {isLoading ? (
                  <Oval
                    color="#000000"
                    height={24}
                    strokeWidth={0}
                    strokeWidthSecondary={6}
                    wrapperClass="my-auto"
                  />
                ) : (
                  "Log In"
                )}
              </button>
              <div
                className={`my-4 h-0 w-full rounded border-red-300 bg-red-100 p-0 px-4 text-red-500 shadow-md shadow-gray-100 transition-all delay-1000 ${isError ? "h-auto border py-2" : null}`}
              >
                {error?.data?.message}
              </div>
            </form>

            <div className="flex w-full items-center justify-between">
              <div className="h-[1px] w-2/5 bg-gray-200"></div>
              <div>or</div>
              <div className="h-[1px] w-2/5 bg-gray-200"></div>
            </div>

            <div className="flex w-full justify-between gap-2">
              <button
                onClick={googleSignIn}
                className="my-2 box-border flex flex-grow items-center justify-center rounded-lg border border-gray-200 py-2 font-bold transition-all hover:bg-gray-100"
              >
                <FaGoogle />
                <span className="ml-2">Google</span>
              </button>
              <button className="my-2 box-border flex flex-grow items-center justify-center rounded-lg border border-gray-200 py-2 font-bold transition-all hover:bg-gray-100">
                <FaPhoneAlt />
                <span className="ml-2">Phone</span>
              </button>
            </div>
            <div className="my-4 text-gray-400">
              New to site?
              <Link to="/signup">
                <span className="pl-1">Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
