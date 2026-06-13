import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronsRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function NewArrivals() {

    const scrollRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [initialScrollLeft, setInitialScrollLeft] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const updateScrollButtons = () => {
        const container = scrollRef.current;

        if (container) {
            const leftScroll = container.scrollLeft;
            // We use a 1px buffer to handle sub-pixel rounding issues in browsers
            const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth + 1;
            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScrollable);
        }
    //     console.log({
    //        // scrollLeft: container.scrollLeft
    //     })
     }

    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.pageX - scrollRef.current.offsetLeft)
        setInitialScrollLeft(scrollRef.current.scrollLeft)
    }

    const handleMouseMove = (e) => {
        if (!isDragging) {
            return;
        }
        const x = e.pageX - scrollRef.current.offsetLeft
        const walk = x - startX;
        // FIX 2: Use the state variable we updated in handleMouseDown
        scrollRef.current.scrollLeft = initialScrollLeft - walk;

    }

    const handlemouseUporleave = () => {
        setIsDragging(false)
    }

    const scroll = (direction) => {
        const scrollAmount = direction === "left" ? -300 : 300;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    useEffect(() => {
        const container = scrollRef.current
        if (container) {
            container.addEventListener("scroll", updateScrollButtons);
            updateScrollButtons();
            return () => container.removeEventListener("scroll" , updateScrollButtons)
        }
    }, [])


    const newArrivals = [
        {
            _id: "1",
            name: "Shoe1",
            price: 120,
            images: [
                {
                    url: "http://picsum.photos/500/500/?random=1",
                    altText: "Stylish Jacket"
                },
            ],

        },

        {
            _id: "2",
            name: "Shoe1",
            price: 120,
            images: [
                {
                    url: "http://picsum.photos/500/500/?random=2",
                    altText: "Stylish Jacket"
                },
            ],

        },

        {
            _id: "3",
            name: "Shoe1",
            price: 120,
            images: [
                {
                    url: "http://picsum.photos/500/500/?random=3",
                    altText: "Stylish Jacket"
                },
            ],

        },


        {
            _id: "4",
            name: "Shoe1",
            price: 120,
            images: [
                {
                    url: "http://picsum.photos/500/500/?random=4",
                    altText: "Stylish Jacket"
                },
            ],

        },

        {
            _id: "5",
            name: "Shoe1",
            price: 120,
            images: [
                {
                    url: "http://picsum.photos/500/500/?random=5",
                    altText: "Stylish Jacket"
                },
            ],

        },

        {
            _id: "6",
            name: "Shoe1",
            price: 120,
            images: [
                {
                    url: "http://picsum.photos/500/500/?random=6",
                    altText: "Stylish Jacket"
                },
            ],

        },

        {
            _id: "7",
            name: "Shoe1",
            price: 120,
            images: [
                {
                    url: "http://picsum.photos/500/500/?random=7",
                    altText: "Stylish Jacket"
                },
            ],

        },

        {
            _id: "8",
            name: "Shoe1",
            price: 120,
            images: [
                {
                    url: "http://picsum.photos/500/500/?random=8",
                    altText: "Stylish Jacket"
                },
            ],

        },

    ]

    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className='container mx-auto text-center mb-10 relative'>
                <h2 className='text-3xl font-bold mb-4'>
                    Explore New Arrivals
                </h2>
                <p className='text-lg text-gray-600 mb-8'>
                    Discover the latest style off the runway, freshly added to keep your style on cutting edge of fashion.
                </p>


                {/* scroll section*/}

                <div className='absolute right-0 bottom-[-30px] flex space-x-2 '>
                    <button onClick={() => scroll("left")} disabled={!canScrollLeft} className={`p-2 rounded border ${canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                        <FiChevronLeft className='text-2xl' />
                    </button>
                    <button onClick={() => scroll("right")}
                        className={`p-2 rounded border ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                        <FiChevronsRight className='text-2xl' />
                    </button>
                </div>



            </div>

            {/* scrollable content */}
            <div
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handlemouseUporleave}
                onMouseLeave={handlemouseUporleave}

                className={`container mx-auto overflow-x-scroll flex space-x-6 relative 
                ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}>
                {newArrivals.map((product) => (
                    <div key={product._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
                        <img src={product.images[0]?.url}
                            alt={product.images[0]?.altText || product.name}
                            className='w-full h-[500px] object-cover rounded-lg'
                            draggable="false"
                        />
                        <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white 
                        p-4 rounded-bl-lg '>
                            <Link to={`/product/${product._id}`} className="block">
                                <h4 className='font-medium'>{product.name}</h4>
                                <p className='mt-1'>${product.price}</p>
                            </Link>


                        </div>
                    </div>

                ))}
            </div>


        </section>
    )
}

export default NewArrivals



