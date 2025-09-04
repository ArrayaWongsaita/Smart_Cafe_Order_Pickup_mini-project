import React, { ReactNode } from 'react';

interface HeaderWrapperProps {
  children: ReactNode;
}

export default function HeaderWrapper({ children }: HeaderWrapperProps) {
  return (
    <>
      <div className="fixed top-0 w-full z-50 bg-primary flex justify-center border-b-2 border-primary-dark">
        <div className="w-full max-w-7xl  flex justify-center">
          <div className="w-[95%]    flex justify-between items-center px-4 py-2 bg-primary relative">
            {children}
          </div>
        </div>
      </div>
      <div className="w-full h-[58px] bg-primary-purple"></div>
    </>
  );
}
