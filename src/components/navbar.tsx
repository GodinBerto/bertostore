import { Search, ShoppingCart, User } from "lucide-react";
import GridLayout from "./ui/grid";

export default function Navbar() {
  return (
    <GridLayout>
      <div className="w-full flex justify-between items-center p-0">
        <div className="flex items-center gap-3 w-fit h-15 border-r border-border p-3">
          <h1 className="font-semibold text-xl">
            BERTO <span className="text-blue-500">STORE</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 w-fit border-l border-border p-3 h-15">
          <div className="bg-background-secondary rounded-full max-w-[300px] flex items-center px-3 py-1">
            <input type="text" name="search" id="search" placeholder="Search" />
            <Search size={20} className="text-foreground/80" />
          </div>
          <div className="bg-background-secondary rounded-full max-w-[300px] flex items-center p-2">
            <ShoppingCart size={20} className="text-foreground/80" />
          </div>
          <div className="bg-background-secondary rounded-full max-w-[300px] flex items-center p-2">
            <User size={20} className="text-foreground/80" />
          </div>
        </div>
      </div>
    </GridLayout>
  );
}
