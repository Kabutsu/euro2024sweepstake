'use client';

const SearchBar = () => {
  return (
    <div className="flex items-center justify-center">
      <input
        type="text"
        placeholder="Search groups"
        className="w-full h-10 p-2 pl-4 border-0 bg-gray-100 rounded-full"
      />
    </div>
  );
};

export default SearchBar;