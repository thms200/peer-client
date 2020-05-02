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
  const cdnUrl = 'https://cdn.jsdelivr.net/combine';
  const github = 'gh/thms200/peer-bot/dist';
  return `
  <head> tag 안의 1줄(link tag), <scirpt> tag 안의 3줄(div tag, script tag)을 입력하세요!
  
  <!-- start -->

  <head>
    <link rel="stylesheet" type="text/css" href="${cdnUrl}/main.99441111.chunk.css"/>
  </head>
  <script>
    <div class="consultant-id" id="${consultantId}"></div>
    <div class="consultant-name" id="${consultantName}"></div>
    <script src="${cdnUrl}/${github}/peer.js,${github}/2.d592cf78.chunk.js,${github}/main.bcbc0849.chunk.js,${github}/runtime-main.21811c53.js"></script>
  </script>

  <!-- End -->
  `;
};
