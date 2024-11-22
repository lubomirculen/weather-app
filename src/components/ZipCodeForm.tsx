// src/app/components/ZipCodeForm.tsx

'use client'; // This is the only Client Component required, as we need to handle a client-side logic (form handling and redirect)

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js's router to handle redirection

const ZipCodeForm = () => {
    const [zip, setZip] = useState('');
    const router = useRouter(); // Use the router to navigate

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (zip) {
            router.push(`/weather/${zip}`); // Redirect to the weather page
        }
    };

    return (
        <form onSubmit={handleSubmit} className="zip-form">
            <input
                type="text"
                name="zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Enter Zip Code"
                required
                className="zip-input"
            />
            <button type="submit" className="submit-button">Get Weather</button>
        </form>
    );
};

export default ZipCodeForm;
