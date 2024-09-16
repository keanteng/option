'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
    MoonIcon,
    SunIcon
} from 'lucide-react';

const ColorMode = () => {
    const [mounted, setMounted] = useState(false);
    const { setTheme } = useTheme();

    // darkMode state
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null;
    }

    // function handle
    const handleClick = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        setTheme(newDarkMode ? 'dark' : 'light');
    }

    return (
        <button onClick={handleClick}>
                {darkMode ? <MoonIcon className='h-6 w-6'/> : <SunIcon className='h-6 w-6' />}
        </button>
    )
}

export default ColorMode;