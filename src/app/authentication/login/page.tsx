"use client"
import { AuthService } from '@/features/authentication/services/authService';
import socketUtils from '@/networking/socketUtils';
import { setToken } from '@/store/slices/authenticationSlice';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, FormEvent, ChangeEvent, JSX } from 'react';
import { useDispatch } from "react-redux";

// Define types for form errors
interface FormErrors {
  email?: string;
  password?: string;
  form?: string;
}

function Login(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter()

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    // prevent default form submition
    e.preventDefault();

    // validate form
    if (!validateForm()) return;

    // start loading
    setIsLoading(true);

    try {
      const service = new AuthService();
      const res = await service.login({ email, password });
      dispatch(setToken(res.data.token));
      socketUtils.setAuthorizationToken(res.data.token);
      router.push("/rooms");
    } catch (error) {
      if (error instanceof AxiosError)
        setErrors({ form: error.response?.data?.message || 'An error occurred during login' });
      else
        setErrors({ form: 'An error occurred during login' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='h-full w-full flex justify-around flex-col items-center px-4 py-6'>
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      {errors.form && (
        <div
          className="w-full max-w-md p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
          role="alert"
          aria-live="assertive"
        >
          {errors.form}
        </div>
      )}

      <form
        className="w-full max-w-md space-y-6"
        onSubmit={handleSubmit}
        aria-label="Login form"
        noValidate
      >
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className={`w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:outline-none focus:ring-purple-500 ${errors.email ? 'border border-red-500' : 'border border-gray-600'
              }`}
            placeholder="name@example.com"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            autoComplete="email"
            required
          />
          {errors.email && (
            <p
              id="email-error"
              className="mt-1 text-sm text-red-500"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <a
              href="#"
              className="text-sm text-purple-400 hover:underline"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                // Handle forgot password
              }}
            >
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className={`w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:outline-none focus:ring-purple-500 ${errors.password ? 'border border-red-500' : 'border border-gray-600'
              }`}
            placeholder="••••••••"
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={errors.password ? 'password-error' : undefined}
            autoComplete="current-password"
            required
          />
          {errors.password && (
            <p
              id="password-error"
              className="mt-1 text-sm text-red-500"
            >
              {errors.password}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:cursor-pointer focus:ring-offset-2 disabled:opacity-70 font-medium"
          disabled={isLoading}
          aria-busy={isLoading ? 'true' : 'false'}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          ) : (
            'Sign in'
          )}
        </button>

        <p className="text-sm text-center text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/authentication/signup" className="text-purple-400 hover:underline">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;