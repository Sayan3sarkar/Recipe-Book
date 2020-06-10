import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  public storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipe-book-565df.firebaseio.com/recipes.json', recipes)
      .subscribe(res => {
        console.log(res);
      });
  }

  public fetchRecipes() {
    return this.http.get<Recipe[]>('https://recipe-book-565df.firebaseio.com/recipes.json').pipe(map(recipes => {
        // recipes might be added without any ingredients.So no ingredient recipes should have ingredients as empty
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        }); // javascript map
      }),
      tap((recipes: Recipe[]) => { // tap allows to execute some side effect code on the exact replica of the source observable
        // without altering the original one
        this.recipeService.setRecipes(recipes);
      }));
  }

}
