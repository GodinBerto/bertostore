import type { ReactNode } from "react";

declare global {
  type _children = {
    children: ReactNode;
  };

  type GridLayout = _children & {
    className?: string;
  };
}

export {};
