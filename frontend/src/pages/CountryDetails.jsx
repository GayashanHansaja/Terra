import { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import CountryMapView from '../components/CountryMapView'

export default function CountryDetails() {
    const { code } = useParams()
    const [country, setCountry] = useState(null)
    const [loading, setLoading] = useState(true)
    const [scrolled, setScrolled] = useState(false)

    const detailsRef = useRef(null)

    useEffect(() => {
        setLoading(true)
        fetch(`https://restcountries.com/v3.1/alpha/${code}`)
            .then((res) => res.json())
            .then((data) => {
                setCountry(data[0])
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching country details:', error)
                setLoading(false)
            })

        const handleScroll = () => {
            setScrolled(window.scrollY > 100)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [code])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                <div className="mr-3 h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                <span className="text-xl">Loading country data...</span>
            </div>
        )
    }

    if (!country) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
                <h2 className="mb-4 text-2xl">Country not found</h2>
                <Link
                    to="/"
                    className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
                >
                    Return Home
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-black text-white">
            {/* Hero Section */}
            <div
                className={`relative h-screen w-full transition-opacity duration-700 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
            >
                <img
                    src={country.flags.svg}
                    alt={`Flag of ${country.name.common}`}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black/50 to-black/90 px-4 text-center">
                    {/* Added top margin to push the title lower */}
                    <div className="mt-20 flex flex-col items-center">
                        <h1 className="mb-8 text-5xl font-bold md:text-6xl">
                            {country.name.common}
                        </h1>
                    </div>

                    {/* Spacer with reduced height to move scroll button up */}
                    <div
                        className="flex-grow"
                        style={{ minHeight: '10vh' }}
                    ></div>

                    {/* Button positioned higher from bottom with mb-16 (4rem from bottom) */}
                    <button
                        onClick={() =>
                            detailsRef.current?.scrollIntoView({
                                behavior: 'smooth',
                            })
                        }
                        className="mb-16 flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-white text-black transition-all duration-300 hover:scale-110 hover:bg-gray-200"
                        aria-label="Scroll down to details"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Country Details Section */}
            <div
                ref={detailsRef}
                className={`min-h-screen transition-all duration-1000 ${
                    scrolled
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-10 opacity-0'
                } px-4 py-16`}
            >
                <div className="mx-auto max-w-5xl">
                    <Link
                        to="/"
                        className="group mb-8 inline-flex items-center text-blue-400 transition hover:text-blue-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-5 w-5 transform transition group-hover:-translate-x-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>Back to Home</span>
                    </Link>

                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/80 to-gray-800/60 shadow-2xl backdrop-blur-md">
                        {/* Header with flag background */}
                        <div className="relative h-40 overflow-hidden">
                            <div className="absolute inset-0 opacity-20">
                                <img
                                    src={country.flags.svg}
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8">
                                <h2 className="flex items-center text-3xl font-bold text-white">
                                    <img
                                        src={country.flags.svg}
                                        alt=""
                                        className="mr-4 h-auto w-10 rounded shadow-md"
                                    />
                                    {country.name.common}
                                </h2>
                            </div>
                        </div>

                        {/* Details content */}
                        <div className="p-8">
                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="space-y-6">
                                    <div className="rounded-lg border border-white/5 bg-gray-800/50 p-4">
                                        <h3 className="mb-3 text-lg font-medium text-blue-300">
                                            Country Information
                                        </h3>
                                        <div className="space-y-4">
                                            <Info
                                                label="Official Name"
                                                value={country.name.official}
                                            />
                                            <Info
                                                label="Region"
                                                value={`${country.region}${country.subregion ? ` (${country.subregion})` : ''}`}
                                            />
                                            <Info
                                                label="Capital"
                                                value={
                                                    country.capital?.join(
                                                        ', '
                                                    ) || 'N/A'
                                                }
                                            />
                                            <Info
                                                label="Population"
                                                value={country.population.toLocaleString()}
                                            />
                                            <Info
                                                label="Area"
                                                value={`${country.area.toLocaleString()} km²`}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="rounded-lg border border-white/5 bg-gray-800/50 p-4">
                                        <h3 className="mb-3 text-lg font-medium text-blue-300">
                                            Additional Details
                                        </h3>
                                        <div className="space-y-4">
                                            <Info
                                                label="Languages"
                                                value={
                                                    country.languages
                                                        ? Object.values(
                                                              country.languages
                                                          ).join(', ')
                                                        : 'N/A'
                                                }
                                            />
                                            <Info
                                                label="Currencies"
                                                value={
                                                    country.currencies
                                                        ? Object.values(
                                                              country.currencies
                                                          )
                                                              .map(
                                                                  (c) =>
                                                                      `${c.name} (${c.symbol || ''})`
                                                              )
                                                              .join(', ')
                                                        : 'N/A'
                                                }
                                            />
                                            <Info
                                                label="Time Zones"
                                                value={
                                                    country.timezones?.join(
                                                        ', '
                                                    ) || 'N/A'
                                                }
                                            />
                                            {country.car?.side && (
                                                <Info
                                                    label="Driving Side"
                                                    value={
                                                        country.car.side ===
                                                        'left'
                                                            ? 'Left'
                                                            : 'Right'
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map section */}
                            {country.latlng && (
                                <div className="mt-8 rounded-lg border border-white/5 bg-gray-800/50 p-4">
                                    <h3 className="mb-3 text-lg font-medium text-blue-300">
                                        Map Location
                                    </h3>
                                    <div className="h-80 overflow-hidden rounded-xl border border-white/10">
                                        <CountryMapView
                                            latlng={country.latlng}
                                            countryName={country.name.common}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Google Maps link */}
                            {country.maps?.googleMaps && (
                                <div className="mt-8 flex justify-center">
                                    <a
                                        href={country.maps.googleMaps}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mr-2 h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        View on Google Maps
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Info({ label, value }) {
    return (
        <div className="flex flex-col">
            <span className="text-sm text-gray-400">{label}</span>
            <span className="text-xl">{value}</span>
        </div>
    )
}
