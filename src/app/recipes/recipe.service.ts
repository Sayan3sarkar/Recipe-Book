import { Injectable  } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  recipesChanged= new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('Sirloin Steak', 'Wagyu Beef Recommended', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg', [
  //     new Ingredient('Beef', 1),
  //     new Ingredient('Virgin Olive Oil', 1),
  //     new Ingredient('Bell Pepper', 4)
  //   ]),
  //   new Recipe('Braised Prawn', 'This is simply a test', '
  // https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Recipe.jpg/714px-Recipe.jpg', [
  //     new Ingredient('Prawn', 11),
  //     new Ingredient('Bell Pepper', 3),
  //     new Ingredient('Onion', 2),
  //     new Ingredient('Virgin Olive Oil', 1)
  //   ])
  // ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(): Recipe[] { // get all recipes
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void { // add ingredients to shopping list component
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index: number): Recipe { // get a specific recipe
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe): void { // add a specific recipe
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void { // update a specific recipe
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void { // delete a specific recipe
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
