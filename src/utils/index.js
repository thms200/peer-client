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
  const mainHashChuck = `${github}/main.67389550.chunk.js`;
  const mainStyleHaschChuck = `${github}/main.99441111.chunk.css`;
  const numberHashChuck = `${github}/2.bd7b69aa.chunk.js`;
  const runtimeMainHash = `${github}/runtime-main.21811c53.js`;

  return `
  <head> tag 안의 1줄(link tag), <scirpt> tag 안의 3줄(div tag, script tag)을 입력하세요!
  
  <!-- start -->

  <head>
    <link rel="stylesheet" type="text/css" href="${cdnUrl}/${mainStyleHaschChuck}" />
  </head>
  <script>
    <div class="consultant-id" id="${consultantId}"></div>
    <div class="consultant-name" id="${consultantName}"></div>
    <script src="${cdnUrl}/combine/${github}/peer.js,${mainHashChuck},${numberHashChuck},${runtimeMainHash}"></script>
  </script>

  <!-- End -->
  `;
};
