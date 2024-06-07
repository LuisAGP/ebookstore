"use client"

import BooksList from "@/components/BooksList";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from 'next/image';
import Link from "next/link";
import { useEffect, useState } from "react";

const Profile = () => {

    const { user, error, isLoading } = useUser();
    const [ publishedBooks, setPublishedBooks ] = useState(null);
    const [ purchasedBooks, setPurchasedBooks ] = useState(null);

    useEffect(() => {

        const getBooks = async() => {

            const res = await fetch('/api/book');
            const data = await res.json();

            if (!res.ok) throw new Error(await res.text());
            
            setPublishedBooks(data);


        }

        getBooks();

    }, []);

    return (
        <div>
            {
                isLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    <div className="md:flex">

                        <div className="w-full md:w-1/4 flex items-center flex-col py-10 px-5 md:border-r-2 border-gray-20 md:h-[calc(100vh-96px)] md:min-h-full">
                            <Image
                                className="rounded-full w-24 overflow-hidden"
                                src={`${user.picture}`}
                                height={100}
                                width={100}
                                alt="Profile picture"
                            />
                            <p className="font-bold mt-5 text-center">{user.name}</p>
                            <p className="text-sm text-center text-gray-500">{user.email}</p>

                            <div className="mt-10 flex justify-center gap-7 text-gray-900 w-full">

                                <div className="flex flex-col items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                                    </svg>
                                    <span className="mt-1">0</span>
                                </div>

                                <div className="flex flex-col items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                                    </svg>
                                    <span className="mt-1">0</span>
                                </div>

                                <div className="flex flex-col items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mt-1">0</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-3/4 p-10">
                            <h3 className="font-semibold text-gray-500 dark:text-gray-700 text-2xl uppercase">
                                <span>Published Books</span>

                                <Link 
                                    href="/newBook"
                                    className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-2 rounded ml-10"
                                >
                                    New
                                </Link>
                            </h3>
                            {
                                publishedBooks ? (
                                    <div className="my-5">
                                        <BooksList books={publishedBooks} />
                                    </div>
                                ) : (
                                    <p className="text-center w-full text-gray-400 font-bold py-10">
                                        You haven't published any book yet!
                                    </p>
                                )
                            }

                            <h3 className="font-semibold text-gray-500 dark:text-gray-700 mt-5 text-2xl uppercase">Purchased Books</h3>
                            {
                                purchasedBooks ? (
                                    <div>Boks...</div>
                                ) : (
                                    <p className="text-center w-full text-gray-400 font-bold py-10">
                                        You haven't purchased any book yet!
                                    </p>
                                )
                            }

                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default Profile
