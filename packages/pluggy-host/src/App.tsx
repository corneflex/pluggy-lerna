import React from 'react';
import { useFederatedComponent } from '@corneflex/pluggy-core';

export default function App() {
    const { Component: DynComponent } = useFederatedComponent(
        'http://localhost:9000/remoteEntry.js',
        'pluggy_plug',
        './Widget'
    );
    return (
        <React.Suspense fallback="Loading Widget...">
            {DynComponent && <DynComponent />}
        </React.Suspense>
    );
}
