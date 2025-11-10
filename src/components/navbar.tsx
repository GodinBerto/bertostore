import { Search, ShoppingCart, User } from "lucide-react";
import GridLayout from "./ui/grid";

export default function Navbar() {
  return (
    <GridLayout>
      <div className="w-full flex justify-end">
        <div className="flex items-center gap-3 w-fit border-l border-border p-4">
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
