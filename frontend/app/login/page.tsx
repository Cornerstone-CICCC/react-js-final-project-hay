'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';
import LoginForm from './components/LoginForm';

const page = () => {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <div className="pt-13 px-5 md:max-w-5xl md:mx-auto md:flex md:pt-20 md:justify-between md:gap-10 md:items-center">
      <div className="md:w-1/2">
        <h1 className="text-[#008FAB] font-bold text-3xl text-center mb-5 md:text-4xl">
          Customer Login
        </h1>
        <p className="text-slate-500 text-base/5 text-center mb-7">
          Sign in to your Shine Studio account
        </p>
        <LoginForm />
        <p className="mt-4 text-center">
          Don't have an account?
          <Link href="/signup" className="inline-block ml-2 text-[#008FAB]">
            Sign Up
          </Link>
        </p>
      </div>
      <div className="hidden md:block">
        <Image src="/assets/user/login.jpg" alt="" width={444} height={592} />
      </div>
    </div>
  );
};

export default page;
