import jsonp from "jsonp";

type ApiResult = {
  status: number;
  results: {
    address1: string;
    address2: string;
    address3: string;
  }[];
};

const ENDPOINT = "https://zipcloud.ibsnet.co.jp/api/search";

async function postalApi(postalCode: string) {
  const url = `${ENDPOINT}?zipcode=${postalCode}`;

  return new Promise<ApiResult>((resolve, reject) => {
    setTimeout(() => {
      jsonp(url, {}, (err, data) => {
        if (err) reject(err);
        resolve(data as ApiResult);
      });
    }, 2000);
  });
}

export const fetch = async (postalCode: string): Promise<string[]> => {
  if (!postalCode.match(/(^[0-9]{3}[0-9]{4}$)|(^[0-9]{3}-[0-9]{4}$)/)) {
    return [];
  }

  const data = await postalApi(postalCode);
  if (data.status !== 200 || !data.results) {
    return [];
  }

  return data.results.map(
    (result) => `${result.address1}${result.address2}${result.address3}`
  );
};
