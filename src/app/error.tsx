"use client"

import Image from 'next/image'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {

    return (
        <div className='flex flex-col items-center gap-6 pt-[40px] mt-10'>
            <Image src={"/assets/images/icon-error.svg"} alt='error icon' height={50} width={50} />
            <h1 className='text-white font-bricolage font-semibold text-[52px] '>Something went wrong</h1>
            <p className='text-neutral-200 font-sans text-[20px] font-medium max-w-[554px] text-center'>We couldn’t connect to the server ({error.message}). Please try again in a few moments.</p>

            <button onClick={() => reset()} className='flex gap-2.5 py-3 px-4 bg-neutral-800 border border-neutral-600 hover:bg-neutral-700 rounded-lg transition cursor-pointer'>
                <Image src={"/assets/images/icon-retry.svg"} alt='retry icon' height={16} width={16} />
                <span className='text-white font-sans font-medium text-base'>Retry</span>
            </button>
        </div>
    )
}
