import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Globe from 'react-globe.gl'
import SearchBar from '../components/SearchBar'
import Profile from '../components/Profile'
import Favorite from '../components/Favorite'

const Home = () => {
    const globeEl = useRef()
    const navigate = useNavigate()
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    // Navigate to countries page
    const handleExplore = () => {
        navigate('/countries')
    }

    useEffect(() => {
        // Handle window resize
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener('resize', handleResize)

        // Auto-rotation configuration
        if (globeEl.current) {
            // Set initial rotation settings
            globeEl.current.controls().autoRotate = true
            globeEl.current.controls().autoRotateSpeed = 0.5

            // Optional: Set initial position/angle
            globeEl.current.pointOfView({
                lat: 0,
                lng: 0,
                altitude: windowSize.width < 768 ? 3 : 2.5, // Adjust mobile view
            })
        }

        // Clean up function
        return () => {
            window.removeEventListener('resize', handleResize)
            if (globeEl.current) {
                globeEl.current.controls().autoRotate = false
            }
        }
    }, [windowSize.width])

    // Calculate globe dimensions based on screen size
    const getGlobeDimensions = () => {
        if (windowSize.width < 640) { // Extra small devices
            return {
                width: windowSize.width,
                height: windowSize.height * 0.4 // Smaller height on very small screens
            }
        } else if (windowSize.width < 768) { // Small devices
            return {
                width: windowSize.width,
                height: windowSize.height * 0.5
            }
        } else { // Medium devices and up
            return {
                width: windowSize.width / 2,
                height: windowSize.height
            }
        }
    }

    const globeDimensions = getGlobeDimensions()

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-indigo-900/40 via-black to-purple-900/30 text-white overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(120,0,255,0.15)_0%,rgba(0,0,0,0.8)_70%)]"></div>
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 h-80 w-80 rotate-12 bg-purple-500/5 blur-[80px]"></div>
                <div className="absolute right-1/3 bottom-1/3 h-72 w-72 -rotate-12 bg-blue-500/5 blur-[80px]"></div>
            </div>
    
            {/* Top navigation area - always visible */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50 flex items-center gap-2 sm:gap-3">
                <Profile />
                <Favorite />
            </div>
    
            {/* Responsive layout - flex column on mobile, row on desktop */}
            <div className="relative z-10 flex flex-col md:flex-row h-screen">
                {/* Globe - Full width on mobile, half width on desktop */}
                <div className="w-full md:w-1/2 h-[40vh] sm:h-[45vh] md:h-screen relative flex items-center justify-center pt-16 sm:pt-20 md:pt-0">
                    <Globe
                        ref={globeEl}
                        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                        backgroundColor="rgba(0,0,0,0)"
                        atmosphereColor="rgba(150, 150, 255, 0.2)"
                        atmosphereAltitude={0.1}
                        width={globeDimensions.width}
                        height={globeDimensions.height}
                    />
                </div>
    
                {/* UI elements - Below globe on mobile, right side on desktop */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 md:px-10 pb-10 sm:pb-16 md:pb-0">
                    {/* Search bar - Full width on all devices */}
                    <div className="w-full max-w-xs sm:max-w-sm md:max-w-xl mb-6 sm:mb-8 md:mb-10">
                        <SearchBar />
                    </div>

                    {/* Welcome text - Responsive sizes */}
                    <h1 className="mb-3 sm:mb-4 md:mb-6 text-3xl sm:text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-blue-300 drop-shadow-lg text-center tracking-wide leading-tight">
                        Welcome to <span className="italic text-purple-400">Terra</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mb-6 sm:mb-8 md:mb-12 text-sm sm:text-base md:text-lg text-gray-200 text-center max-w-xs sm:max-w-sm md:max-w-md font-light">
                        Let's Go Around The World and Explore Together!
                    </p>

                    {/* Call to action button */}
                    <button
                        onClick={handleExplore}
                        className="rounded-full bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-semibold text-white shadow-xl hover:scale-105 hover:from-purple-800 hover:to-indigo-500 transition duration-300"
                    >
                        World Here
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home
