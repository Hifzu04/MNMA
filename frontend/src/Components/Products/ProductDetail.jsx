import React, { useEffect, useState } from 'react'
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

    const [mainImage, setmainImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(null)
    const [isButtondisabled, setIsButtonDisabled] = useState(false)

    useEffect(() => {
        if (SelectedProdut?.images?.length > 0) {
            setmainImage(SelectedProdut.images[0].url)
        }
    }, [SelectedProdut]);



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
        <div className='p-6'>
            <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
                <div className='flex  flex-col md:flex-row'>

                    {/* left thumbnail */}
                    <div className='hidden md:flex flex-col space-y-4 mr-6'>
                        {SelectedProdut.images.map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={image.altText || `thumbnail ${index}`}
                                onClick={() => setmainImage(image.url)}
                                className={`w-20 h-20  cursor-pointer object-cover rounded-lg border
                                ${mainImage === image.url ? "border-black border-2" : "border-r-gray-300"}`} />

                        ))}

                    </div>

                    {/* main image */}
                    <div className='md:w-1/2'>
                        <div className='mb-4'>
                            <img src={mainImage} alt="mainProduct"
                                className='w-full h-auto rounded-lg object-cover '
                            />
                        </div>

                    </div>

                    {/* mobile thumbnail */}
                    <div className='md:hidden  flex overscroll-x-scroll space-x-4 mb-4 '>
                        {SelectedProdut.images.map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={image.altText || `thumbnail ${index}`}
                                onClick={() => setmainImage(image.url)}

                                className={`w-12 h-12 cursor-pointer object-cover rounded-lg border
                                ${mainImage === image.url ? "border-black border-2" : "border-r-gray-300"}`} />

                        ))}


                    </div>


                    {/* Right Section  */}
                    <div className='md:w-1/2 md:ml-10'>
                        <h1 className='font-semibold mb-2 text-2xl md:text-3xl'>
                            {SelectedProdut.name}
                        </h1>

                        <p className='text-lg text-gray-600 mb-1 line-through '>
                            {SelectedProdut.originalPrice && `${SelectedProdut.originalPrice}`}

                        </p>
                        <p className='text-xl text-gray-500 mb-2'>
                            ${SelectedProdut.price}
                        </p>
                        <p className='text-gray-600 mb-4'>{SelectedProdut.description}</p>
                        <div className='mb-4'>
                            <p className='text-gray-700'>
                                Color:
                            </p>

                            {/* color button */}
                            <div className="flex gap-2 mt-2">
                                {SelectedProdut.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-8 h-8 rounded-full border  ${color === selectedColor ? "border-black border-4" : "border-gray-300"}`}
                                        style={{
                                            backgroundColor: color.toLocaleLowerCase(),
                                            filter: "brightness(0.5)",
                                        }}
                                    >


                                    </button>
                                ))}
                            </div>



                            {/* sizes */}
                            <div className='mb-4'>
                                <p className='text-gray-700'>Size:</p>
                                <div className='flex gap-2 mt-2'>
                                    {SelectedProdut.sizes.map((size) => (
                                        <button key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 rounded border ${selectedSize === size ? "bg-black text-white" : "bg-gray-200"}`}>
                                            {size}
                                        </button>
                                    ))

                                    }
                                </div>
                            </div>

                            {/* Quantity }  TODO : QUATITY MUST NOT GO BEYOND STOCK IF USER CLICKS IT GET NOTIFICATION */}
                            <div className='mb-6'>
                                <p className='text-gray-700'>Quantity:</p>
                                <div className='flex items-center space-x-4 mt-2'>
                                    <button onClick={() => handleQuantityChange("Minus")} className='px-2 py-1 bg-gray-200 rounded text-lg'>
                                        -
                                    </button>
                                    <span className='text-lg'>{quantity}</span>
                                    <button onClick={() => handleQuantityChange("Plus")} className='px-2 py-1 bg-gray-200 rounded text-lg'>
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Add to cart button(submit) */}
                            <button
                                onClick={handleAddToCart}
                                className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtondisabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-900"}`}
                                disabled={isButtondisabled}
                            >
                                {isButtondisabled ? "Adding..." : "ADD TO CART"}
                            </button>


                            <div className='mt-10 text-gray-700'>
                                <h3 className='text-xl font-bold mb-4'>Characteristics:</h3>
                                <table className='w-full text-left text-sm text-gray-600'>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'>Brand</td>
                                            <td className='py-1'>{SelectedProdut.brand}</td>

                                        </tr>
                                        <tr>
                                            <td className='py-1'>Material</td>
                                            <td className='py-1'>{SelectedProdut.material}</td>

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