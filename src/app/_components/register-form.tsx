'use client';

import { useState } from "react";

import CancelButton from '~/app/_components/cancel-button';
import SubmitButton from '~/app/_components/submit-button';
import { useRegisterUser } from "../_queries/registerUser";

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { registerUser, isPending, error } = useRegisterUser();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.length || !email.length) return;

    registerUser({ name, email });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <h1 className="text-center text-xl font-bold">Enter Name and Email</h1>
      <input
        placeholder="Name"
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
        disabled={isPending}
        className="w-full h-9 p-2 pl-4 bg-gray-100 rounded-full border-0 focus:outline-none focus:ring focus:ring-blue-500"
      />
      <input
        placeholder="Email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        disabled={isPending}
        className="w-full h-9 p-2 pl-4 bg-gray-100 rounded-full border-0 focus:outline-none focus:ring focus:ring-blue-500"
      />
      {error && (
        <div className="text-red-500 text-left text-wrap">
          <p className="text-md font-bold">Sorry, there was an error</p>
          <p className="text-md">
            {error.message.toLowerCase().includes('unique constraint failed')
              ? `User with email ${email} already exists`
              : 'Please try again later'
            }
          </p>
        </div>
      )}
      <div className="flex flex-row justify-between mt-2">
        <CancelButton text="Cancel" />
        <SubmitButton text="Register" disabled={isPending || !name.length || !email.length} />
      </div>
    </form>
  );
};

export default RegisterForm;
