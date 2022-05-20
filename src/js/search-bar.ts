/* Implement Search-bar search functionality */
const parseHTMLString = (() => {
  const parser = new DOMParser();
  return str => parser.parseFromString(str, "text/html");
})();

const getSearchStringForDoc = doc => {
  return [
    doc.title,
    doc.body.innerText
  ].map(str => str.trim())
    .join(" ");
};

const stringMatchesQuery = (str, query) => {
  str = str.toLowerCase();
  query = query.toLowerCase();

  return query
    .split(/\W+/)
    .some(q => str.includes(q))
};

const htmlStringMatchesQuery = (str, query) => {
  const htmlDoc = parseHTMLString(str);
  const htmlSearchString = getSearchStringForDoc(htmlDoc);

  return stringMatchesQuery(htmlSearchString, query);
};
