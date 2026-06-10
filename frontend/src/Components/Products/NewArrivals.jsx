import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronsRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import axios from 'axios'

function NewArrivals() {

    const scrollRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [initialScrollLeft, setInitialScrollLeft] = useState(0);

    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const [newArrivals, setNewArrivals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // FETCH FROM BACKEND
    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                setLoading(true);

                const { data } = await axios.get(
                    "http://localhost:5000/api/products/new-arrivals"
                );

                setNewArrivals(data);
                setLoading(false);

            } catch (err) {
                console.error("Error fetching new arrivals:", err);
                setError("Failed to load products");
                setLoading(false);
            }
        };

        fetchNewArrivals();
    }, []);

    const updateScrollButtons = () => {
        const container = scrollRef.current;

        if (container) {
            const leftScroll = container.scrollLeft;
            const rightScrollable =
                container.scrollWidth > leftScroll + container.clientWidth + 1;

            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScrollable);
        }
    }

    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.pageX - scrollRef.current.offsetLeft)
        setInitialScrollLeft(scrollRef.current.scrollLeft)
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const x = e.pageX - scrollRef.current.offsetLeft
        const walk = x - startX;

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

            return () =>
                container.removeEventListener("scroll", updateScrollButtons);
        }
    }, []);

    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className='container mx-auto text-center mb-10 relative'>
                <h2 className='text-3xl font-bold mb-4'>
                    Explore New Arrivals
                </h2>

                <p className='text-lg text-gray-600 mb-8'>
                    Discover the latest style off the runway, freshly added to keep your style on cutting edge of fashion.
                </p>

                <div className='absolute right-0 bottom-[-30px] flex space-x-2 '>
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`p-2 rounded border ${
                            canScrollLeft
                                ? "bg-white text-black"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        <FiChevronLeft className='text-2xl' />
                    </button>

                    <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className={`p-2 rounded border ${
                            canScrollRight
                                ? "bg-white text-black"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        <FiChevronsRight className='text-2xl' />
                    </button>
                </div>
            </div>

            {/* LOADING / ERROR */}
            {loading && (
                <p className="text-center text-gray-500">Loading products...</p>
            )}

            {error && (
                <p className="text-center text-red-500">{error}</p>
            )}

            {/* SCROLLABLE CONTENT */}
            {!loading && !error && (
                <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handlemouseUporleave}
                    onMouseLeave={handlemouseUporleave}
                    className={`container mx-auto overflow-x-scroll flex space-x-6 relative 
                    ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                >
                    {newArrivals.map((product) => (
                        <div
                            key={product._id}
                            className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'
                        >
                            <img
                                src={product.images?.[0]?.url}
                                alt={
                                    product.images?.[0]?.altText ||
                                    product.name
                                }
                                className='w-full h-[500px] object-cover rounded-lg'
                                draggable="false"
                            />

                            <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-bl-lg'>
                                <Link
                                    to={`/product/${product._id}`}
                                    className="block"
                                >
                                    <h4 className='font-medium'>
                                        {product.name}
                                    </h4>
                                    <p className='mt-1'>
                                        ${product.price}
                                    </p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default NewArrivals