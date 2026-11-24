import http from 'node:http';
let mode = 'ok'; const log = [];
http.createServer((req, res) => { let b = ''; req.on('data', (c) => (b += c)); req.on('end', () => {
  if (req.url.startsWith('/__mode')) { mode = new URL(req.url, 'http://x').searchParams.get('m'); return res.end('ok'); }
  if (req.url === '/__log') return res.end(JSON.stringify(log));
  if (req.url === '/emails') { if (mode === 'fail') { res.statusCode = 500; return res.end('{}'); } log.push(JSON.parse(b)); return res.end('{"id":"m"}'); }
  res.statusCode = 404; res.end(); }); }).listen(4010);
