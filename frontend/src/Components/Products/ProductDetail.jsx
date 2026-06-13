import React, { useState } from 'react'
import { toast } from 'sonner';

const SelectedProdut = {
    name: "Stylish slipper",
    price: 80,
    originalPrice: 150,
    description: "This is stylish classic limited edition",
    brand: "mnma co",
    material: "leather",
    sizes: ["S", "MD", "LG", "XL"],
    colors: ["Red", "Black"],
    images: [
        {
            url: "http://picsum.photos/500/500/?random=8",
            altText: "Stylish Jacket"
        },
        {
            url: "http://picsum.photos/500/500/?random=9",
            altText: "Stylish Jacket"
        },
        {
            url: "http://picsum.photos/500/500/?random=10",
            altText: "Stylish Jacket"
        },
    ]
}


//Rereder : this funcation will be called again
// TODO: QUATITY MUST NOT GO BEYOND STOCK IF USER CLICKS IT GET NOTIFICATION

function ProductDetail() {

    const [mainImage, setmainImage] = useState(SelectedProdut?.images?.[0]?.url || null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(null)
    const [isButtondisabled, setIsButtonDisabled] = useState(false)



    const handleQuantityChange = (para) => {
        if (para === "Plus") setQuantity((prev) => prev + 1);
        if (para === "Minus" && quantity > 1) setQuantity((prev) => prev - 1);
    }

    const handleAddToCart = () => {
        if (!selectedColor) {
            toast.error("Pls select a color before adding to cart",
                { duration: 1000, }
            )
            return;
        }
        if (!selectedSize) {
            toast.error("Pls select a size before adding to cart", { duration: 1000, })
            return;
        }

        setIsButtonDisabled(true)
        setTimeout(() => {
            toast.success("Product added to cart!", {
                duration: 1000,
            });
            setIsButtonDisabled(false);
        } , 500);



    }

    return (
        <div className='px-4 py-6 sm:p-6'>
            <div className='max-w-6xl mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-sm'>
                <div className='flex flex-col md:flex-row gap-6'>

                    {/* left thumbnail — desktop only */}
                    <div className='hidden md:flex flex-col space-y-4 mr-2'>
                        {SelectedProdut.images.map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={image.altText || `thumbnail ${index}`}
                                onClick={() => setmainImage(image.url)}
                                className={`w-20 h-20 cursor-pointer object-cover rounded-lg border-2 transition
                                ${mainImage === image.url ? "border-black" : "border-gray-200 hover:border-gray-400"}`} />
                        ))}
                    </div>

                    {/* main image */}
                    <div className='w-full md:w-1/2'>
                        <div className='mb-4'>
                            <img src={mainImage} alt="mainProduct"
                                className='w-full h-[300px] sm:h-[400px] md:h-auto rounded-lg object-cover'
                            />
                        </div>

                        {/* mobile thumbnail */}
                        <div className='md:hidden flex overflow-x-auto space-x-3 pb-2 mb-2'>
                            {SelectedProdut.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.url}
                                    alt={image.altText || `thumbnail ${index}`}
                                    onClick={() => setmainImage(image.url)}
                                    className={`flex-shrink-0 w-16 h-16 cursor-pointer object-cover rounded-lg border-2 transition
                                    ${mainImage === image.url ? "border-black" : "border-gray-200"}`} />
                            ))}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className='w-full md:w-1/2 md:ml-6'>
                        <h1 className='font-semibold mb-2 text-xl sm:text-2xl md:text-3xl'>
                            {SelectedProdut.name}
                        </h1>

                        <p className='text-base text-gray-500 mb-1 line-through'>
                            {SelectedProdut.originalPrice && `₹${SelectedProdut.originalPrice}`}
                        </p>
                        <p className='text-xl font-semibold text-gray-800 mb-2'>
                            ₹{SelectedProdut.price}
                        </p>
                        <p className='text-gray-600 mb-4 text-sm sm:text-base'>{SelectedProdut.description}</p>

                        <div className='mb-4'>
                            <p className='text-gray-700 font-medium'>Color:</p>

                            {/* color buttons */}
                            <div className="flex gap-2 mt-2 flex-wrap">
                                {SelectedProdut.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-9 h-9 rounded-full border-2 transition ${color === selectedColor ? "border-black scale-110" : "border-gray-300 hover:border-gray-500"}`}
                                        style={{
                                            backgroundColor: color.toLocaleLowerCase(),
                                            filter: "brightness(0.7)",
                                        }}
                                    />
                                ))}
                            </div>

                            {/* sizes */}
                            <div className='mb-4 mt-4'>
                                <p className='text-gray-700 font-medium'>Size:</p>
                                <div className='flex gap-2 mt-2 flex-wrap'>
                                    {SelectedProdut.sizes.map((size) => (
                                        <button key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 rounded border text-sm transition ${selectedSize === size ? "bg-black text-white border-black" : "bg-gray-100 border-gray-300 hover:border-gray-500"}`}>
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className='mb-6'>
                                <p className='text-gray-700 font-medium'>Quantity:</p>
                                <div className='flex items-center space-x-4 mt-2'>
                                    <button onClick={() => handleQuantityChange("Minus")} className='w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full text-lg hover:bg-gray-200 transition'>
                                        −
                                    </button>
                                    <span className='text-lg font-medium w-6 text-center'>{quantity}</span>
                                    <button onClick={() => handleQuantityChange("Plus")} className='w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full text-lg hover:bg-gray-200 transition'>
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Add to cart */}
                            <button
                                onClick={handleAddToCart}
                                className={`bg-black text-white py-3 px-6 rounded-lg w-full mb-4 text-sm tracking-wide font-semibold transition ${isButtondisabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-800"}`}
                                disabled={isButtondisabled}
                            >
                                {isButtondisabled ? "Adding..." : "ADD TO CART"}
                            </button>

                            <div className='mt-8 text-gray-700'>
                                <h3 className='text-lg font-bold mb-3'>Characteristics:</h3>
                                <table className='w-full text-left text-sm text-gray-600'>
                                    <tbody>
                                        <tr className='border-b'>
                                            <td className='py-2 font-medium w-24'>Brand</td>
                                            <td className='py-2'>{SelectedProdut.brand}</td>
                                        </tr>
                                        <tr>
                                            <td className='py-2 font-medium w-24'>Material</td>
                                            <td className='py-2'>{SelectedProdut.material}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductDetail
