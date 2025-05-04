import React, { createContext, useState, useContext, useEffect } from 'react'

// Create a context for theme
const ThemeContext = createContext()

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
    // Check if user has previously set a preference
    const storedDarkMode = localStorage.getItem('darkMode')

    // Initialize state based on stored preference or system preference
    const [darkMode, setDarkMode] = useState(() => {
        // If there's a stored preference, use it
        if (storedDarkMode !== null) {
            return storedDarkMode === 'true'
        }

        // Otherwise check system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })

    // Toggle dark mode function
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode)
    }

    // Update localStorage when darkMode changes
    useEffect(() => {
        localStorage.setItem('darkMode', darkMode)

        // Apply or remove the 'dark' class on the html element
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    // Listen for changes in system preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e) => {
            // Only update if user hasn't manually set a preference
            if (localStorage.getItem('darkMode') === null) {
                setDarkMode(e.matches)
            }
        }

        // Add event listener
        mediaQuery.addEventListener('change', handleChange)

        // Clean up
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    )
}
