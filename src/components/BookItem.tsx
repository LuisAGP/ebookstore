import Image from "next/image"
import Link from "next/link"

export interface Book {
    id: number,
    user: string,
    title: string,
    description: string,
    price: number,
    active: boolean,
    file_url: string,
    cover_url: string,
    created_at: Date
}

interface Props {
    book: Book
}

const BookItem = ({ book }: Props) => {

    return (
        <Link href={`/store/book/${book.id}`} className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <Image
                    src={book.cover_url}
                    height={180}
                    width={180}
                    alt={book.title}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{book.title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">${book.price.toFixed(2)}</p>
        </Link>
    )
}

export default BookItem
