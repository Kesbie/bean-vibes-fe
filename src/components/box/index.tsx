import { cn } from "@/lib/utils";
import React from "react";

type BoxProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

const Box = (props: BoxProps) => {
  const { children, className, title } = props;

  return (
    <div className={cn("bg-white rounded-lg shadow-md p-6", className)}>
      {title}
      {children}
    </div>
  );
};

export default Box;
