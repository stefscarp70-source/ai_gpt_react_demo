import { ApplyState, ChefToolAction } from "@/types/ChefToolAction";
import { ChefTool } from "@/types/gpt";
import { useState } from "react";



type ChefToolListProps = {
    tools: ChefTool[];
    applyState: ApplyState;
    toolRunning: string;
    onApply: (tool: ChefTool) => void;
}

export default function ChefToolList({
    tools, onApply, applyState, toolRunning
}: ChefToolListProps) {
    
    return (
        <div className="mt-6">
            <h2 className="mb-3 text-lg font-semibold">
                Used tools
            </h2>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="px-3 py-2 text-left">
                            Tool
                        </th>
                        <th className="px-3 py-2 text-left">
                            Ingredients
                        </th>
                        <th className="px-3 py-2">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {tools.map((tool) => (
                        <tr
                            key={tool.name}
                            className="border-b"
                        >
                            <td className="px-3 py-3">
                                {tool.name}
                            </td>

                            <td className="px-3 py-3">
                                {tool.ingredientDtos
                                    .map((ingredient) =>
                                        `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`
                                    )
                                    .join(", ")
                                }
                            </td>

                            <td className="px-3 py-3 text-center">
                                <button
                                    type="button"
                                    disabled = {tool.action===ChefToolAction.OTHER}
                                    onClick={() => onApply(tool)}
                                    className={
                                        tool.action === ChefToolAction.OTHER
                                            ? "cursor-not-allowed rounded-md bg-gray-400 px-3 py-1 text-sm text-white"
                                            : "rounded-md bg-blue-600 px-3 py-1 text-sm text-white"
                                    }
                                >
                                    Apply
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        {applyState!==ApplyState.NOTYET && (
            <div className="mt-6">
                <h2 className="mb-3 text-lg font-semibold">Applying tool</h2>
                
                {applyState===ApplyState.RUNNING && (
                    <span className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                )}
                
                {applyState === ApplyState.COMPLETED && (
                    
                    <p className="mt-4 text-gray-600">
                        Tool execution {toolRunning}: status: <strong>{applyState.toString()}</strong>
                    </p>
                    
                )}
                        
            </div>     
        ) }
        
        </div>
    );
} 