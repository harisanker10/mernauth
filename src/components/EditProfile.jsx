import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEditProfileMutation } from "../slices/auth/userApiSlice";
import { setUser } from "../slices/auth/authSlice";
import { Oval } from "react-loader-spinner";

export const EditProfile = () => {
  const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  const { username, email, fullname } = user;
  const [formData, setFormData] = useState({
    username,
    email,
    fullname,
  });
  const [passwordSelection, setPasswordSelection] = useState(false);
  const [editProfile, { isLoading, isError, error }] = useEditProfileMutation();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const togglePasswordSelection = (event) => {
    setPasswordSelection(event.target.checked);
  };
  const handleImageSelection = (event) => {
    setFormData({ ...formData, avatar: event?.target?.files[0] });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const form = new FormData();
    for (let key in formData) {
      if (formData[key] && formData[key].toString().trim()) form.append(key, formData[key]);
    }

    const res = await editProfile(form);
    console.log({ res });
    if (res.data) {
      dispatch(setUser({ ...res.data.user }));
    }
  };
  return (
    <div className=" flex w-full p-4">
      <form className="flex w-full flex-col gap-2 p-12" onSubmit={handleSubmit}>
        <h1 className="mb-2 text-2xl font-semibold">Edit Profile</h1>
        <input
          type="text"
          className={`box-border w-full rounded-lg border border-gray-200 px-6 py-2 outline-none`}
          placeholder="Fullname"
          name="fullname"
          onChange={handleChange}
        />
        <input
          type="text"
          className={`box-border w-full rounded-lg border border-gray-200 px-6 py-2 outline-none`}
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="email"
          className={`box-border w-full rounded-lg border border-gray-200 px-6 py-2 outline-none`}
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <div
          className={`flex flex-col gap-2 overflow-hidden transition-all ${passwordSelection ? `max-h-44` : `max-h-0`}`}
        >
          <input
            type="password"
            className={`box-border w-full rounded-lg border border-gray-200 px-6 py-2 outline-none`}
            placeholder="Old Password"
            name="password"
            disabled={!passwordSelection}
            onChange={handleChange}
          />
          <input
            type="password"
            className={`box-border w-full rounded-lg border border-gray-200 px-6 py-2 outline-none`}
            placeholder="New password"
            name="newPassword"
            disabled={!passwordSelection}
            onChange={handleChange}
          />
          <input
            type="password"
            className={`box-border w-full rounded-lg border border-gray-200 px-6 py-2 outline-none`}
            placeholder="Confirm New Password"
            name="confirmNewPassword"
            disabled={!passwordSelection}
            onChange={handleChange}
          />
        </div>
        <label className="flex items-center gap-2" htmlFor="include-password">
          <input
            className="outline-none"
            type="checkbox"
            id="include-password"
            onChange={togglePasswordSelection}
          />
          Change Password
        </label>
        <div
          className={`my-4 h-0 w-full rounded border-red-300 bg-red-100 p-0 px-4 text-red-500 shadow-md shadow-gray-100 transition-all delay-1000 ${isError ? "h-auto border py-2" : null}`}
        >
          {error?.data?.message}
        </div>
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
            "Edit Profile"
          )}
        </button>
      </form>
      <div className="w-1/3 py-24">
        <div className="m-3 h-[240px] w-[240px] overflow-hidden rounded-full">
          <img
            className="h-full w-full object-cover"
            src={
              formData?.avatar
                ? URL.createObjectURL(formData.avatar)
                : user.avatar
            }
            alt=""
          />
        </div>
        <input type="file" name="file" onInput={handleImageSelection} />
      </div>
    </div>
  );
};
