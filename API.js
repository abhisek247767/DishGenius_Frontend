const PROD_BASE_API = import.meta.env.VITE_REACT_APP_PROD_BASE_API_URL;
const LOCALHOST_BASE_API = import.meta.env.VITE_REACT_APP_LOCALHOST_BASE_API_URL;


const BASE_API = import.meta.env.VITE_APP_ENV === 'local' 
  ? LOCALHOST_BASE_API 
  : PROD_BASE_API;



export const LoginUrl = `${BASE_API}/users/login`;
export const VerifyOtp = `${BASE_API}/users/verifyOtp`;
export const RegisterUrl = `${BASE_API}/users/register`;
export const RecipeCreateUrl = `${BASE_API}/recipes/generate`;
export const RecipeDeleteUrl = `${BASE_API}/recipes/delete`;
export const GetUserRecipesUrl = `${BASE_API}/recipes/user`;
export const GetRecipeByID = `${BASE_API}/recipes/recipe`;
export const UserProfileUrl = `${BASE_API}/users/profile`;
export const UserDeleteUrl = `${BASE_API}/users/delete`;
export const AddToFavUrl = `${BASE_API}/fav/favorite`;
export const RemoveFavUrl = `${BASE_API}/fav/removeFav`;
export const GetFavUrl = `${BASE_API}/fav/userFav`;
export const GetAllRecipe = `${BASE_API}/recipes/all`;
export const LogoutUrl = `${BASE_API}/users/logout`;
export const ForgotPasswordUrl = `${BASE_API}/users/forgot-password`;
export const ResetPasswordWithOtpUrl = `${BASE_API}/users/reset-password-with-otp`;
export const SendOtp = `${BASE_API}/users/sendOtp`;
export const VerifyAccount = `${BASE_API}/users/verifyAccount`;
