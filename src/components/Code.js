import React from 'react';
import PropTypes from 'prop-types';

export default function Code({ consultantId, consultantName }) {
  const cdnUrl = 'https://cdn.jsdelivr.net/gh/thms200/peer-bot/dist';
  const install = `
  <head> tag 안의 1줄(link tag), <scirpt> tag 안의 6줄(div tag, script tag)을 입력하세요!

  <!-- start -->
  <head>
    <link rel="stylesheet" type="text/css" href="${cdnUrl}/main.99441111.chunk.css">
  </head>
  <script>
    <div class="consultant-id" id="${consultantId}"></div>
    <div class="consultant-name" id="${consultantName}"></div>
    <script src="${cdnUrl}/peer.js"></script>
    <script src="${cdnUrl}/2.d592cf78.chunk.js"></script>
    <script src="${cdnUrl}/main.bcbc0849.chunk.js"></script>
    <script src="${cdnUrl}/runtime-main.21811c53.js"></script>
  </script>
  <!-- End -->

  `;

  return (
    <pre>{install}</pre>
  );
}

Code.prototype = {
  consultantId: PropTypes.string.isRequired,
  consultantName: PropTypes.string.isRequired,
};
