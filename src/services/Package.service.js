const BASE_URL = 'http://localhost:3000/packages?';

const getPackage = async (id) => {
  const response = await fetch(`${URL}/${id}`);
  const packageData = await response.json();
  return packageData;
};

const getPackages = async (total_lte = null, duration_lte = null) => {
  let url = BASE_URL;

  if (total_lte) {
    url = url + `&total_lte=${total_lte}`;
  }

  if (duration_lte) {
    url = url + `&duration_lte=${duration_lte}`;
  }

  console.log(url);
  const response = await fetch(url);
  const packagesData = await response.json();
  return packagesData;
};

export const PackageService = {
  getPackage,
  getPackages,
};

// http://localhost:3000/packages?total_lte={insertar_valor_variable_aqui}
