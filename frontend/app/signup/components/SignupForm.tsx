'use client';

import { useRouter } from 'next/navigation';
import { type ChangeEvent, type SubmitEvent, useEffect, useState } from 'react';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import zxcvbn from 'zxcvbn';
import { useAuthStore } from '@/app/store/auth.store';
import { useCartStore } from '@/app/store/cart.store';
import { useWishlistStore } from '@/app/store/wishlist.store';

type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  const [passwordScore, setPasswordScore] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const router = useRouter();

  const setUser = useAuthStore((s) => s.setUser);
  const setCart = useCartStore((s) => s.setCart);
  const setCartId = useCartStore((s) => s.setCartId);
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
  const toggleConfirmVisible = () => {
    setIsConfirmVisible((current) => !current);
  };

  // Password Score
  useEffect(() => {
    const result = zxcvbn(formData.password);
    setPasswordScore(result.score);
  }, [formData.password]);

  const getScoreLabel = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return 'Very Weak';
      case 2:
        return 'Weak';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  };
  const getScoreBg = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return 'bg-red-200';
      case 2:
        return 'bg-orange-200';
      case 3:
        return 'bg-yellow-200';
      case 4:
        return 'bg-green-200';
      default:
        return '';
    }
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    if (
      !formData.firstname.trim() ||
      !formData.lastname.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim() ||
      formData.password !== formData.confirmPassword ||
      passwordScore < 3
    ) {
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message || 'Unable to sign up');
        return;
      }

      setUser({
        id: data.newUser._id,
        firstname: data.newUser.firstname,
      });
      setCart([]);
      setCartId(data.cartId);
      setWishlist([]);

      router.push('/');
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="mb-4">
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="border border-slate-500 bg-slate-100 rounded-xl px-5 py-3 w-full outline-none"
            placeholder="First name..."
          />
          {submitted && !formData.firstname.trim() && (
            <p className="text-[#DA2929] text-sm mt-1">Please enter your first name.</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="border border-slate-500 bg-slate-100 rounded-xl px-5 py-3 w-full outline-none"
            placeholder="Last name..."
          />
          {submitted && !formData.lastname.trim() && (
            <p className="text-[#DA2929] text-sm mt-1">Please enter your last name.</p>
          )}
        </div>
      </div>
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
      <div className="mb-4">
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
        <p className="mt-2 text-sm">
          Password strength:{' '}
          <span
            className={`${getScoreBg(passwordScore)} px-2 text-base/4 text-xs inline-block rounded-sm`}
          >
            {formData.password.trim() === '' ? '' : getScoreLabel(passwordScore)}
          </span>
        </p>
        {submitted && formData.password.trim() && passwordScore < 3 && (
          <p className="text-[#DA2929] text-sm mt-1">Please enter stronger password.</p>
        )}
      </div>
      <div className="mb-7">
        <div className="flex border border-slate-500 bg-slate-100 rounded-xl">
          <input
            type={isConfirmVisible ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="px-5 py-3 w-full outline-none"
            placeholder="Confirm your password..."
          />
          <button
            type="button"
            className="min-w-[48] flex justify-center items-center"
            onClick={toggleConfirmVisible}
          >
            {isConfirmVisible ? <GoEye /> : <GoEyeClosed />}
          </button>
        </div>
        {submitted && !formData.confirmPassword.trim() && (
          <p className="text-[#DA2929] text-sm mt-1">Please enter your password again.</p>
        )}
        {submitted &&
          formData.password.trim() &&
          formData.password !== formData.confirmPassword && (
            <p className="text-[#DA2929] text-sm mt-1">Passwords do not match.</p>
          )}
      </div>
      <button
        type="submit"
        className="bg-[#008FAB] text-white font-bold px-5 py-4 w-full outline-none rounded-xl cursor-pointer transition hover:opacity-86"
      >
        Create Account
      </button>
    </form>
  );
};

export default SignupForm;
