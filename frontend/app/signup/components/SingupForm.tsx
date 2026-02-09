'use client';

import { useRouter } from 'next/navigation';
import { type SubmitEvent, useState } from 'react';

const SignupForm = () => {
  const [firstnameInput, setFirstnameInput] = useState<string>('');
  const [lastnameInput, setLastnameInput] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [confirmInput, setConfirmInput] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordInput !== confirmInput) {
      setMessage('Passwords do not match.');
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
          firstname: firstnameInput,
          lastname: lastnameInput,
          email: emailInput,
          password: passwordInput,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error('Unable to sign up');
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
      <div>
        <input
          type="text"
          value={firstnameInput}
          onChange={(e) => setFirstnameInput(e.target.value)}
          className="border"
          placeholder="First name..."
        />
        <input
          type="text"
          value={lastnameInput}
          onChange={(e) => setLastnameInput(e.target.value)}
          className="border"
          placeholder="Last name..."
        />
      </div>
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
      <div>
        <input
          type="password"
          value={confirmInput}
          onChange={(e) => setConfirmInput(e.target.value)}
          className="border"
          placeholder="Confirm your password..."
        />
      </div>
      {message ? <p>{message}</p> : <></>}
      <button type="submit">Create Account</button>
    </form>
  );
};

export default SignupForm;
