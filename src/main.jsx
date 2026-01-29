import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { OnboardingProvider } from './context/OnboardingContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <OnboardingProvider>
            <App />
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#333',
                        color: '#fff',
                        borderRadius: '10px',
                    },
                    error: {
                        style: {
                            background: '#ff4d4d',
                            color: '#fff',
                        },
                    },
                }}
            />
        </OnboardingProvider>
    </BrowserRouter>
)
