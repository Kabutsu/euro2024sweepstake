'use client';

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { api } from "~/lib/trpc/react";
import { useModal } from "~/lib/zustand";

export const useRegisterUser = () => {
  const router = useRouter();
  const { close } = useModal();

  const { mutate: registerUser, isPending, error } = api.user.createUser.useMutation({
    onSuccess: async ({ email }) => {
      await signIn('credentials', {
        username: email,
        redirect: false,
      });
      close();
      router.refresh();
    },
  });

  return { registerUser, isPending, error };
}