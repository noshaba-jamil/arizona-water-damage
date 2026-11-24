#!/bin/bash
# starts the test build on :4050, runs the crawler + browser audit, stops the server (and any stale one first)
pkill -f "[n]ext-server" 2>/dev/null; pkill -f "[n]ext start" 2>/dev/null; sleep 1
( cd /home/claude/bc && node_modules/.bin/next start -p 4050 > /tmp/seo-srv.log 2>&1 ) & S=$!
for i in $(seq 1 25); do curl -s -o /dev/null localhost:4050/ && break; sleep 1; done
D=/home/claude/proj/nextjs-site/scripts/qa
node $D/collect.mjs && python3 $D/browser-audit.py http://localhost:4050
kill $S 2>/dev/null; pkill -f "[n]ext-server" 2>/dev/null; wait 2>/dev/null
