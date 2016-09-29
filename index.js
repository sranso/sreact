const rootNode = document.createElement('div');
rootNode.innerHTML = 'original DOM';
rootNode.setAttribute('style', 'margin: 20px; font-size; 14px;');


const app = document.getElementById('app');
app.innerHTML = '';
app.appendChild(rootNode);
