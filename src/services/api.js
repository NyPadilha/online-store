const URL_CAT = 'https://api.mercadolibre.com/sites/MLB/categories';
const URL_QUERY = 'https://api.mercadolibre.com/sites/MLB/search?q=';
const URL_SEARCH_CAT = 'https://api.mercadolibre.com/sites/MLB/search?category=';

export async function getCategories() {
  // Implemente aqui
  const response = await fetch(URL_CAT);
  const data = response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const TO_FETCH = categoryId ? (URL_SEARCH_CAT + categoryId) : (URL_QUERY + query);

  const response = await fetch(TO_FETCH);
  const data = response.json();
  return data;
}
