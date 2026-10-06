"use client"

import { SearchHistoryItem } from "@/types/SearchHistoryItem"

type SearhcHistoryProps = {
    items: SearchHistoryItem[];
}

export default function SearchHistory ({items}: SearhcHistoryProps) {
    if (items.length==0) {
        return null;
    }

    return (
        <div className="mt-6">
            <h2 className="mb-3 text-lg font-semibold">
                Search history
            </h2>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-3 py-2 text-left">
                            Answer
                        </th>
                        <th className="border border-gray-300 px-3 py-2 text-left">
                            Model
                        </th>
                        <th className="border border-gray-300 px-3 py-2 text-right">
                            Tokens
                        </th>
                        <th className="w-16 border border-gray-300 px-3 py-2 text-right">
                            Min
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-3 py-2">
                                {item.answer}
                            </td>

                            <td className="border border-gray-300 px-3 py-2">
                                {item.model}
                            </td>
                            <td className="border border-gray-300 px-3 py-2 text-right">
                                {item.tokens}
                            </td>
                            <td className="w-16 border border-gray-300 px-3 py-2 text-right">
                                {item.minutes}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}