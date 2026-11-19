import {chromium} from '/opt/node-tools/node_modules/playwright/index.mjs';
import fs from 'fs';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1243/chrome-linux64/chrome'});
for (const [u,out] of [['/','ja'],['/en/','en']]){
const p=await b.newPage({viewport:{width:1440,height:900}});
await p.route(/\.(mp4|jpg|png)$/,r=>r.abort());
await p.goto('http://localhost:8790'+u,{waitUntil:'domcontentloaded'});await p.waitForTimeout(5000);
const o=await p.evaluate(()=>{const keep=new Set(['H1','H2','H3','P','FIGCAPTION','LI','A','BUTTON','SPAN','LABEL']);
 const secs=[...document.querySelectorAll('#app section, #app header, #app footer')];
 return secs.map(s=>({id:s.id||s.tagName, items:[...s.querySelectorAll('h1,h2,h3,p,figcaption,a[href],img[alt],button[role=tab] span span:first-child')].map(e=>({t:e.tagName,txt:(e.tagName==='IMG'?e.alt:e.innerText).replace(/\s+/g,' ').trim(),href:e.getAttribute('href')||''})).filter(x=>x.txt)}));});
fs.writeFileSync(`/home/claude/outline_${out}.json`,JSON.stringify(o,null,1));
console.log(out,o.map(s=>s.id+':'+s.items.length).join(' '));
await p.close();}
await b.close();
