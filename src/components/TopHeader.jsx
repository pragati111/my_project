import { Search } from "lucide-react";

export default function TopHeader() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white flex items-center justify-between px-4 md:px-8 py-4 border-b">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src="https://via.placeholder.com/120x40"
          alt="logo"
          className="h-8 md:h-10"
        />
        <span className="font-bold text-sm md:text-lg">
          DELUXE
        </span>
      </div>

      {/* Search */}
      <div className="flex items-center border rounded-full px-3 md:px-4 py-1 md:py-2 w-[160px] md:w-[400px]">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 outline-none text-xs md:text-sm"
        />
        <Search size={16} />
      </div>
    </div>
  );
}