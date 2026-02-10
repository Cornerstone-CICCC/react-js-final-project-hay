import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import LoginForm from './components/LoginForm';

const page = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value; // cookie session name
  if (session) {
    redirect('/');
  }

  return (
    <div>
      <div>
        <h1>Customer Login</h1>
        <p>Sign in to your Shine Studio account</p>
        <LoginForm />
        <p>
          Don't have an account?<Link href="/signup">Sign Up</Link>
        </p>
      </div>
      <div>
        <Image src="/assets/user/login.jpg" alt="" width={444} height={592} />
      </div>
    </div>
  );
};

export default page;
