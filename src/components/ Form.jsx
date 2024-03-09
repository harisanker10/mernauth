import { FaGoogle } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { Oval } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Form({ template, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();


  const { title, fields } = template;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const watchValues = watch()
  console.log(watchValues)
  const renderFields = (fields) => {
    return fields.map((field) => {
      const { name, type, placeholder } = field;
      switch (type) {
        case "text":
          return (
            <div className="mb-2" key={name}>
              <input
                key={name}
                type={type}
                className={`box-border w-full rounded-lg border px-6 py-2 outline-none ${errors[name] ? "border-red-400" : "border-gray-200"}`}
                placeholder={placeholder}
                name={name}
                {...register(name, { required: `${placeholder} is required` })}
              />
              {errors[name] ? (
                <span className="text-red-500 ms-2">
                  {errors[name]["message"]}
                </span>
              ) : null}
            </div>
          );

        default:
          return (
            <h1 className="text-red-500 text-3xl"> ---- Invalid Field----</h1>
          );
      }
    });
  };

  return (
    <>
      <div className="w-100 flex h-screen items-center justify-center bg-gray-50">
        <div className="mx-auto flex w-2/3 flex-col items-center rounded-lg border border-t-gray-100 bg-white px-8 py-8 shadow-lg md:w-[500px] md:py-16">
          <h1 className="md:text3xl mb-10 text-2xl font-bold">{title}</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {renderFields(fields)}

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
                "Sign Up"
              )}
            </button>
            <div
              className={`my-4 h-0 w-full rounded border-red-300 bg-red-100 p-0 px-4 text-red-500 shadow-md shadow-gray-100 transition-all delay-1000 ${error ? "h-auto border py-2" : null}`}
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
            <button className="my-2 box-border flex flex-grow items-center justify-center rounded-lg border border-gray-200 py-2 font-bold transition-all hover:bg-gray-100">
              <FaGoogle />
              <span className="ml-2">Google</span>
            </button>
            <button className="my-2 box-border flex flex-grow items-center justify-center rounded-lg border border-gray-200 py-2 font-bold transition-all hover:bg-gray-100">
              <FaPhoneAlt />
              <span className="ml-2">Phone</span>
            </button>
          </div>
          <div className="my-4 text-gray-400">
            Already a user?
            <span className="pl-1">Sign in</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
