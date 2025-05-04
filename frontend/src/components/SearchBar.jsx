import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    // Handle search input changes
    const handleSearchChange = async (e) => {
        const value = e.target.value
        setSearchTerm(value)

        if (value.length < 2) {
            setSuggestions([])
            return
        }

        // Fetch country suggestions based on search term
        setIsLoading(true)
        try {
            const response = await fetch(
                `https://restcountries.com/v3.1/name/${value}`
            )
            if (response.ok) {
                const data = await response.json()
                setSuggestions(data.slice(0, 5)) // Limit to 5 suggestions
            } else {
                setSuggestions([])
            }
        } catch (error) {
            console.error('Error fetching country suggestions:', error)
            setSuggestions([])
        } finally {
            setIsLoading(false)
        }
    }

    // Handle selecting a country from suggestions
    const handleSelectCountry = (country) => {
        navigate(`/country/${country.cca3}`)
        // Clear search after selection
        setSearchTerm('')
        setSuggestions([])
    }

    return (
        <div className="relative w-full">
            <div className="flex items-center rounded-full border-2 border-purple-900 px-4 shadow-[0_0_15px_rgba(168,85,247,0.7)]">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search for a country..."
                    className="flex-grow bg-transparent py-3 pr-3 text-white outline-none"
                    data-testid="country-search"
                />
                {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                )}
            </div>

            {/* Search Suggestions */}
            {suggestions.length > 0 && (
                <div className="absolute z-20 mt-1 w-full rounded-lg border border-purple-500/30 bg-gray-800/90 shadow-lg backdrop-blur-md">
                    {suggestions.map((country) => (
                        <div
                            key={country.cca3}
                            onClick={() => handleSelectCountry(country)}
                            className="flex cursor-pointer items-center gap-3 border-b border-white/10 p-3 last:border-none hover:bg-purple-900/20"
                            data-testid="country-suggestion"
                        >
                            <img
                                src={country.flags.svg}
                                alt={country.name.common}
                                className="h-6 w-9 rounded object-cover"
                            />
                            <span>{country.name.common}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchBar
