import React from 'react'

const FilterBar = ({ onFilter }) => {
    const handleRegion = (region) => {
        if (region) onFilter(`https://restcountries.com/v3.1/region/${region}`)
    }

    const handleCurrency = (currency) => {
        if (currency)
            onFilter(`https://restcountries.com/v3.1/currency/${currency}`)
    }

    const handleLanguage = (lang) => {
        if (lang) onFilter(`https://restcountries.com/v3.1/lang/${lang}`)
    }

    return (
        <div className="mb-8 flex flex-wrap justify-center gap-4">
            {/* Region Filter */}
            <div className="relative">
                <select
                    onChange={(e) => handleRegion(e.target.value)}
                    className="appearance-none rounded-full border border-purple-500/30 bg-gray-900/80 px-6 py-2 pr-10 text-white shadow-md shadow-purple-500/10 backdrop-blur-sm transition-all focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                    <option value="">Filter by Region</option>
                    <option value="africa">Africa</option>
                    <option value="americas">Americas</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-purple-300">
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 20 20"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>

            {/* Currency Filter */}
            <div className="relative">
                <select
                    onChange={(e) => handleCurrency(e.target.value)}
                    className="appearance-none rounded-full border border-purple-500/30 bg-gray-900/80 px-6 py-2 pr-10 text-white shadow-md shadow-purple-500/10 backdrop-blur-sm transition-all focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                    <option value="">Filter by Currency</option>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="jpy">JPY</option>
                    <option value="inr">INR</option>
                    <option value="gbp">GBP</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-purple-300">
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 20 20"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>

            {/* Language Filter */}
            <div className="relative">
                <select
                    onChange={(e) => handleLanguage(e.target.value)}
                    className="appearance-none rounded-full border border-purple-500/30 bg-gray-900/80 px-6 py-2 pr-10 text-white shadow-md shadow-purple-500/10 backdrop-blur-sm transition-all focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                    <option value="">Filter by Language</option>
                    <option value="english">English</option>
                    <option value="french">French</option>
                    <option value="spanish">Spanish</option>
                    <option value="hindi">Hindi</option>
                    <option value="arabic">Arabic</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-purple-300">
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 20 20"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default FilterBar
