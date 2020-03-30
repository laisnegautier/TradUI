const rootEndpoint = objectif => `http://projet-dev-mobile-laisnejouault.000webhostapp.com/${objectif}`;

export const getQuestions = () =>
  fetch(rootEndpoint("queryQuestions.php"),
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    }
  )
    .then(response => response.json())
    .catch(function (error) {
      console.log('Un problème est survenu lors de l\'accès aux questions : ' + error.message);
      throw error;
    });
