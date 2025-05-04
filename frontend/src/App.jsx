import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CountryDetails from './pages/CountryDetails'
import CountriesList from './pages/Countries'
import { AuthProvider } from './context/AuthContext'

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/country/:code" element={<CountryDetails />} />
                    <Route path="/countries" element={<CountriesList />} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}
