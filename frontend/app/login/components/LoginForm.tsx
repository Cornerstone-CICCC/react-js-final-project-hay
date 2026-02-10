'use client';

import { useRouter } from 'next/navigation';
import { type ChangeEvent, type SubmitEvent, useState } from 'react';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import { useAuthStore } from '@/app/store/auth.store';

type FormData = {
  email: string;
  password: string;
};
const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const setLoggedIn = useAuthStore((s) => s.setLoggedIn);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // Password Visible
  const togglePasswordVisible = () => {
    setIsPasswordVisible((current) => !current);
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setError('');

    if (!formData.email.trim() || !formData.password.trim()) {
      return;
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      if (!res.ok) {
        setError('Your email or password does not match.');
        return;
      }
      const data = await res.json();
      setLoggedIn(true);
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="border"
        placeholder="Enter your email..."
      />
      {submitted && !formData.email.trim() && (
        <p className="text-red-500">Please enter your email address.</p>
      )}
      <div>
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border"
          placeholder="Enter your password..."
        />
        <button type="button" onClick={togglePasswordVisible}>
          {isPasswordVisible ? <GoEye /> : <GoEyeClosed />}
        </button>
      </div>
      {submitted && !formData.password.trim() && (
        <p className="text-red-500">Please enter your password.</p>
      )}
      <p className="text-red-500">{error}</p>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default LoginForm;
