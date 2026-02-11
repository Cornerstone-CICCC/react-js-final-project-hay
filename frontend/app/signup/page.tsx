import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import SingupForm from './components/SingupForm';

const page = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value; // cookie session name
  if (session) {
    redirect('/');
  }

  return (
    <div className="pt-13 px-5 md:max-w-5xl md:mx-auto md:flex md:pt-30 md:justify-between md:gap-10 md:items-center">
      <div className="md:w-1/2">
        <h1 className="text-[#008FAB] font-bold text-3xl text-center mb-5 md:text-4xl">
          Create an Account
        </h1>
        <p className="text-slate-500 text-base/5 text-center mb-7">
          Create an account to enjoy personalized shopping experience
        </p>
        <SingupForm />
        <p className="mt-4 text-center">
          Already have an account?
          <Link href="/login" className="inline-block ml-2 text-[#008FAB]">
            Sign In
          </Link>
        </p>
      </div>
      <div className="hidden md:block">
        <Image src="/assets/user/signup.jpg" alt="" width={444} height={592} />
      </div>
    </div>
  );
};

export default page;
