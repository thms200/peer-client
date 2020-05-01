export const getHistoryCustomers = (consultings) => {
  const check = {};
  const result = [];
  consultings.sort((a, b) => a.timestamp - b.timestamp);
  consultings.forEach((consulting, index) => {
    if (!check[consulting.name]) {
      check[consulting.name] = 1;
      const consultingInfo = {
        nickname: consulting.name,
        id: `${index}_${consulting.name}`,
      };
      result.push(consultingInfo);
    };
  });
  return result;
};
