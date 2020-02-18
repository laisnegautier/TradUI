export const getInformationImage = input => {
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
