import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';

function SearchBar() {
    const [searchTerm, setSearhterm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const handleSearchhToggle = () => {
        setIsOpen(!isOpen)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("You searched for", searchTerm);
        setIsOpen(!isOpen)

    }
    return (
        <div className={`flex items-center justify-center w-full transition-all duration-300 
        ${isOpen ? "absolute top-0 left-0 w-full bg-white h-full z-50" : "w-auto "
            } `}
        >
            {isOpen ? (
                <form onSubmit={handleSubmit} className='relative flex items-center justify-center w-full' >
                    <div className='relative w-1/2'>
                        <input type='text'
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearhterm(e.target.value)}
                            className='bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg 
                        focus:outline-none w-full placeholder:text-gray-700'
                        />

                        {/* searchIcon */}
                        <button type='submit' className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900'>
                            <HiMagnifyingGlass className='h-6 w-6' />
                        </button>
                    </div>
                    {/* close button */}
                    <button type='button' onClick={handleSearchhToggle} className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600'>
                        <HiMiniXMark className='h-6 w-6' />
                    </button>
                </form>
            ) : (

                <button onClick={handleSearchhToggle}>
                    <HiMagnifyingGlass className='h-6 w-6 ' />
                </button>
            )
            }
        </div>
    );
};

export default SearchBar