import { ColorMode, ColorModeContext, useColorMode } from "@/contexts/ColorModeContext";
import { OllamaModel } from "@/types/OllamaModel";
import { useContext, useEffect, useRef, useState } from "react";

type SearchFormProps = {
    searchText: string;
    loading: boolean;
    onSearchTextChange: (value: string) => void;
    onSubmit: (model: OllamaModel, agentic: boolean) => Promise<void>;
}

export default function SearchForm({ searchText, loading, onSearchTextChange, onSubmit }: SearchFormProps) {
    const [validationError, setValidationError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const {colorMode} = useColorMode();
    const [model, setModel] = useState(OllamaModel.LLAMA3);
    const [agentic, setAgentic] = useState(true);

    useEffect(() => {
            inputRef.current?.focus();
    }, []);

    const className=`flex-1 rounded-md px-4 py-2 outline-none
        ${
            colorMode === ColorMode.DARK
            ? "border-gray-600 bg-gray-700 text-white focus:border-blue-400 focus:ring-blue-500"
            : "border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-200"
        }`;

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!searchText.trim()) {
            setValidationError("Please enter an artist");
            return;
        }

        setValidationError("");
        await onSubmit(model, agentic); //as of now await is not needed, but in the future it might
    }

    return (
        <form onSubmit={handleSubmit}  className="flex gap-3">

            <select
                value={model}
                onChange={(event) => setModel(event.target.value as OllamaModel)}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
            >
                <option value={OllamaModel.LLAMA3}>
                    Llama 3
                </option>

                <option value={OllamaModel.QWEN3_4B}>
                    Qwen 3 - 4B
                </option>
                <option value={OllamaModel.QWEN3}>
                    Qwen 3 - 8B
                </option>
                <option value={OllamaModel.GEMMA4}>
                    Gemma 4 - e4B
                </option>
                <option value={OllamaModel.GPT}>
                    GPT
                </option>
            </select>
            

            <input
              ref={inputRef}
              type="text"
              value={searchText}
              onChange={(event) => onSearchTextChange(event.target.value)}
              placeholder="Artist to search for"
              className={className}
              />

              <div className="flex flex-col items-center gap-1">
                    <label className="flex items-center gap-2 whitespace-nowrap">
                        <input
                            type="checkbox"
                            checked={agentic}
                            onChange={(event) => setAgentic(event.target.checked)}
                            className="h-4 w-4"
                        /> Agentic
                    </label>
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >                
                        {loading ? "Querying Ollama..." : "Search"}
                    </button> 
              </div>
                           
        </form>
    );
}