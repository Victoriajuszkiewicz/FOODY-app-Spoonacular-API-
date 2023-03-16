/**
 * All localStorage implementation is here
 **/

class Local {
  //Save & Get featured recipe data-----------------------------------------------

  static saveFeaturedRecipe(recipe) {
    // Data type would always be strings in the localStorage
    localStorage.setItem("recipe", JSON.stringify(recipe));
  }

  static getFeaturedRecipe() {
    let recipejson = localStorage.getItem("recipe");
    // JSON.parse() is to convert data into object
    return recipejson ? JSON.parse(recipejson) : {};
  }

  //-------------------------------------------------------------------------------
  //Save, Get & Delete Token-------------------------------------------------------

  static saveUserInfo(token, user) {
    //if i wanted to write this in my app i would only use the codeline 9 and 10
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  static removeUserInfo() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  static getToken() {
    return localStorage.getItem("token") || "";
  }

  static getUser() {
    let userjson = localStorage.getItem("user");
    return userjson ? JSON.parse(userjson) : null;
  }

  static getUserId() {
    let userjson = localStorage.getItem("user");
    if (!userjson) {
      return "";
    }

    let user = JSON.parse(userjson);
    return user.id;
  }

  static getUsername() {
    let userjson = localStorage.getItem("user");
    if (!userjson) {
      return "";
    }

    let user = JSON.parse(userjson);
    return user.username;
  }
}

export default Local;
