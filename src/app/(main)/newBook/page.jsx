"use client"

import ErrorAlert from "@/components/ErrorAlert";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

const NewBook = () => {

    const { user, error, isLoading } = useUser();
    const [alert, setAlert] = useState({msg: "", status: false});
    const [categories, setCategories] = useState([]);
    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {

            const data = new FormData(e.target)
            data.append('user', user.email);

            const res = await fetch('/api/book', {
                method: 'POST',
                body: data
            });

            if (!res.ok){

                const error = await res.json();

                setAlert({
                    msg: error.message,
                    status: true
                });

                return false;

            };

            router.push(`/profile`);            
            
        } catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {

        const getCategories = async() => {
            
            const result = await fetch('/api/category');
            const data = await result.json();

            setCategories(data);

        }

        getCategories();

    }, [])


    return (
        <div className="w-full py-12 px-5">

            <ErrorAlert alert={alert} setAlert={setAlert} />

            <form 
                className="block max-w-md bg-white border rounded-lg shadow-md px-8 pt-6 pb-8 mb-4 mx-auto"
                method='POST'
                onSubmit={handleSubmit}
            >
                <h3 className="font-semibold text-gray-700 mt-5 text-2xl uppercase mb-10 flex items-center">
                    <span className='mr-5'>New Book</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                    </svg>
                </h3>
                <div className="mb-7">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Book title"
                        required
                    />
                </div>

                <div className="mb-7">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                        Author
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="author"
                        name="author"
                        type="text"
                        placeholder="Luis GP"
                        required
                    />
                </div>

                <div className="mb-7">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
                        name="description"
                        id="description"
                        placeholder='About this book...'
                        required
                    ></textarea>
                </div>

                <div className="mb-7">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category_id">
                        Category
                    </label>
                    <select 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="category_id" 
                        id="category_id"
                        required
                    >
                        {
                            categories && categories.map(category => (
                                <option value={category.id} key={category.id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="mb-7">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Price
                    </label>
                    <div className="flex flex-row shadow border rounded overflow-hidden">
                        <span className="flex items-center bg-grey-lighter px-3 text-gray-700">$</span>
                        <input
                            type="number"
                            name="price"
                            className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="price"
                            placeholder="0.00"
                            step="0.01"
                            min="0.01"
                            required
                        />
                    </div>
                </div>

                <div className="mb-7">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cover">
                        Cover Image
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="cover"
                        name="cover"
                        type="file"
                        placeholder="Upload image"
                        required
                    />
                    <small className="mt-1 text-sm text-gray-700 font-light" id="cover">SVG, PNG, JPG or GIF. SIZE: (474x714).</small>
                </div>

                <div className="mb-7">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                        Book File
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="file"
                        name="file"
                        type="file"
                        placeholder="Upload file"
                        required
                    />
                </div>

                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5" 
                    type="submit"
                >
                    Save
                </button>
            </form>

        </div>
    )
}

export default NewBook
