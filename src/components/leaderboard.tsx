"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

type Adventure = {
  id: number;
  name: string;
  plays: number;
  rating: number;
  createdAt: Date;
  createdBy: string;
};

const mockData: Adventure[] = [
  {
    id: 1,
    name: "The Lost City",
    plays: 1500,
    rating: 4.8,
    createdAt: new Date("2023-01-15"),
    createdBy: "AI",
  },
  {
    id: 2,
    name: "Dragon's Lair",
    plays: 2000,
    rating: 4.5,
    createdAt: new Date("2023-02-20"),
    createdBy: "AI",
  },
  {
    id: 3,
    name: "Space Odyssey",
    plays: 1800,
    rating: 4.7,
    createdAt: new Date("2023-03-10"),
    createdBy: "AI",
  },
  {
    id: 4,
    name: "Pirate's Cove",
    plays: 1200,
    rating: 4.3,
    createdAt: new Date("2023-04-05"),
    createdBy: "AI",
  },
  {
    id: 5,
    name: "Enchanted Forest",
    plays: 2200,
    rating: 4.9,
    createdAt: new Date("2023-05-01"),
    createdBy: "AI",
  },
];

type SortKey = "name" | "plays" | "rating" | "createdBy" | "createdAt";

export default function Leaderboard() {
  const [data, setData] = useState<Adventure[]>(mockData);
  const [sortKey, setSortKey] = useState<SortKey>("plays");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortData = (key: SortKey) => {
    const newData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return sortOrder === "asc" ? -1 : 1;
      if (a[key] > b[key]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setData(newData);
    setSortKey(key);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey) return null;
    return sortOrder === "asc" ? (
      <ChevronUp className="inline w-4 h-4" />
    ) : (
      <ChevronDown className="inline w-4 h-4" />
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              <button onClick={() => sortData("name")} className="font-bold">
                Adventure Name <SortIcon columnKey="name" />
              </button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              <button onClick={() => sortData("plays")} className="font-bold">
                Plays <SortIcon columnKey="plays" />
              </button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              <button onClick={() => sortData("rating")} className="font-bold">
                Rating <SortIcon columnKey="rating" />
              </button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              <button
                onClick={() => sortData("createdBy")}
                className="font-bold"
              >
                Created By <SortIcon columnKey="createdBy" />
              </button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              <button
                onClick={() => sortData("createdAt")}
                className="font-bold"
              >
                Created At <SortIcon columnKey="createdAt" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.map((adventure) => (
            <tr key={adventure.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {adventure.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {adventure.plays}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {adventure.rating.toFixed(1)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {adventure.createdBy}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {adventure.createdAt.toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
