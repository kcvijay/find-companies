export const getDataFromName = async (
  name: string,
  resultsFrom: number = 0
) => {
  try {
    const response = await fetch(
      `https://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=10&resultsFrom=${resultsFrom}&name=${name}&companyRegistrationFrom=2014-02-28`
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getDataFromBusinessId = async (
  businessId: string,
  resultsFrom: number = 0
) => {
  try {
    const response = await fetch(
      `https://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=10&resultsFrom=${resultsFrom}&businessId=${businessId}&companyRegistrationFrom=2014-02-28`
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
