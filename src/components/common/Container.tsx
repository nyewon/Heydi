import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  withBottomNav?: boolean;
}

const Container = ({
  children,
  className = "",
  withBottomNav = false,
}: Props) => {
  return (
    <div
      className={`
        w-full flex flex-col justify-center items-center
        px-10 mt-4
        ${withBottomNav ? "mb-20" : "mb-0"} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;
