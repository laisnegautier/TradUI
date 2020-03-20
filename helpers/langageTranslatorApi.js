import GLOBALS from "./../Globals";

const rootEndpoint = objectif =>
    `https://api.eu-gb.language-translator.watson.cloud.ibm.com/instances/${GLOBALS.WATSON_LANGUAGETRANSLATOR_CREDENTIALS}/v3/${objectif}?version=2018-05-01`;

export const getDetectionLangue = texte =>
    fetch(rootEndpoint("identify"), {
        body: texte,
        headers: {
            Authorization:
                "Basic YXBpa2V5OlhOVE1qVEZvam4tNmw1b2dLaWo2OEtiMkcxOGo3QTFFejJrT3lYakZTV3Nh",
            "Content-Type": "text/plain"
        },
        method: "POST"
    })
        .then(response => response.json())
        .catch(error => {
            console.log('Un problème est survenu lors de la détection de la langue : ' + error.message);
            throw error;
        });

export const getTraduction = (texte, langageDetecte, langageDeTraduction) =>
    fetch(rootEndpoint("translate"), {
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
    })
        .then(response => response.json())
        .catch(error => {
            console.log('Un problème est survenu lors de la traduction : ' + error.message);
            throw error;
        });
