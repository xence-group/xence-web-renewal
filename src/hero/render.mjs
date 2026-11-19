import {chromium} from '/opt/node-tools/node_modules/playwright/index.mjs';
import {spawn} from 'child_process';
const [w,h,out]=process.argv.slice(2);const FPS=30,DUR=24;
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1243/chrome-linux64/chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:+w,height:+h}});
await p.goto(`http://localhost:8765/scene.html?w=${w}&h=${h}`);
await p.waitForFunction('window.ready',null,{timeout:120000});await p.evaluate(()=>document.fonts.ready);
const ff=spawn('ffmpeg',['-y','-f','image2pipe','-framerate',''+FPS,'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','21','-pix_fmt','yuv420p','-movflags','+faststart',out],{stdio:['pipe','ignore','inherit']});
for(let f=0;f<FPS*DUR;f++){await p.evaluate(t=>window.renderAt(t),f/FPS);const buf=await p.screenshot({type:'jpeg',quality:94});ff.stdin.write(buf);if(f%60==0)console.log(out,f);}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('DONE',out);
