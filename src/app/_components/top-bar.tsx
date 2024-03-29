import SidebarMenu from '~/app/_components/sidebar-menu';

type Props = {
  children: React.ReactNode;
  title: React.ReactNode | string;
  hideOnDesktop?: boolean;
};


export default function TopBar({ children, title, hideOnDesktop = false }: Props) {
  return (
    <div className={`flex ${hideOnDesktop ? "sm:hidden" : ""} flex-row items-center justify-between w-full h-20 sm:h-16 p-4 pr-8 shadow-md`}>
      <div className="flex flex-row items-center gap-4">
        <SidebarMenu />
        <h1 className="font-semibold text-xl sm:text-base truncate">
          {title}
        </h1>
      </div>
      {children}
    </div>
  );
};
