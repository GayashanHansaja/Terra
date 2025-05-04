import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Globe from 'react-globe.gl'
import SearchBar from '../components/SearchBar'
import Profile from '../components/Profile'
import Favorite from '../components/Favorite'

const Home = () => {
    const globeEl = useRef()
    const navigate = useNavigate()

    // Navigate to countries page
    const handleExplore = () => {
        navigate('/countries')
    }

    useEffect(() => {
        // Auto-rotation configuration
        if (globeEl.current) {
            // Set initial rotation settings
            globeEl.current.controls().autoRotate = true
            globeEl.current.controls().autoRotateSpeed = 0.5

            // Optional: Set initial position/angle
            globeEl.current.pointOfView({
                lat: 0,
                lng: 0,
                altitude: 2.5,
            })
        }

        // Clean up function
        return () => {
            if (globeEl.current) {
                globeEl.current.controls().autoRotate = false
            }
        }
    }, [])

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-indigo-900/40 via-black to-purple-900/30 text-white overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(120,0,255,0.15)_0%,rgba(0,0,0,0.8)_70%)]"></div>
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 h-80 w-80 rotate-12 bg-purple-500/5 blur-[80px]"></div>
                <div className="absolute right-1/3 bottom-1/3 h-72 w-72 -rotate-12 bg-blue-500/5 blur-[80px]"></div>

            </div>
    
            {/* Main horizontal layout */}
            <div className="relative z-10 flex h-screen">
                {/* Left: Globe */}
                <div className="w-1/2 relative">
                    <Globe
                        ref={globeEl}
                        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                        backgroundColor="rgba(0,0,0,0)"
                        atmosphereColor="rgba(150, 150, 255, 0.2)"
                        atmosphereAltitude={0.1}
                        width={window.innerWidth / 2}
                        height={window.innerHeight}
                    />
                </div>
    
                {/* Right: UI elements */}
               {/* Right: UI elements (clean and modern) */}
<div className="w-1/2 flex flex-col justify-center items-center relative px-10">
  {/* Top-right icons (Profile + Favorite) */}
{/* Top-right icons with fixed positions */}
<div className="absolute top-6 right-6">
  {/* Profile fixed at the top */}
  <div className="mb-4">
    <Profile />
  </div>
  
  {/* Favorite fixed below profile with static distance */}
  <div className="absolute top-16 right-0">
    <Favorite />
  </div>
</div>

  {/* Search bar */}
  <div className="mb-10 w-full max-w-xl">
    <SearchBar />
  </div>

  {/* Aesthetic Welcome text */}
  <h1 className="mb-6 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-blue-300 drop-shadow-lg text-center tracking-wide leading-tight">
    Welcome to <span className="italic text-purple-400">Terra</span>
  </h1>

  {/* Subtitle */}
  <p className="mb-12 text-lg text-gray-200 text-center max-w-md font-light">
    Let’s Go Around The World and Explore Together!
  </p>

  {/* Call to action button */}
  <button
    onClick={handleExplore}
    className="rounded-full bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 px-8 py-3 font-semibold text-white shadow-xl hover:scale-105 hover:from-purple-800 hover:to-indigo-500 transition duration-300"
  >
    World Here
  </button>
</div>

            </div>
        </div>
    )
    
}

export default Home
