import { FiTrash2, FiEdit2, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Add this import

const BASE_URL = "http://localhost:5010/";

const ProductDetailsView = ({
    product,
    categories = [],
    onDeleteProduct,
    onEditProduct,
    onDeleteContent,
    onDeleteAttribute,
    onEditContent,
    onEditAttribute,
}) => {
    const navigate = useNavigate(); // Add this line

    if (!product) {
        return <div className="text-center text-gray-500 py-8">No product selected.</div>;
    }

    // Find category name if not provided
    const categoryName =
        product.categoryName ||
        categories.find((c) => c.id === Number(product.productCategoryId))?.name ||
        "No Category";

    // Normalize URL to full URL if relative
    const getContentUrl = (url) => {
        if (!url) return "";
        if (url.startsWith("http://") || url.startsWith("https://")) {
            return url;
        }
        return BASE_URL + url.replace(/^\/+/, "");
    };

    // Edit handler: navigate to /editProducts with product as state
    const handleEdit = () => {
        navigate("/editProducts", { state: { product } });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={handleEdit}
                    title="Edit Product"
                >
                    <FiEdit2 />
                </button>
            </div>
            <div className="mb-2 text-gray-600">
                <span className="font-semibold">Category:</span> {categoryName}
            </div>
            <div className="mb-2">
                <span className="font-semibold">Description:</span> {product.description}
            </div>
            <div className="mb-2">
                <span className="font-semibold">Price:</span> {product.currency} {Number(product.price).toFixed(2)}
            </div>
            <div className="mb-2">
                <span className="font-semibold">Available Quantity:</span> {product.availableQuantity}
            </div>
            <div className="mb-2">
                <span className="font-semibold">Owner:</span> {product.owner}
            </div>
            {/* All Images */}
            <div className="mb-4">
                <span className="font-semibold">Images:</span>
                <div className="flex flex-wrap gap-3 mt-2">
                    {Array.isArray(product.contents) && product.contents.filter(c => c.type?.toLowerCase() === "image").length > 0 ? (
                        product.contents.filter(c => c.type?.toLowerCase() === "image").map((content, idx) => (
                            <div
                                key={idx}
                                className="relative w-20 h-20 border rounded overflow-hidden flex items-center justify-center bg-gray-100"
                            >
                                <img
                                    src={getContentUrl(content.url)}
                                    alt={content.name}
                                    className="object-cover w-full h-full"
                                />
                                {onDeleteContent && (
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 bg-white rounded-bl px-1 py-0.5 text-red-600"
                                        onClick={() => onDeleteContent(idx)}
                                        title="Delete Image"
                                    >
                                        <FiX />
                                    </button>
                                )}
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
                    {Array.isArray(product.attributes) && product.attributes.length > 0 ? (
                        product.attributes.map((attr, idx) => (
                            <li key={idx} className="flex items-center">
                                <span className="mr-1 font-semibold">{attr.key}:</span>
                                <span>{attr.value}</span>
                                {onDeleteAttribute && (
                                    <button
                                        type="button"
                                        className="ml-2 text-red-500"
                                        onClick={() => onDeleteAttribute(idx)}
                                        title="Delete Attribute"
                                    >
                                        <FiX />
                                    </button>
                                )}
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