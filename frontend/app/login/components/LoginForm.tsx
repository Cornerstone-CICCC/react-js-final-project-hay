'use client';

import { useRouter } from 'next/navigation';
import { type ChangeEvent, type SubmitEvent, useState } from 'react';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import { useAuthStore } from '@/app/store/auth.store';
import { useCartStore } from '@/app/store/cart.store';
import { useWishlistStore } from '@/app/store/wishlist.store';

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

  const setUser = useAuthStore((s) => s.setUser);
  const setCart = useCartStore((s) => s.setCart);
  const setWishlist = useWishlistStore((s) => s.setWishlist);

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
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Your email or password does not match.');
        return;
      }
      setUser(data.user);
      setCart(data.cartItems);
      setWishlist(data.wishlist);

      router.push('/');
      router.refresh();
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-slate-500 bg-slate-100 rounded-xl px-5 py-3 w-full outline-none"
          placeholder="Enter your email..."
        />
        {submitted && !formData.email.trim() && (
          <p className="text-[#DA2929] text-sm mt-1">Please enter your email address.</p>
        )}
      </div>
      <div className="mb-7">
        <div className="flex border border-slate-500 bg-slate-100 rounded-xl">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="px-5 py-3 w-full outline-none"
            placeholder="Enter your password..."
          />
          <button
            type="button"
            className="min-w-[48] flex justify-center items-center"
            onClick={togglePasswordVisible}
          >
            {isPasswordVisible ? <GoEye /> : <GoEyeClosed />}
          </button>
        </div>
        {submitted && !formData.password.trim() && (
          <p className="text-[#DA2929] text-sm mt-1">Please enter your password.</p>
        )}
      </div>
      <p className="text-[#DA2929] text-sm mb-2">{error}</p>
      <button
        type="submit"
        className="bg-[#008FAB] text-white font-bold px-5 py-4 w-full outline-none rounded-xl cursor-pointer transition hover:opacity-86"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
