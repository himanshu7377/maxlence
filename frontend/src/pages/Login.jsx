import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { BsTwitterX } from "react-icons/bs";
// import { loginUserApi } from "../constants/apiUrls";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
    const Loginurl='http://localhost:8000/api/auth/login'
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	const onSubmit = async (fieldsData) => {
		setIsLoading(true);

		const headersList = {
			Accept: "*/*",
			"Content-Type": "application/json",
		};

		const bodyContent = JSON.stringify({
			email: fieldsData.email,
			password: fieldsData.password,
		});

		const reqOptions = {
			url: Loginurl,
			method: "POST",
			headers: headersList,
			data: bodyContent,
		};

		try {
			const response = await axios.request(reqOptions);

			if (!response.data) {
				console.log("");
				return toast.error(response.data.message || "User login Failed");
			}

			setIsLoading(false);
			toast.success(`${response.data?.message || "Successfully logged in!"}`);
			navigate("/");

		} catch (error) {
			setIsLoading(false);
			console.log(error);

			if (error.response && error.response.status === 400) {
				// Handle bad request error
				return toast.error("Bad request. Please check your inputs.");
			}

			// Handle other errors
			return toast.error(
				error.response.data.data?.message || "An error occurred. Please try again later."
			);
		}
	};

	return (
		<div className='flex justify-center items-center '>
			<div className='w-full max-w-xl p-6 mt-32 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:shadow shadow-slate-600 dark:bg-gray-800'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
					Sign in to Maxlence
				</h2>
				<form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label
							htmlFor='email'
							className='flex items-start mb-2 text-md ml-1 font-medium text-gray-900 dark:text-white '
						>
							Your email <span className='text-red-600 ml-1 font-medium'>*</span>
						</label>
						<input
							type='email'
							name='email'
							id='email'
							{...register("email", { required: true })}
							className='w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white'
							placeholder='email@company.com'
						/>
						{errors.email && (
							<span className='text-red-500 text-left w-full flex mt-2 ml-1'>
								Email is required
							</span>
						)}
					</div>
					<div>
						<label
							htmlFor='password'
							className='flex items-start mb-2 text-md ml-1 font-medium text-gray-900 dark:text-white '
						>
							Your password <span className='text-red-600 ml-1 font-medium'>*</span>
						</label>
						<input
							autoComplete='off'
							type='password'
							name='password'
							id='password'
							{...register("password", { required: true })}
							placeholder='Enter your password'
							className='w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white'
						/>
						{errors.password && (
							<span className='text-red-500 text-left w-full flex mt-2 ml-1'>
								Password is required
							</span>
						)}
					</div>
					<div className='flex items-start'>
						<div className='flex items-center h-5'>
							<input
								id='remember'
								aria-describedby='remember'
								name='remember'
								defaultChecked={true}
								type='checkbox'
								className='w-4 h-4 border-gray-500 outline-none rounded bg-gray-100 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 '
							/>
						</div>
						<div className='ml-3 text-sm'>
							<label
								htmlFor='remember'
								className='font-medium text-gray-900 dark:text-white'
							>
								Remember me
							</label>
						</div>
						<Link
							to={"/forgot-password"}
							className='ml-auto text-sm text-blue-700 hover:underline dark:text-white'
						>
							Lost Password?
						</Link>
					</div>
					<button
						type='submit'
						disabled={isLoading}
						className='min-w-full px-5 py-3 bg-slate-600 hover:bg-slate-800 dark:hover:bg-stone-800 duration-200 ease-out dark:bg-zinc-900 text-base font-medium text-center text-white  rounded-lg  focus:ring-4 focus:ring-blue-300 sm:w-auto dark:focus:ring-blue-800 md:mt-10 disabled:cursor-wait flex justify-center items-center'
					>
						<span className='mr-2 '>Login</span>
						{isLoading && (
							<span className='pt-1'>
								<div className='spinner-border spinner-border-sm text-light' role='status'>
									<span className='visually-hidden'>Loading...</span>
								</div>
							</span>
						)}
					</button>

					<div className='social-accounts flex w-full items-center justify-center gap-6 md:gap-6'>
						<div id='google' className='cursor-pointer' title='Login with Google'>
							{/* onClick={loginWithGoogle} */}
							<FcGoogle size={35} />
						</div>
						<div id='twitter' className='cursor-pointer' title='Login with Twitter'>
							{/* onClick={loginWithTwitter} */}
							<BsTwitterX size={30} />
						</div>
						<div
							id='github'
							className='cursor-pointer dark:text-white text-black'
							title='Login with Github'
						>
							{/* onClick={loginWithGitHub} */}
							<ImGithub size={35} />
						</div>
					</div>

					<div className='text-sm font-medium text-gray-800 dark:text-gray-400'>
						Not registered?{" "}
						<Link to={"/register"} className='dark:text-white hover:underline '>
							Create an account
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
