import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === Number(id))
  );

  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <Link to={/edit/${recipe.id}}>Edit</Link>
      {' | '}
      <DeleteRecipeButton recipeId={recipe.id} onDelete={() => navigate('/')} />
    </div>
  );
};

export default RecipeDetails;