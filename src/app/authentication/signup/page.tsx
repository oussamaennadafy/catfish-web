"use client"
import { AuthService } from '@/features/authentication/services/authService';
import socketUtils from '@/networking/socketUtils';
import { setToken } from '@/store/slices/authenticationSlice';
import { setUser } from '@/store/slices/userSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, FormEvent, ChangeEvent, useEffect, JSX } from 'react';
import { useDispatch } from 'react-redux';

// Define types for form errors and fields
interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  form?: string;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

function Signup(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    label: 'Too weak',
    color: 'bg-red-500'
  });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const dispatch = useDispatch();
  const router = useRouter();

  // Password strength calculation
  useEffect(() => {
    if (!password) {
      setPasswordStrength({ score: 0, label: 'Too weak', color: 'bg-red-500' });
      return;
    }

    let score = 0;
    // Length check
    if (password.length >= 8) score += 1;
    // Contains uppercase
    if (/[A-Z]/.test(password)) score += 1;
    // Contains lowercase
    if (/[a-z]/.test(password)) score += 1;
    // Contains number
    if (/[0-9]/.test(password)) score += 1;
    // Contains special char
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    let strengthLabel = '';
    let strengthColor = '';

    switch (score) {
      case 0:
      case 1:
        strengthLabel = 'Too weak';
        strengthColor = 'bg-red-500';
        break;
      case 2:
        strengthLabel = 'Weak';
        strengthColor = 'bg-orange-500';
        break;
      case 3:
        strengthLabel = 'Medium';
        strengthColor = 'bg-yellow-500';
        break;
      case 4:
        strengthLabel = 'Strong';
        strengthColor = 'bg-green-400';
        break;
      case 5:
        strengthLabel = 'Very strong';
        strengthColor = 'bg-green-600';
        break;
      default:
        strengthLabel = 'Too weak';
        strengthColor = 'bg-red-500';
    }

    setPasswordStrength({
      score,
      label: strengthLabel,
      color: strengthColor
    });
  }, [password]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength.score < 3) {
      newErrors.password = 'Password is too weak';
    }

    if (!passwordConfirm) {
      newErrors.passwordConfirm = 'Please confirm your password';
    } else if (passwordConfirm !== password) {
      newErrors.passwordConfirm = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const service = new AuthService();
      const res = await service.signup({ email, name, password, passwordConfirm });
      dispatch(setToken(res.data.token));
      dispatch(setUser(res.data.data.user));
      socketUtils.setAuthorizationToken(res.data.token);
      router.push("/rooms");
    } catch (error: unknown) {
      let errorMessage = 'Registration failed';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setErrors({ form: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='h-full w-full flex justify-around flex-col items-center px-4 py-6'>
      <h1 className="text-2xl font-bold mb-6">Create an Account</h1>

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
        aria-label="Signup form"
        noValidate
      >
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className={`w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:outline-none focus:ring-purple-500 ${errors.name ? 'border border-red-500' : 'border border-gray-600'
              }`}
            placeholder="John Doe"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            autoComplete="name"
            required
          />
          {errors.name && (
            <p
              id="name-error"
              className="mt-1 text-sm text-red-500"
            >
              {errors.name}
            </p>
          )}
        </div>

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
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className={`w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:outline-none focus:ring-purple-500 ${errors.password ? 'border border-red-500' : 'border border-gray-600'
                }`}
              placeholder="••••••••"
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error password-requirements' : 'password-requirements'}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-400"
              aria-label={passwordVisible ? "Hide password" : "Show password"}
            >
              {passwordVisible ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02 8.971m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <p
              id="password-error"
              className="mt-1 text-sm text-red-500"
            >
              {errors.password}
            </p>
          )}

          {/* Password strength indicator */}
          <div className="mt-2" id="password-requirements" aria-live="polite">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">Password strength:</span>
              <span className="text-xs font-medium" style={{
                color: passwordStrength.color === 'bg-red-500' ? '#ef4444' :
                  passwordStrength.color === 'bg-orange-500' ? '#f97316' :
                    passwordStrength.color === 'bg-yellow-500' ? '#eab308' :
                      passwordStrength.color === 'bg-green-400' ? '#4ade80' : '#16a34a'
              }}>
                {passwordStrength.label}
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full ${passwordStrength.color} transition-all duration-300 ease-out`}
                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                role="progressbar"
                aria-valuenow={(passwordStrength.score / 5) * 100}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="passwordConfirm"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Confirm Password
          </label>
          <input
            type={passwordVisible ? "text" : "password"}
            id="passwordConfirm"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value)}
            className={`w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:outline-none focus:ring-purple-500 ${errors.passwordConfirm ? 'border border-red-500' : 'border border-gray-600'
              }`}
            placeholder="••••••••"
            aria-invalid={errors.passwordConfirm ? 'true' : 'false'}
            aria-describedby={errors.passwordConfirm ? 'confirm-password-error' : undefined}
            autoComplete="new-password"
            required
          />
          {errors.passwordConfirm && (
            <p
              id="confirm-password-error"
              className="mt-1 text-sm text-red-500"
            >
              {errors.passwordConfirm}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
            required
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
            I agree to the <a href="#" className="text-purple-400 hover:underline">Terms of Service</a> and <a href="#" className="text-purple-400 hover:underline">Privacy Policy</a>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70 font-medium cursor-pointer"
          disabled={isLoading}
          aria-busy={isLoading ? 'true' : 'false'}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
          ) : (
            'Create Account'
          )}
        </button>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{' '}
          <Link href="/authentication/login" className="text-purple-400 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;