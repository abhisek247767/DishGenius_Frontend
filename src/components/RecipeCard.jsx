import {React,useState} from "react";
import { useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaRegTrashAlt, FaHeart, FaShare, FaArrowRight } from "react-icons/fa"; // Ensure FaArrowRight is imported
import { toast } from "react-toastify";
import { AddToFavUrl, RecipeDeleteUrl, RemoveFavUrl } from "../../API";
import axios from "axios";
import { Heart, Share2, Trash2, ArrowRight, ChefHat } from "lucide-react"
import { Button } from "./core/Button";
import { DeleteModal } from "./core/DeleteModal";
const RecipeCard = ({
  recipe,
  fetchUserRecipes,
  fetchUserFavRecipes,
  favorites,
  user, // User object passed as prop
  fetchUserData,
}) => {
  const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false);
  // Early return if recipe data is missing
  if (!recipe) {
    console.warn("RecipeCard rendered without a recipe object.");
    return null;
  }

  // Destructure with default values for safety, though early return helps
  const {
    title = "Untitled Recipe",
    cuisine = "Unknown",
    ingredients = [],
    _id,
    createdBy,
  } = recipe; // Added createdBy

  const isFavorite = favorites?.some((fav) => fav?._id === _id); // Added optional chaining

  // --- Event Handlers ---

  const handleViewDetails = () => {
    navigate(`/recipe/${_id}`);
  };

  const handleFavoriteClick = async () => {
    // Determine URL and success message based on current favorite status
    const url = isFavorite ? RemoveFavUrl : AddToFavUrl;
    const successMessage = isFavorite
      ? "Recipe removed from favorites!"
      : "Recipe added to favorites!";
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("You must be logged in to manage favorites.");
      return;
    }
    if (!_id) {
      toast.error("Cannot favorite recipe: Missing recipe ID.");
      return;
    }

    try {
      const response = await axios.post(
        url,
        { recipeId: _id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check for explicit success status codes (e.g., 200 OK, 201 Created)
      toast.success(successMessage);
      // Refresh relevant data in the parent component
      fetchUserFavRecipes();
      fetchUserData();
      fetchUserRecipes();
    } catch (error) {
      console.error("Error updating favorites:", error);
      toast.error(
        `Failed to update favorites. ${error?.response?.data?.message || ""}` // Show backend message if available
      );
    }
  };
   const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      toast.error("Authentication token is missing. Cannot delete.")
      return
    }
    if (!_id) {
      toast.error("Cannot delete recipe: Missing recipe ID.")
      return
    }

    setIsDeleting(true)

    try {
      const response = await axios.delete(RecipeDeleteUrl, {
        data: { recipeId: _id },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        toast.success("Recipe deleted successfully!")
        fetchUserRecipes()
        fetchUserFavRecipes()
        setShowDeleteModal(false)
      } else {
        throw new Error(`Unexpected response status: ${response.status}`)
      }
    } catch (error) {
      console.error("Error deleting recipe:", error)
      toast.error(`Failed to delete recipe. ${error?.response?.data?.message || ""}`)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleShareClick = async () => {
    if (!_id) {
      toast.error("Cannot share recipe: Missing recipe ID.");
      return;
    }
    const recipeUrl = `${window.location.origin}/recipe/${_id}`;

    if (navigator.share) {
      // Use Web Share API if available
      try {
        await navigator.share({
          title: title,
          text: `Check out this recipe: ${title}`,
          url: recipeUrl,
        });
        // Success toast might be redundant as the browser shows confirmation
        // toast.success("Recipe shared!");
      } catch (error) {
        console.error("Error sharing:", error);
        // Ignore error if user cancelled the share action
        if (error.name !== "AbortError") {
          toast.error("Failed to share recipe.");
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(recipeUrl);
        toast.success("Recipe link copied to clipboard!");
      } catch (error) {
        console.error("Error copying to clipboard:", error);
        toast.error("Failed to copy recipe link.");
      }
    }
  };

  const isOwner = user && createdBy && user._id === createdBy;

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 flex flex-col h-full">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-5 w-5 text-orange-500" />
            <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">{cuisine}</span>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full transition-all duration-200 ${
                isFavorite
                  ? "text-red-500 bg-red-50 hover:bg-red-100"
                  : "text-gray-400 hover:text-red-500 hover:bg-red-50"
              }`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={handleShareClick}
              className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200"
              aria-label="Share recipe"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-orange-600 transition-colors duration-200">
          {title}
        </h2>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Ingredients Preview */}
        <div className="mb-6 flex-grow">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Ingredients</h3>
          </div>
          {ingredients && ingredients.length > 0 ? (
            <div className="space-y-2">
              {ingredients.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-1 px-2 bg-gray-50 rounded-md"
                  title={`${item.item} (${item.quantity})`}
                >
                  <span className="text-sm text-gray-700 font-medium truncate">{item.item}</span>
                  <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{item.quantity}</span>
                </div>
              ))}
              {ingredients.length > 3 && (
                <div className="text-center py-1">
                  <span className="text-xs text-orange-500 font-medium">
                    +{ingredients.length - 3} more ingredients
                  </span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic bg-gray-50 p-3 rounded-md text-center">No ingredients listed</p>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Button
          variant="primary"
            onClick={handleViewDetails}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-medium rounded-lg hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            View Recipe
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          {isOwner && (
            <button
              onClick={handleDeleteClick}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              title="Delete this recipe"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>

         <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Recipe"
        description="Are you sure you want to delete this recipe? This will permanently remove it from your collection and cannot be undone."
        itemName={title}
        loading={isDeleting}
      />

        {/* Owner Badge */}
        {isOwner && (
          <div className="mt-2 flex justify-end">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Your Recipe
            </span>
          </div>
        )}
      </div>
    </div>
  )
};

export default RecipeCard;
