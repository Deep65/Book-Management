"use client";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../../../lib/mutations/user";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from 'next/navigation';

// Define the form data interface
interface IFormData {
  email: string;
  name: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  name: yup.string().required("Username is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
});

export default function Register() {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<IFormData>({
    resolver: yupResolver(schema)
  });

  const [registerUser, { error }] = useMutation(REGISTER_USER);

  const onSubmit = async (formData: IFormData) => {
    try {
      await registerUser({ variables: formData });
      router.push('/login');
    } catch (err) {
      console.error("Registration error", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Create an Account</h2>
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
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              {...register("name")}
              className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded mt-1 text-black`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
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
            Register
          </button>
          
          {error && <p className="text-red-500 text-sm mt-4">{error.message}</p>}
        </form>
      </div>
    </div>
  );
}
