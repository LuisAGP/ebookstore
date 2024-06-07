"use client"

import FormatButton from '@/components/FormatButton';
import IsAvailable from '@/components/IsAvailable';
import Image from 'next/image';
import { useEffect, useState } from 'react'

interface Props{
    params: { id: number },
}

export interface book{
    id: number,
    category_id: number,
    user: string,
    author: string,
    title: string,
    description: string,
    price: number,
    active: number,
    cover_url: string,
    file_url: string,
    created_at: Date|null
}

const Book = ({params}: Props) => {

    const [book, setBook] = useState<book|null>(null);
    const [format, setFormat] = useState("PDF");

    useEffect(() => {

        const getBook = async() => {

            const request = await fetch(`/api/book/${params.id}`);
            const data = await request.json();

            setBook(data);

        }

        getBook();

    }, [])

    return (
        <div className='flex flex-col md:flex-row py-10 px-2 gap-10'>
            {
                book && (
                    <>
                        <div className='w-full md:w-2/5'>
                            <Image  
                                className='sm:w-1/3 md:w-3/4 lg:w-2/3 m-auto md:mr-0 md:ml-auto'
                                src={book.cover_url} 
                                alt={`${book.title} cover`} 
                                width={250}
                                height={250}
                            />
                        </div>

                        <div className='w-full md:w-3/5 px-3 md:px-8'>
                            <h2 className='text-4xl text-gray-900'>
                                {book.title} 
                            </h2>

                            <span className='text-gray-500 text-lg'>by {book.author}</span>

                            <hr className='mt-5'/>

                            <form action="#" className='mt-5'>
                                <label className='font-bold text-xs uppercase'>Format</label>

                                <div className='grid grid-cols-3 gap-3 mt-3 px-5'>

                                    <FormatButton 
                                        activeB={format}
                                        setActiveB={setFormat}
                                        book={book}
                                        format='PDF'
                                    />

                                    <FormatButton 
                                        activeB={format}
                                        setActiveB={setFormat}
                                        book={book}
                                        format='EPUB'
                                    />

                                    <FormatButton 
                                        activeB={format}
                                        setActiveB={setFormat}
                                        book={book}
                                        format='MOBI'
                                    />

                                </div>

                                <IsAvailable active={book.active} />

                                <div className='flex gap-3 mt-5'>
                                    <button 
                                        type='submit'
                                        disabled={book.active === 1 ? false : true}
                                        className={`uppercase font-bold text-sm text-white ${book.active ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-600 hover:bg-gray-700'}  px-5 py-3 rounded-3xl flex items-center gap-2`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
                                        </svg>

                                        <span>Add to cart</span>
                                    </button>

                                    <button 
                                        type='button'
                                        className='uppercase font-bold text-sm text-pink-600 border-2 border-pink-600 hover:bg-pink-600 hover:text-white px-5 py-3 rounded-3xl flex items-center gap-2'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                                        </svg>


                                        <span>Add to wishlist</span>
                                    </button>
                                </div>
                            </form>

                            <hr className='mt-5'/>

                            <label className='font-bold text-xs uppercase mt-5 block'>Description</label>
                            
                            <p className='mt-3 text-justify text-gray-500'>
                                {book.description}
                            </p>

                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Book
