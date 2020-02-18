
import GLOBALS from "./../Globals";

const rootEndpoint = (objectif) => `https://api.eu-gb.language-translator.watson.cloud.ibm.com/instances/${GLOBALS.WATSON_LANGUAGETRANSLATOR_CREDENTIALS}/v3/${objectif}?version=2018-05-01`;

export const getDetectionLangue = (texte) =>
    fetch(rootEndpoint("identify"),
        {
            body: texte,
            headers: {
                Authorization:
                    "Basic YXBpa2V5OlhOVE1qVEZvam4tNmw1b2dLaWo2OEtiMkcxOGo3QTFFejJrT3lYakZTV3Nh",
                "Content-Type": "text/plain"
            },
            method: "POST"
        }
    )
        .then(response => response.json())
        .then(jsonResponse => jsonResponse.languages[0].language);

export const getTraduction = (texte, langageDetecte, langageDeTraduction) =>
    fetch(rootEndpoint("translate"),
        {
            body: JSON.stringify({
                text: texte,
                model_id: langageDetecte + "-" + langageDeTraduction
            }),
            headers: {
                Authorization:
                    "Basic YXBpa2V5OlhOVE1qVEZvam4tNmw1b2dLaWo2OEtiMkcxOGo3QTFFejJrT3lYakZTV3Nh",
                "Content-Type": "application/json"
            },
            method: "POST"
        }
    )
        .then(response => response.json())
        .then(responseJson => responseJson.translations[0].translation);
