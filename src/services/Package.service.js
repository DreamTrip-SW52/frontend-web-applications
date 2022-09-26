const URL = 'http://localhost:3000/packages';

const getPackage = async (id) => {
  const response = await fetch(`${URL}/${id}`);
  const packageData = await response.json();
  return packageData;
};

export const PackageService = {
  getPackage,
};
