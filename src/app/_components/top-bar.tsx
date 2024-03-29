import Image from 'next/image';

type Props = {
  children: React.ReactNode;
  title: React.ReactNode | string;
  hideOnDesktop?: boolean;
};


export default function TopBar({ children, title, hideOnDesktop = false }: Props) {
  return (
    <div className={`flex ${hideOnDesktop ? "sm:hidden" : ""} flex-row items-center justify-between w-full h-20 sm:h-16 p-4 pr-8 shadow-md`}>
      <div className="flex flex-row items-center gap-4">
        <Image src="/images/bars-solid.svg" alt="menu" width={0} height={0} className="h-6 w-6 cursor-pointer sm:hidden" />
        <h1 className="font-semibold text-xl sm:text-base truncate">
          {title}
        </h1>
      </div>
      {children}
    </div>
  );
};
