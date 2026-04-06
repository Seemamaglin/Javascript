let page = 0;
const content = document.getElementById('content');

async function getInfo() {
  await new Promise(resolve => setTimeout(resolve, 500)); 
  for (let i = 0; i < 10; i++) {
    const div = document.createElement('div');
    div.className = 'sub-div';
    div.innerHTML = `Item ${page * 10 + i + 1}`;
    content.appendChild(div);
  }
  page++;
}

window.addEventListener("scroll",()=>{
  if (
    document.documentElement.scrollTop+
    document.documentElement.clientHeight>=
    document.documentElement.scrollHeight
  ) {
    getInfo();
  }
});
getInfo();
