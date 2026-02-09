import Image from 'next/image';
import Link from 'next/link';
import SingupForm from './components/SingupForm';

const page = () => {
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
        <Image src="../assets/user/signup.jpg" alt="" width={444} height={592} unoptimized />
      </div>
    </div>
  );
};

export default page;
