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

export const makeCode = (consultantId, consultantName) => {
  const cdnUrl = 'https://cdn.jsdelivr.net';
  const github = 'gh/thms200/peer-bot/dist';

  return `
    <!-- start -->


    <body>
      <div class="consultant-id" id="${consultantId}"></div>
      <div class="consultant-name" id="${consultantName}"></div>
      <script src="${cdnUrl}/${github}/peer_0.9.js"></script>   
    </body>


    <!-- End -->
  `;
};
