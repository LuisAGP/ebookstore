import { book } from '@/app/(main)/store/book/[id]/page'
import { format } from 'path'
import { Dispatch, SetStateAction } from "react"

interface Props {
    activeB: string,
    setActiveB: Dispatch<SetStateAction<string>>,
    book: book,
    format: string
}

const FormatButton = ({ activeB, setActiveB, book, format}: Props) => {

    return (
        <button
            className={`border-2 rounded-md text-left ${activeB === format ? 'text-blue-700 border-blue-500' : 'text-gray-700 border-gray-500'} p-5`}
            type='button'
            onClick={() => setActiveB(format)}
        >
            <span className='text-xl'>{format}</span>

            <p className={`font-bold text-md mt-1`}>
                USD ${book.price.toFixed(2)}
            </p>

        </button>
    )
}

export default FormatButton
