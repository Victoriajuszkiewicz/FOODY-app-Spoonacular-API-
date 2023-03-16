import Local from "./Local";

export class Api {
  static getRecipes = async (ingredients) => {
    const apiKey = `&apiKey=${process.env.REACT_APP_SPOONACULAR_KEY}`;
    const baseUrl = "https://api.spoonacular.com/recipes/";
    const requestParams =
      "findByIngredients?number=10&limitLicense=true&ranking=1&ignorePantry=false";
    const ingredientsParams = `&ingredients=${[ingredients]}`;
    const urlToFetch = `${baseUrl}${requestParams}${ingredientsParams}${apiKey}`;

    try {
      const response = await fetch(urlToFetch);

      if (response.ok) {
        const recipes = await response.json();
        return recipes;
      } else {
        console.log("Error: " + response);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  };

  /**
   * Get all users
   **/
  //unrelated to form
  static async loginUser(loginObj) {
    //USE THE SAME URL than in app.js server side
    return await this._doFetch("/login", "POST", loginObj);
  }

  /**
   * Get all users
   **/

  static async getUsers() {
    return await this._doFetch("/users");
  }

  /**
   * Get data for user with ID 'userId'
   **/

  static async getUser(userId) {
    return await this._doFetch(`/users/${userId}`);
  }

  /**
   * General purpose GET (for URLs like /members-only)
   **/

  static async getContent(url) {
    return await this._doFetch(url);
  }

  /**
   * Private method for internal use only
   **/

  static async _doFetch(url, method = "GET", body = null) {
    // Prepare fetch() options
    let options = {
      method,
      headers: {},
    };

    // Add token to headers if it exists in localStorage
    let token = Local.getToken();
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }

    // Add the body if one is supplied
    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    // Do the fetch() and store the results in a "unified" myresponse obj
    //this is to allow all the fetch for post, put, get, etc. Without this, we wouldn't be able to use fetch get or post etc
    let myresponse = { ok: false, data: null, status: 0, error: "" };
    try {
      let response = await fetch(url, options);
      if (response.ok) {
        myresponse.ok = true;
        myresponse.data = await response.json();
        myresponse.status = response.status;
      } else {
        myresponse.status = response.status;
        myresponse.error = response.statusText;
      }
    } catch (err) {
      myresponse.error = err.message;
    }

    return myresponse;
  }
}

//GET STEPS FOR RECIPE
export async function getSteps(recipeId) {
  const apiKey = `?apiKey=${process.env.REACT_APP_SPOONACULAR_KEY}`;
  const url = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions${apiKey}`;

  try {
    let response = await fetch(url);
    if (response.ok) {
      let recipeInstructions = await response.json();
      console.log(recipeInstructions);
      return recipeInstructions;
    } else {
      console.log("Server error: ", response);
    }
  } catch (err) {
    console.log(`Network error: ${err.message}`);
  }
}
