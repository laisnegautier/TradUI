import paysLangues from "./../data/iso_639-2.json";

const Format = {
  // We get rid of multiple white spaces in the sentence and at both ends of the string
  // The formatted text is either empty or with well formatted string (a single space is not possible for example)
  getFormattedText: t => {
    if (t !== "" && t !== " ") t = t.replace(/\s+/g, " ").trim();
    return t;
  },
  getCountry: codeIso => {
    var getLanguagesByIsoCode = code =>
      paysLangues.filter(
        x => x.Alpha2_Code === code && x.French_Name !== null
      )[0];
    var langueTrouvee = getLanguagesByIsoCode(codeIso);

    // on met en majuscule la premiere lettre
    return langueTrouvee !== undefined
      ? ((langueTrouvee.French_Name.charAt(0).toUpperCase() +
        langueTrouvee.French_Name.slice(1)).split(";", 1))[0]
      : codeIso;
  }
};

export default Format;
