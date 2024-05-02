import React, { useState, useEffect, useRef } from "react";

const Autocomplete = ({ suggestions }) => {
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [userInput, setUserInput] = useState("");

    const autocompleteRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
            setShowSuggestions(false);
        }
    };

    const onChange = (e) => {
        const userInput = e.currentTarget.value;

        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        setActiveSuggestion(0);
        setFilteredSuggestions(filteredSuggestions);
        setShowSuggestions(true);
        setUserInput(e.currentTarget.value);
    };

    const onClick = (e) => {
        setActiveSuggestion(0);
        setShowSuggestions(false);
        setUserInput(e.currentTarget.innerText);
    };

    const SuggestionsListComponent = () => {
        return (
            <ul className="suggestions">
                {filteredSuggestions.map((suggestion, index) => {
                    return (
                        <li
                            key={index}
                            onClick={onClick}
                            className={index === activeSuggestion ? "suggestion-active" : ""}
                        >
                            {suggestion}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div ref={autocompleteRef}>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Catégorie
            </label>
            <input
                type="text"
                onChange={onChange}
                onClick={() => setShowSuggestions(true)}
                value={userInput}
                name="category"
                id="category"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Entrer la catégorie"
            />
            {showSuggestions && <SuggestionsListComponent />}
        </div>
    );
};

export default Autocomplete;