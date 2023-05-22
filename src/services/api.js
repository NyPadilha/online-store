const URL_CAT = 'https://api.mercadolibre.com/sites/MLB/categories';
const URL_QUERY = 'https://api.mercadolibre.com/sites/MLB/search?q=$QUERY';

export async function getCategories() {
  // Implemente aqui
  const response = await fetch(URL_CAT);
  const data = response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(/* categoryId, query */) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const response = await fetch(URL_QUERY);
  const data = response.json();
  return data;
}
