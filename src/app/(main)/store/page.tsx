"use client"

import BooksList from '@/components/BooksList';
import SearchBar from '@/components/SearchBar';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Store = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {

        const getBooks = async() => {

            const res = await fetch('/api/book');
            const data = await res.json();

            setBooks(data);

            if (!res.ok) throw new Error(await res.text());

        }

        getBooks();

    }, []);

    return (
        <div>
            <SearchBar />

            <div className="mx-auto max-w-2xl px-10 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <BooksList books={books}/>
            </div>
        </div>
    )
}

export default Store;