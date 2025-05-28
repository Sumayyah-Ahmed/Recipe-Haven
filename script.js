const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<p>Gathering Delicious Recipes...</p>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response  = await data.json();
    /* main section */
    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h4>${meal.strMeal}</h4>
        <p>Dish: <span>${meal.strArea}</span></p>
        <p>Category: <span>${meal.strCategory}</span></p>
        `
        const button = document.createElement('button');
        button.textContent = "Get the Recipe";
        recipeDiv.appendChild(button);

        button.addEventListener('click', ()=>{
            openRecipePopup(meal);
        });

        recipeContainer.appendChild(recipeDiv);

    });
} 
catch (error) {
    recipeContainer.innerHTML = "<p> Error in Fetching Recipes...</p>";

}
}

const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
    <h3> Instructions:</h3>
    <p>${meal.strInstructions}</p>
    </div>


    `
    recipeDetailsContent.parentElement.style.display = "block";
 }

recipeCloseBtn.addEventListener('click',() => {
    recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        recipeContainer.innerHTML = `<p>Type the name of the dish you crave most!</p>`;
        return;
    }
    fetchRecipes(searchInput);
});
  
