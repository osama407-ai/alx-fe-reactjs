DeleteRecipeButton.jsx 

import { useRecipeStore } from '../store/recipeStore';

const DeleteRecipeButton = ({ recipeId, onDelete }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = () => {
    deleteRecipe(recipeId);
    if (onDelete) onDelete();
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteRecipeButton;