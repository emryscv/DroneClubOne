'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import TitleBorder from './components/TitleBorder'

export default function ErrorPage({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string }
    unstable_retry: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='h-full flex flex-col items-center justify-center'>
            <TitleBorder>Something went wrong!</TitleBorder>
            <button
                onClick={
                    // Attempt to recover by re-fetching and re-rendering the segment
                    () => unstable_retry()
                }
                className='text-muted-foreground mt-4'
            >
                Click here to Try again    
            </button>
        </div>
    )
}