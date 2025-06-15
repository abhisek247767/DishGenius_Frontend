import { Create, Favorite } from "@mui/icons-material";
// Make sure useMemo is imported
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import RecipeCard from "../components/RecipeCard";
import { GetAllRecipe } from "../../API"; // Ensure path is correct
import axios from "axios";
import RecipeCardSkeleton from "../components/RecipeCardSkeleton";
import { Plus, Heart, ChefHat, TrendingUp, Sparkles, BookOpen, Star } from "lucide-react"

const HomeScreen = ({
  recipes = [],
  favorites = [],
  user, // User object, expected to have _id
  fetchUserData,
  fetchUserFavRecipes,
  fetchUserRecipes,
}) => {
  const navigate = useNavigate();
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Timestamps for recent activity (remains the same)
  const createdAt = recipes[recipes.length - 1]?.createdAt;
  const timeAgo = createdAt
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : "";
  const addedAt = favorites[favorites.length - 1]?.addedAt;
  const timeAgoSave =
    addedAt && !isNaN(new Date(addedAt).getTime())
      ? formatDistanceToNow(new Date(addedAt), { addSuffix: true })
      : "";

  // Fetching all recipes (remains the same)
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(GetAllRecipe, {
          headers: { ...(token && { Authorization: `Bearer ${token}` }) },
        });
        setAllRecipes(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setAllRecipes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  // --- NEW: Sort recipes using useMemo ---
  const sortedRecipes = useMemo(() => {
    // Ensure user and user._id are available, otherwise return unsorted
    if (!user?._id) {
      return allRecipes;
    }

    const userId = user._id;

    // Create a shallow copy to avoid mutating the original state array directly
    return [...allRecipes].sort((a, b) => {
      // Check if recipes exist and have the 'createdBy' field (adjust field name if necessary)
      const aIsOwner = a && a.createdBy === userId;
      const bIsOwner = b && b.createdBy === userId;

      if (aIsOwner && !bIsOwner) {
        return -1; // a comes first
      }
      if (!aIsOwner && bIsOwner) {
        return 1; // b comes first
      }
      // If both are owned by user OR neither are owned by user, maintain original relative order (or sort by date)
      // For secondary sort by newest first (optional):
      // if (a.createdAt && b.createdAt) {
      //    return new Date(b.createdAt) - new Date(a.createdAt);
      // }
      return 0; // Keep original relative order otherwise
    });
  }, [allRecipes, user]); // Recalculate only when allRecipes or user changes
  // --- End Sort recipes ---

  
  const stats = [
    { label: "Your Recipes", value: recipes.length, icon: BookOpen, color: "blue" },
    { label: "Favorites", value: favorites.length, icon: Heart, color: "red" },
    { label: "Total Recipes", value: allRecipes.length, icon: ChefHat, color: "orange" },
  ]

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-orange-500 mr-2" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Welcome back, {user?.name?.split(" ")[0] || "Chef"}!
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to create something delicious? Let's turn your ingredients into culinary masterpieces.
            </p>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg bg-${stat.color}-100 mr-4`}>
                    <IconComponent className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Action Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div
            className="group bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-6 cursor-pointer hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={() => navigate("/recipe")}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Create Recipe</h2>
                <p className="text-orange-100">Turn your ingredients into magic</p>
              </div>
            </div>
          </div>

          <div
            className="group bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-6 cursor-pointer hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={() => navigate("/fav")}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Your Favorites</h2>
                <p className="text-red-100">Recipes you love most</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="p-3 bg-blue-100 rounded-full">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {recipes.length === 0
                    ? "No recipes created yet"
                    : `Created "${recipes[recipes.length - 1]?.title || "a recipe"}"`}
                </p>
                {timeAgo && <p className="text-sm text-gray-500">{timeAgo}</p>}
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg">
              <div className="p-3 bg-red-100 rounded-full">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {favorites.length === 0
                    ? "No favorites added yet"
                    : `Added "${favorites[favorites.length - 1]?.title || "a recipe"}" to favorites`}
                </p>
                {timeAgoSave && <p className="text-sm text-gray-500">{timeAgoSave}</p>}
              </div>
            </div>
          </div>
        </motion.div>

        {/* All Recipes Section */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-900">All Recipes</h2>
            </div>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {sortedRecipes.length} recipes
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <RecipeCardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          ) : !loading && sortedRecipes.length === 0 ? (
            <div className="text-center py-16">
              <ChefHat className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-500 mb-2">No recipes found</h3>
              <p className="text-gray-400">Start by creating your first recipe!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  favorites={favorites}
                  user={user}
                  fetchUserRecipes={fetchUserRecipes}
                  fetchUserFavRecipes={fetchUserFavRecipes}
                  fetchUserData={fetchUserData}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
};

export default HomeScreen;
