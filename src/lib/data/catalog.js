import productRows from '$lib/data/products.json';

function normaliseProduct(row) {
  return {
    ...row,
    cat: row.category,
    match: row.availableFormats?.includes('couple') || false,
    image: row.image || null,
    sourceLink: row.sourceLink || null
  };
}

export const ALL_PRODUCTS = productRows.map(normaliseProduct);
export const WOMEN_PRODUCTS = ALL_PRODUCTS.filter((product) => product.collection === 'women');
export const MEN_PRODUCTS = ALL_PRODUCTS.filter((product) => product.collection === 'men');
export const COUPLE_PRODUCTS = ALL_PRODUCTS.filter((product) => product.collection === 'couples');
