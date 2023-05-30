function sumValues(items) {
  let total = 0;
  items.forEach((e) => {
    total += e.details.reduce((a, b) => a + parseInt(b.value, 10), 0);
  });
  return total;
}

export const handler = async (event) => {
  const { method } = event?.requestContext?.http || {};
  let result = { success: false };
  if (method === "POST") {
    const { amounts } = JSON.parse(event?.body);
    const totalAssets = sumValues(amounts.assets);
    const totalLiabilities = sumValues(amounts.liabilities);
    result = {
      totalAssets,
      totalLiabilities,
      total: totalAssets - totalLiabilities,
      success: true,
    };
  }
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify({ result }),
  };
  return response;
};
