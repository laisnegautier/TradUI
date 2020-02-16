import GLOBALS from "../Globals";

const headers = {
  "Content-Type": "application/json",
  apikey: "aWhdLNtyT3lI2WtKuLNJD6gTNR2ay24lWc4qLEDY5xXp"
};

// const headers = {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// };

const url_dql = `${GLOBALS.WATSON_TEXTTOSPEECH_URL}/v1/synthesize?accept=audio%2Fwav&text=hola%20mundo&voice=es-ES_EnriqueVoice`;

// const url_dql =
// "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";

export const testTextToSpeech = input => {
  let result = fetch("https://api.eu-gb.text-to-speech.watson.cloud.ibm.com/instances/5af19a2d-37d5-4dee-9a76-0728a063f646/v1/voices", {
    headers: {
      Authorization: "Basic YXBpa2V5OmFXaGRMTnR5VDNsSTJXdEt1TE5KRDZnVE5SMmF5MjRsV2M0cUxFRFk1eFhw"
    }
  })
    .then(response => response.json())
    .then(jsonResponse => console.log(jsonResponse));

  console.log(result);
  return result;
};


export const testVisualRecognition = input => {
  let result = fetch(
    "https://api.us-south.visual-recognition.watson.cloud.ibm.com/instances/2d5af501-5ff3-48d2-a2de-d50d43f7e7df/v3/classify?url=https://watson-developer-cloud.github.io/doc-tutorial-downloads/visual-recognition/fruitbowl.jpg&version=2018-03-19",
    {
      headers: {
        Authorization:
          "Basic YXBpa2V5OlI0dDg1azQzTDlJb0xTeHpCRTZ1V3ZCVUx6bkxYSUV1RU1pLTV5Z1lVSk1i"
      }
    }
  )
    .then(response => response.json())
    .then(jsonResponse => console.log(jsonResponse));

  console.log(result);
  return result;
};
