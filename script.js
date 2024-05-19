const mealsEl = document.getElementById('meals');
const favContainer = document.getElementById('fav-meals');
const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');
const mealPopup = document.getElementById('meal-popup');
const popupCloseBtn = document.getElementById('close-popup');
const mealInfoEl = document.getElementById('meal-info');

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
  const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");

  const respData = await resp.json();
  const randomMeal = respData.meals[0];

  // console.log(randomMeal);

  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);

  const respData = await resp.json();
  const meal = respData.meals[0];

  return meal;
}

async function getMealsBySearch(term) {
  const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);

  const respData = await resp.json();
  const meals = respData.meals;

  return meals;
}

function addMeal(mealData, random = false) {
  console.log(mealData);
  const meal = document.createElement('div');
  meal.classList.add('meal');

  meal.innerHTML = `
        <div class="meal-header">
          ${random ? `<span class="random">
          Random Recipe
        </span>` : ''}
          <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
        </div>
        <div class="meal-body">
          <h4> ${mealData.strMeal} </h4>
          <button class="fav-btn"><i class="fa-solid fa-heart"></i></button>
        </div>
      `;

  const btn = meal.querySelector(".meal-body .fav-btn");

  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealLS(mealData.idMeal);
      btn.classList.add("active");
    }

    fetchFavMeals();
  });

  meal.addEventListener('click', () => {
    showMealInfo(mealData);
  })

  mealsEl.appendChild(meal);
};

function addMealLS(mealId) {
  const mealIds = getMealsLS();

  localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
  const mealIds = getMealsLS();

  localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealId)));

}

function getMealsLS() {
  const mealIds = JSON.parse(localStorage.getItem('mealIds'));

  return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
  // clean container first
  favContainer.innerHTML = '';

  const mealIds = getMealsLS();

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    const meal = await getMealById(mealId);

    addMealFav(meal);
  }
}

function addMealFav(mealData) {
  const favMeal = document.createElement('li');

  favMeal.innerHTML = `
          <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
          <span>${mealData.strMeal}</span>
          <button class="clear"><i class="fa-solid fa-xmark"></i></button>
      `;

  const btn = favMeal.querySelector('.clear');

  btn.addEventListener('click', () => {
    removeMealLS(mealData.idMeal);

    fetchFavMeals();
  });

  favContainer.appendChild(favMeal);
};

function showMealInfo(mealData) {
  const mealEl = document.createElement('div');

  mealEl.innerHTML = `
      <div class="title-img">
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="image">
      </div>
      <p>${mealData.strInstructions}</p>`;

  mealInfoEl.appendChild(mealEl);

  mealPopup.classList.remove('hidden');
}

searchBtn.addEventListener('click', async () => {
  mealsEl.innerHTML = '';
  const search = searchTerm.value;

  const Meals = await getMealsBySearch(search);

  if (Meals) {
    Meals.forEach((meal) => {
      addMeal(meal);
    });
  }
});

popupCloseBtn.addEventListener('click', () => {
  mealPopup.classList.add('hidden');
});