const fetchWordFromAPI = async () : Promise<string> => {
  const response = await fetch('https://random-word-api.herokuapp.com/word?number=1&length=5');
  const data = await response.json();
  return data[0];
}

export default fetchWordFromAPI;