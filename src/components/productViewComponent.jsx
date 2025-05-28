import { FiShoppingCart, FiEye } from "react-icons/fi";

const BASE_URL = "http://localhost:5010/"; 

const StarRating = ({ rate }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rate ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    );
  }
  return <div className="flex">{stars}</div>;
};

const ProductViewComponent = ({
  name,
  description,
  owner,
  availableQuantity,
  rate,
  price,
  currency,
  contents = [],
}) => {
  // Find first image or video (case-insensitive)
  const mainContent = contents.find(
    (c) =>
      c.type?.toLowerCase() === "image" || c.type?.toLowerCase() === "video"
  );

  // Normalize URL to full URL if relative
  const getContentUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    // Assume relative URL, prepend base URL
    return BASE_URL + url.replace(/^\/+/, ""); // Remove leading slashes if any
  };

  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow bg-white border border-gray-200 flex flex-col">
      <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
        {mainContent ? (
          mainContent.type.toLowerCase() === "image" ? (
            <img
              src={getContentUrl(mainContent.url)}
              alt={name || "Product image"}
              className="object-cover w-full h-32"
            />
          ) : (
            <video
              src={getContentUrl(mainContent.url)}
              controls
              className="object-cover w-full h-32"
            />
          )
        ) : (
          <span className="text-gray-400">No Image/Video</span>
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <h2 className="text-lg font-semibold mb-1">{name}</h2>
        <p className="text-gray-600 mb-2 text-sm line-clamp-2">{description}</p>
        <div className="flex items-center mb-2">
          <StarRating rate={rate} />
          <span className="ml-2 text-xs text-gray-500">{rate}/5</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-base font-bold">
            {currency} {price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500">Qty: {availableQuantity}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-400">Owner: {owner}</span>
          <button className="flex items-center text-blue-600 hover:underline text-xs">
            View
            <FiEye className="ml-1 text-base" />
          </button>
        </div>
      </div>
      <div className="p-3 pt-0">
        <button className="w-full flex items-center justify-center bg-black text-white py-2 rounded hover:bg-gray-800 transition text-sm">
          <FiShoppingCart className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductViewComponent;
