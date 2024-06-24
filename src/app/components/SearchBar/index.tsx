import { useState } from "react"

interface SearchBarProps {
    onSearch: (value: string) => void;
  }

export default function SearchBar({ onSearch: onSearch }: SearchBarProps) {
    const [search, setSearch] = useState<string>("")

    const handleChange = (event: any) => {
        setSearch(event.target.value);
        onSearch(event.target.value);
        console.log(event.target.value);
      };

    return (
        <div className="flex justify-center">
            <input
                type="text"
                value={search}
                onChange={handleChange}
                placeholder="Search for a card"
                className="w-1/2 p-2 border-2 border-gray-300 rounded-lg"
            />
        </div>
    )
}