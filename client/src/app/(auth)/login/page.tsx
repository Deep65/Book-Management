"use client";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../../../lib/mutations/user";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setCookie } from 'cookies-next';
import { useRouter } from "next/navigation";

// Define the form data interface
interface ILoginForm {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required")
});

export default function Login() {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>({
    resolver: yupResolver(schema)
  });

  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  const onSubmit = async (formData: ILoginForm) => {
    console.log(formData,"formData")
    try {
      const response = await login({ variables:  formData  });
      console.log(data?.login,"data")
      if (data?.login) {
        setCookie('token', data?.login);
        router.push("/books");
      }
    } catch (err) {
      console.error("Login error", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded mt-1 text-black`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded mt-1 text-black`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-semibold">
            {loading ? 'Logging in...' : 'Login'}
          </button>
          
          {error && <p className="text-red-500 text-sm mt-4">{error.message}</p>}
        </form>
      </div>
    </div>
  );
}
