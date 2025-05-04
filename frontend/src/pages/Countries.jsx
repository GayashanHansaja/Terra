import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CountryCard from '../components/CountryCard'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'

const Countries = () => {
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchCountries('https://restcountries.com/v3.1/all')
    }, [])

    const fetchCountries = async (url) => {
        setLoading(true)
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error('Failed to fetch countries')
            }
            const data = await response.json()
            setCountries(data)
            setFilteredCountries(data)
        } catch (error) {
            console.error('Error fetching countries:', error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (searchTerm) => {
        if (!searchTerm) {
            setFilteredCountries(countries)
            return
        }
        const filtered = countries.filter((country) =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredCountries(filtered)
    }

    const handleFilter = (url) => {
        fetchCountries(url)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-900/40 via-black to-purple-900/30">
            {/* Background elements */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(120,0,255,0.15)_0%,rgba(0,0,0,0.8)_70%)]"></div>
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 h-96 w-96 rotate-12 bg-purple-500/10 blur-[100px]"></div>
                <div className="absolute right-1/3 bottom-1/3 h-80 w-80 -rotate-12 bg-blue-500/10 blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-10 flex items-center justify-between">
                    <Link
                        to="/"
                        className="group inline-flex items-center text-lg text-white transition-colors hover:text-purple-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Back to Home
                    </Link>
                    <h1 className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-3xl font-bold text-transparent">
                        Explore Countries
                    </h1>
                    <div className="w-24"></div> {/* Placeholder for balance */}
                </div>

                {/* Search and Filter Section - Fixed positioning */}
                <div className="mb-12 flex flex-col items-center space-y-8">
                    {/* Search bar - No longer absolute */}
                    <div className="w-full max-w-md px-4">
                        <SearchBar onSearch={handleSearch} />
                    </div>

                    {/* Filter bar */}
                    <FilterBar onFilter={handleFilter} />
                </div>

                {/* Countries grid */}
                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <div className="h-16 w-16 animate-spin rounded-full border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                ) : error ? (
                    <div className="py-10 text-center text-red-500">
                        <p className="text-xl">{error}</p>
                        <button
                            onClick={() =>
                                fetchCountries(
                                    'https://restcountries.com/v3.1/all'
                                )
                            }
                            className="mt-4 rounded-full bg-purple-600 px-6 py-2 text-white hover:bg-purple-500"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredCountries.map((country) => (
                            <CountryCard key={country.cca3} country={country} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Countries
