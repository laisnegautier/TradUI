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

export const getTextToSpeech = input => {
  // use TextToSpeech Query Language

  // https://gateway.watsonplatform.net/discovery/api/v1/environments/system/collections/news-en/query?version=2018-08-01&aggregation=filter%28enriched_title.entities.type%3A%3ACompany%29.term%28enriched_title.entities.text%29.timeslice%28crawl_date%2C1day%29.term%28enriched_text.sentiment.document.label%29&filter=IBM&highlight=true&passages.count=5&query=${keyword}`;

  let result = fetch(url_dql, { headers })
    .then(response => response.json())
    .then(jsonResponse => console.log(jsonResponse));

  console.log(result);
  console.log("dfg");
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
