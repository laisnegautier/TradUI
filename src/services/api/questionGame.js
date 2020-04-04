const rootEndpoint = objectif =>
  `http://projet-dev-mobile-laisnejouault.000webhostapp.com/${objectif}`;

export const getQuestions = () =>
  fetch(rootEndpoint("queryQuestions.php"), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST"
  })
    .then(response => response.json())
    .catch(function (error) {
      console.log(
        "Un problème est survenu lors de l'accès aux questions : " +
        error.message
      );
      throw error;
    });

export const addQuestion = data =>
  fetch(rootEndpoint("addQuestion.php"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(function (error) {
      console.log(
        "Un problème est survenu lors de l'ajout d'une question : " +
        error.message
      );
      throw error;
    });

export const getLanguages = questionId =>
  fetch(rootEndpoint("queryLanguages.php?id=" + questionId), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });

export const getTranslations = questionId =>
  fetch(rootEndpoint("queryTranslations.php?id=" + questionId), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });

export const addLanguage = (input, questionId) =>
  fetch(rootEndpoint("createLanguage.php"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      input: input,
      questionId: questionId
    })
  })
    .then(response => response.json())
    .catch(function (error) {
      console.log(
        "Un problème est survenu lors de l'ajout d'une réponse : " +
        error.message
      );
      throw error;
    });

export const addTranslation = (input, questionId) =>
  fetch(rootEndpoint("createTranslation.php"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      input: input,
      questionId: questionId
    })
  })
    .then(response => response.json())
    .catch(function (error) {
      console.log(
        "Un problème est survenu lors de l'ajout d'une réponse : " +
        error.message
      );
      throw error;
    });
