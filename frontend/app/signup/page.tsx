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
    <div>
      <div>
        <h1>Create an Account</h1>
        <p>Create an account to enjoy personalized shopping experience</p>
        <SingupForm />
        <p>
          Already have an account?<Link href="/login">Sign In</Link>
        </p>
      </div>
      <div>
        <Image src="/assets/user/signup.jpg" alt="" width={444} height={592} />
      </div>
    </div>
  );
};

export default page;
