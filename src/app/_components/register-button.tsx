'use client';

import { useModal } from "~/lib/zustand";

import RegisterForm from "./register-form";

const RegisterButton = () => {
  const { open } = useModal();

  const onClick = () => {
    open(<RegisterForm />);
  };

  return (
    <button onClick={onClick} className="rounded-full bg-black/10 px-3 py-1 sm:px-4 sm:py-3 ml-1 sm:ml-2 text-xl sm:text-2xl font-semibold no-underline transition hover:bg-black/20">
      Register
    </button>
  );
};

export default RegisterButton;
