// src/app/page.tsx

import React from 'react';
import ZipCodeForm from '@/components/ZipCodeForm';

// Server-side homepage component
export default function HomePage() {
    return (
        <div className="bg-light py-10">
            <div className="container">
                <h1 className="text-center">Weather App</h1>

                <p className="text-center">Enter a US Zip Code to view the weather forecast.</p>

                {/* Embed the Client Component here
                 Note: this is needed as a client component because the task strictly defines URLs in form
                 of /weather/[zip], so we need to perform the client-side redirect to this route.
                 If we could directly accept GET parameters in form /weather?zip=[zip],
                 we could render this page fully server side.
                 */}
                <ZipCodeForm />
            </div>
        </div>
    );
}
