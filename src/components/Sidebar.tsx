"use client";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "@/components/Box";
import SidebarItem from "@/components/SidebarItem";
import Library from "@/components/Library";
import QueueModal from "@/components/QueueModal";
import { useAppSelector } from "@/redux/hooks";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathName = usePathname();
  const { isOpenQueueModal } = useAppSelector((state) => state.app);

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathName !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathName === "/search",
        href: "/search",
      },
    ],
    [pathName],
  );

  return (
    <div className={"flex h-full"}>
      <div
        className={
          "hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2"
        }
      >
        <Box>
          <div className={"flex flex-col gap-y-4 px-5 py-4"}>
            {routes.map((item) => {
              return <SidebarItem key={item.label} {...item} />;
            })}
          </div>
        </Box>
        <Box className={"overflow-y-auto h-full"}>
          <Library />
        </Box>
      </div>
      <main className={"h-full w-[100vw] flex-1 overflow-y-auto overflow-hidden py-2"}>
        {children}

        {isOpenQueueModal && (
          <QueueModal className={`absolute top-2 bottom-[80px] md:w-full lg:w-[710px]`} />
        )}
      </main>
    </div>
  );
};

export default Sidebar;
