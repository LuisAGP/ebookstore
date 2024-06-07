import React from 'react'
import BookItem, { Book } from './BookItem'

interface Props {
    books: Array<Book>
}

const BooksList = ({ books }: Props) => {

    return (

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-10">

            {
                books ? (
                    books.map((book, key) => (
                        <BookItem book={book} key={key}/>
                    )) 
                ): (
                    <div>Not Found!</div>
                )
            }

        </div>
    )
}

export default BooksList
