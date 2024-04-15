import axios from "axios";
import { useForm } from "react-hook-form";
import { reuseInputClassnames } from "../constants/adminConstants";
import { forgotPasswordApi } from "../constants/apiUrl";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(forgotPasswordApi, { email: data.email });
            console.log(response.data);
            reset(); // Reset the form fields
            navigate("/login", { state: { email: data.email } }); // Navigate to the change password page
            toast.success("Reset link has been sent. Check your email.");
        } catch (error) {
            console.error(error);
            toast.error("Reset link not sent. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-full bg-white mt-32 rounded-lg shadow sm:max-w-md dark:bg-gray-800">
                <div className="w-full p-6 sm:p-8">
                    <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                        Forgot your password?
                    </h2>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Just type in your email and we will send you a link to reset your password!
                    </p>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label
                                htmlFor="email"
                                className="flex items-start mb-2 text-md ml-1 font-medium text-gray-900 dark:text-white"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                {...register("email", { required: "Email is required" })}
                                className={`${reuseInputClassnames}`}
                                placeholder="name@company.com"
                            />
                            {errors.email && (
                                <p className="text-base text-red-500 mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-5 py-3 bg-slate-600 hover:bg-slate-800 dark:hover:bg-stone-800 duration-200 ease-out dark:bg-zinc-900 text-base font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-blue-300 sm:w-auto dark:focus:ring-blue-800 inline-flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <span className="mr-2">Send reset password link</span>
                            {isSubmitting && <Spinner />}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
