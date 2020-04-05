const rootEndpoint = objectif =>
  `http://projet-dev-mobile-laisnejouault.000webhostapp.com/${objectif}`;

export const getQuestions = () =>
  fetch(rootEndpoint("queryQuestions.php"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
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

export const addQuestion = data =>
  fetch(rootEndpoint("addQuestion.php"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
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
  });
