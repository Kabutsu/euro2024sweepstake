'use client';

import { useCallback } from 'react';
import { useModal } from '~/lib/zustand';

const Modal = () => {
  const { children, isOpen, close } = useModal();

  const bgRef = useCallback((node: HTMLDivElement) => {
    if (!node) {
      return;
    }

    const onClick = (e: MouseEvent) => {
      if (e.target === node) {
        close();
      }
    };

    node.addEventListener('click', onClick);

    return () => {
      node.removeEventListener('click', onClick);
    };
  }, [close]);

  return (
    <div ref={bgRef} className={`fixed z-50 inset-0 bg-black flex items-center justify-center ${isOpen ? "bg-opacity-50 " : "opacity-0 bg-opacity-0 invisible"} transition-opacity duration-300`}>
      <div className={`bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96 ${isOpen ? "scale-100" : "scale-0 opacity-0"} transition duration-[450ms]`}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
