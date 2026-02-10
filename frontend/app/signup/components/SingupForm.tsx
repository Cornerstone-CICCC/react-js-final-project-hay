'use client';

import { useRouter } from 'next/navigation';
import { type ChangeEvent, type SubmitEvent, useEffect, useState } from 'react';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import zxcvbn from 'zxcvbn';
import { useAuthStore } from '@/app/store/auth.store';

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
        console.error('Unable to sign up');
        return;
      }
      setLoggedIn(true);
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
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          className="border"
          placeholder="First name..."
        />
        {submitted && !formData.firstname.trim() && (
          <p className="text-red-500">Please enter your first name.</p>
        )}
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          className="border"
          placeholder="Last name..."
        />
        {submitted && !formData.lastname.trim() && (
          <p className="text-red-500">Please enter your last name.</p>
        )}
      </div>
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
      {submitted && formData.password.trim() && passwordScore < 3 && (
        <p className="text-red-500">Please enter stronger password.</p>
      )}
      <p>
        Password strength:{' '}
        <span className={getScoreBg(passwordScore)}>
          {formData.password.trim() === '' ? '' : getScoreLabel(passwordScore)}
        </span>
      </p>
      <div>
        <input
          type={isConfirmVisible ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="border"
          placeholder="Confirm your password..."
        />
        <button type="button" onClick={toggleConfirmVisible}>
          {isConfirmVisible ? <GoEye /> : <GoEyeClosed />}
        </button>
      </div>
      {submitted && !formData.confirmPassword.trim() && (
        <p className="text-red-500">Please enter your password again.</p>
      )}
      {submitted && formData.password.trim() && formData.password !== formData.confirmPassword && (
        <p className="text-red-500">Passwords do not match.</p>
      )}
      <button type="submit">Create Account</button>
    </form>
  );
};

export default SignupForm;
