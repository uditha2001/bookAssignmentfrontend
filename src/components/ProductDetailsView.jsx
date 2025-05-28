import React from "react";
import { FiTrash2, FiEdit2, FiX } from "react-icons/fi";

const ProductDetailsView = ({
    product,
    onDeleteProduct,
    onEditProduct,
    onDeleteContent,
    onDeleteAttribute,
    onEditContent,
    onEditAttribute,
}) => {
    if (!product) {
        return <div className="text-center text-gray-500 py-8">No product selected.</div>;
    }

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{product.Name}</h2>
                <div className="flex gap-2">
                    <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={onEditProduct}
                        title="Edit Product"
                    >
                        <FiEdit2 />
                    </button>
                    <button
                        className="text-red-600 hover:text-red-800"
                        onClick={onDeleteProduct}
                        title="Delete Product"
                    >
                        <FiTrash2 />
                    </button>
                </div>
            </div>
            <div className="mb-2 text-gray-600">
                <span className="font-semibold">Category:</span>{" "}
                {product.CategoryName || "No Category"}
            </div>
            <div className="mb-2">
                <span className="font-semibold">Description:</span> {product.Description}
            </div>
            <div className="mb-2">
                <span className="font-semibold">Price:</span> {product.Currency} {product.Price}
            </div>
            <div className="mb-2">
                <span className="font-semibold">Available Quantity:</span> {product.availableQuantity}
            </div>
            {/* Contents (Images) */}
            <div className="mb-4">
                <span className="font-semibold">Images:</span>
                <div className="flex flex-wrap gap-3 mt-2">
                    {product.Contents && product.Contents.length > 0 ? (
                        product.Contents.map((content, idx) => (
                            <div
                                key={idx}
                                className="relative w-20 h-20 border rounded overflow-hidden flex items-center justify-center bg-gray-100"
                            >
                                <img
                                    src={content.url}
                                    alt={content.name}
                                    className="object-cover w-full h-full"
                                />
                                <button
                                    type="button"
                                    className="absolute top-0 right-0 bg-white rounded-bl px-1 py-0.5 text-red-600"
                                    onClick={() => onDeleteContent(idx)}
                                    title="Delete Image"
                                >
                                    <FiTrash2 />
                                </button>
                                {onEditContent && (
                                    <button
                                        type="button"
                                        className="absolute bottom-0 right-0 bg-white rounded-tl px-1 py-0.5 text-blue-600"
                                        onClick={() => onEditContent(idx)}
                                        title="Edit Image"
                                    >
                                        <FiEdit2 />
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-400 text-sm">No images.</div>
                    )}
                </div>
            </div>
            {/* Attributes */}
            <div className="mb-4">
                <span className="font-semibold">Attributes:</span>
                <ul className="ml-2 mt-2 list-disc text-sm">
                    {product.Attributes && product.Attributes.length > 0 ? (
                        product.Attributes.map((attr, idx) => (
                            <li key={idx} className="flex items-center">
                                <span className="mr-1 font-semibold">{attr.key}:</span>
                                <span>{attr.value}</span>
                                <button
                                    type="button"
                                    className="ml-2 text-red-500"
                                    onClick={() => onDeleteAttribute(idx)}
                                    title="Delete Attribute"
                                >
                                    <FiX />
                                </button>
                                {onEditAttribute && (
                                    <button
                                        type="button"
                                        className="ml-1 text-blue-500"
                                        onClick={() => onEditAttribute(idx)}
                                        title="Edit Attribute"
                                    >
                                        <FiEdit2 />
                                    </button>
                                )}
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-400">No attributes.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ProductDetailsView;