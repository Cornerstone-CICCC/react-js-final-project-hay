'use client';

import { useRouter } from 'next/navigation';
import { type SubmitEvent, useState } from 'react';

const LoginForm = () => {
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');

  const router = useRouter();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error('Unable to log in');
        return;
      }
      alert(data.message);
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        className="border"
        placeholder="Enter your email..."
      />
      <div>
        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          className="border"
          placeholder="Enter your password..."
        />
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default LoginForm;
