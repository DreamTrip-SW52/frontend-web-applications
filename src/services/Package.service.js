const URL = 'http://localhost:3000/packages';

const getPackage = async (id) => {
  const response = await fetch(`${URL}/${id}`);
  const packageData = await response.json();
  return packageData;
};

const getPackages = async () => {
  const response = await fetch(URL);
  const packagesData = await response.json();
  return packagesData;
};

export const PackageService = {
  getPackage,
	getPackages,
};
