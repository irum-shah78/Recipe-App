getRandomMeal();

async function getRandomMeal() {
  const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  const respData = await resp.json();
  const randomMeal = respData.meals[0];

  console.log(randomMeal);
}

async function getMealById(id) {
  const meal = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
}

async function getMealsBySearch(term) {
  const meals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);
}

getRandomMeal();

// async function getRandomMeal() {
//   try {
//     const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
//     const respData = await resp.json();
//     const randomMeal = respData.meals[0];

//     console.log(randomMeal);
//   } catch (error) {
//     console.error("Error fetching random meal:", error);
//   }
// }

// async function getMealById(id) {
//   try {
//     const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
//     const mealData = await resp.json();
//     const meal = mealData.meals[0];
    
//     console.log(meal);
//     return meal;
//   } catch (error) {
//     console.error("Error fetching meal by ID:", error);
//     return null;
//   }
// }

// async function getMealsBySearch(term) {
//   try {
//     const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);
//     const searchData = await resp.json();
//     const meals = searchData.meals;
    
//     console.log(meals);
//     return meals;
//   } catch (error) {
//     console.error("Error fetching meals by search term:", error);
//     return null;
//   }
// }
