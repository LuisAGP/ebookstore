import Link from "next/link";

export default function Home() {

    return (
        <main className="text-white flex flex-col justify-center items-center w-full h-96 text-center gap-5">
            <h1 className="w-5/6 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Discover the best title for you!
            </h1>
            <p className="w-3/4 mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                Explore and embark on literary journeys unlike any other, all conveniently at your fingertips. Start your next adventure today.
            </p>
            <Link href="/store" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center rounded-full border-2 border-gray-200 text-gray-200 bg-black hover:bg-gray-200 hover:text-black">
                Explore the shop
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
            </Link>
        </main>
    );
}
