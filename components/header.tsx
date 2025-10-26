"use client";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export default function HeaderCart({
  cartItemCount,
  onCartClick,
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-gray-900">My Shop</h1>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onCartClick}
              className="relative inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 active:scale-[0.98] transition"
            >
              Cart ({cartItemCount})
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
