import { useForm } from "react-hook-form";
import { BsTwitterX } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

const Register = () => {
  const [previewSource, setPreviewSource] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page if user is logged in
    // You can handle this logic as per your requirement
    // For now, it's left empty
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);

      // Prepare form data
      const formDataObj = new FormData();
      formDataObj.append("fullName", formData.fullName);
      formDataObj.append("email", formData.email);
      formDataObj.append("password", formData.password);
      formDataObj.append("role", formData.role);
      formDataObj.append("avatar", avatar);

      // Make API request to register user
      const { data } = await axios.post('http://localhost:8000/api/auth/register', formDataObj);

      console.log(data);

      // Handle response
      if (!data.token) {
        return toast.error(data.message || "User registration failed");
      }

      setIsLoading(false);
      toast.success(data.message || "Successfully Registered!");
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      setIsLoading(false);
      toast.error(
        error.response?.data?.error ||
          "Error occurred during registration. Please try again later."
      );
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setAvatar(file);
  };

  return (
    <div className="h-full">
      <div className="flex justify-center items-center mt-10">
        <div className="w-full max-w-xl p-6 mt-32 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:shadow shadow-slate-600 dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Register for Maxlence
          </h2>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Full Name Input */}
            <div>
              <label
                htmlFor="fullName"
                className="flex items-start mb-2 text-md ml-1 font-medium text-gray-900 dark:text-white"
              >
                Full Name{" "}
                <span className="text-red-600 ml-1 font-medium">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                {...register("fullName", { required: true })}
                className="bg-gray-100 text-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-blue-500 dark:focus:border-blue-600 px-5 py-3 border border-gray-300 dark:border-blue-400 border-opacity-50 text-blue-dark bg-ternary-light rounded-md shadow-sm text-md"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <span className="text-red-500 ease-in duration-300 block pt-1 text-start">
                  Full Name is required
                </span>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="flex items-start mb-2 text-md ml-1 font-medium text-gray-900 dark:text-white"
              >
                Email{" "}
                <span className="text-red-600 ml-1 font-medium">*</span>
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                className="bg-gray-100 text-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-blue-500 dark:focus:border-blue-600 px-5 py-3 border border-gray-300 dark:border-blue-400 border-opacity-50 text-blue-dark bg-ternary-light rounded-md shadow-sm text-md"
                placeholder="email@company.com"
              />
              {errors.email && (
                <span className="text-red-500 ease-in duration-300 block pt-1 text-start">
                  Email is required
                </span>
              )}
            </div>

            {/* Avatar Input */}
            <div className="flex items-center md:gap-14 gap-3">
              <div className="left">
                <label
                  htmlFor="avatar"
                  className="flex items-start mb-2 text-md ml-1 font-medium text-gray-900 dark:text-white"
                >
                  Avatar{" "}
                  <span className="text-red-600 ml-1 font-medium">*</span>
                </label>
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  required
                  onChange={handleFileInputChange}
                  className="bg-gray-100 text-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-blue-500 dark:focus:border-blue-600 px-5 py-3 border border-gray-300 dark:border-blue-400 border-opacity-50 text-blue-dark bg-ternary-light rounded-md shadow-sm text-md"
                  placeholder="Enter your avatar"
                />
                {errors.avatar && errors.avatar.type === "required" && (
                  <span className="text-red-500 ease-in duration-300 block pt-1 text-start">
                    Avatar is required
                  </span>
                )}
              </div>
              <div className="preview rounded-full h-14 w-14">
                {previewSource && (
                  <img
                    src={previewSource}
                    alt="Preview"
                    className="mb-4 rounded-lg absolute md:-mt-2 md:w-28 md:h-28 sm:mb-0 xl:mb-4 2xl:mb-0 w-14 h-14 mt-3"
                  />
                )}
                {!previewSource && (
                  <img
                    src="https://as2.ftcdn.net/v2/jpg/02/44/43/69/1000_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
                    alt="Hello avatar"
                    className="rounded-full mt-5 md:mt-4"
                  />
                )}
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label
                htmlFor="role"
                className="flex items-start mb-2 text-md ml-1 font-medium text-gray-900 dark:text-white "
              >
                Role
              </label>
              <select
                defaultValue="admin"
                id="role"
                {...register("role", { required: true })}
                className="bg-gray-100 text-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-blue-500 dark:focus:border-blue-600 px-5 py-3 border border-gray-300 dark:border-blue-400 border-opacity-50 text-blue-dark bg-ternary-light rounded-md shadow-sm text-md"
              >
                <option value="" className="m-3">
                  Select Role
                </option>
                <option value="admin" className="m-3">
                  Admin
                </option>
                <option value="user" className="m-3">
                  User
                </option>
              </select>
              {errors.role && (
                <span className="text-red-500 ease-in duration-300 block pt-1 text-start">
                  Please select a user role
                </span>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="flex items-start mb-2 text-md ml-1 font-medium text-gray-900 dark:text-white"
              >
                Password{" "}
                <span className="text-red-600 ml-1 font-medium">*</span>
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
                className="bg-gray-100 text-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-blue-500 dark:focus:border-blue-600 px-5 py-3 border border-gray-300 dark:border-blue-400 border-opacity-50 text-blue-dark bg-ternary-light rounded-md shadow-sm text-md"
                placeholder="Enter your password"
                autoComplete="off"
              />
              {errors.password && errors.password.type === "required" && (
                <span className="text-red-500 ease-in duration-300 block pt-1 text-start">
                  Password is required
                </span>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <span className="text-red-500 ease-in duration-300 block pt-1 text-start">
                  Password must have at least 6 characters
                </span>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="flex items-start mb-2 text-md ml-1 font-medium text-gray-900 dark:text-white"
              >
                Confirm Password{" "}
                <span className="text-red-600 ml-1 font-medium">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
                className="bg-gray-100 text-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-blue-500 dark:focus:border-blue-600 px-5 py-3 border border-gray-300 dark:border-blue-400 border-opacity-50 text-blue-dark bg-ternary-light rounded-md shadow-sm text-md"
                placeholder="Confirm your password"
                autoComplete="off"
              />
              {errors.confirmPassword &&
                errors.confirmPassword.type === "required" && (
                  <span className="text-red-500 ease-in duration-300 block pt-1 text-start">
                    Confirm Password is required
                  </span>
                )}
              {errors.confirmPassword && (
                <span className="text-red-500 ease-in duration-300 block pt-1 text-start">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Register Button */}
            <button
              disabled={isLoading}
              type="submit"
              className="min-w-full min px-5 py-3 text-base font-medium text-center text-white bg-slate-600 hover:bg-slate-800 dark:hover:bg-stone-800 duration-200 ease-out dark:bg-zinc-900 rounded-lg  focus:ring-4 focus:ring-blue-300 sm:w-auto   dark:focus:ring-blue-800 flex justify-center items-center disabled:cursor-wait"
            >
              <span className="mr-2 ">Register</span>
              {isLoading && <div>Loading...</div>}
            </button>

            {/* Social Login Icons */}
            <div className="social-accounts flex w-full items-center justify-center gap-6 md:gap-6">
              <div
                id="google"
                className="cursor-pointer"
                title="Login with Google"
              >
                <FcGoogle size={35} />
              </div>
              <div
                id="github"
                className="cursor-pointer dark:text-white text-black"
                title="Login with Github"
              >
                <ImGithub size={35} />
              </div>
              <div
                id="twitter"
                className="cursor-pointer"
                title="Login with Twitter"
              >
                <BsTwitterX size={30} />
              </div>
            </div>

            {/* Login Link */}
            <div className="text-sm font-medium text-gray-800 dark:text-gray-400">
              Already have an account?{" "}
              <Link to={"/login"} className="dark:text-white hover:underline ">
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
