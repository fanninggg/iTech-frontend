'use strict'

const apiUrl = "http://localhost:5000";

window.addEventListener('load', async function () {
	const response = await fetch(`${apiUrl}/recipes`);
	const recipes = await response.json();

	// Insert a random recipe on page load
	const randomRecipe = getRandomValue(recipes)
	insertRecipeOverview(randomRecipe);
	insertRecipeIngredients(randomRecipe.ingredients);
	insertRecipeInstructions(randomRecipe.instructions);
})

const getRandomValue = (hash) => {
	const randomKey = Object.keys(hash)[Math.floor(Math.random()*Object.keys(hash).length)]
	return hash[randomKey]
}

// ============== Data Insertion =================
const insertRecipeOverview = (recipe) => {
	document.getElementById('recipe-name').innerText = recipe.name
	document.getElementById('recipe-cooking-time').innerText = recipe.duration
}

const insertRecipeIngredients = (ingredients) => {
	ingredients.forEach((ingredient) => {
		const ingredientHTML = 
		`
			<div class="recipe-ingredient">
				<p>${ingredient.display.split(' ').slice(0, 2).join(' ')}</p>
				<h3>${ingredient.name[0].toUpperCase() + ingredient.name.substring(1)}</h3>
			</div>
		`
		document.getElementById('ingredients-list').insertAdjacentHTML('beforeend', ingredientHTML)
	})
}

const insertRecipeInstructions = (instructions) => {
	Object.entries(instructions).forEach((instruction) => {
		const instructionHTML = 
		`
			<div class="recipe-instruction">
				<p>${instruction[0]}.</p>
				<p>${instruction[1].text}</p>
			</div>
		`
		document.getElementById('instructions-list').insertAdjacentHTML('beforeend', instructionHTML)
	})
}

// ============== API Calls =================
// Come back to this if there's time, issue when trying to use JSON encoded array as body, same in Postman
// No issue authenticating with the recipes/raw and form-data body

// const getRecipeIngredients = async (id) => {
// 	const data = [id]
// 	const response = await fetch(`${apiUrl}/ingredients/raw`, {
// 		method: 'POST',
// 		headers: {
// 			'Authorization': 'aa99d10d347eeea13e7959be4320b0c1',
// 		},
// 		body: JSON.stringify(data)
// 	});
// 	const recipes = await response.json();
	// return recipes[0]
// }