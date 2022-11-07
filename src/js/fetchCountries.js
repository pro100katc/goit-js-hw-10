export default function fetchCountry(name) {
  if (name) {
    const url = `https://restcountries.com/v2/name/${name}?fields=name,population,flag,languages,capital`;
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      return response.json();
    });
  }
}
