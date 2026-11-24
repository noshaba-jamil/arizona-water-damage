#!/bin/bash
# starts a mock mail provider + the test build (with email configured to the mock), runs regress.py, stops everything
pkill -f "[n]ext-server" 2>/dev/null; pkill -f "[m]ock-resend" 2>/dev/null; sleep 1
node /home/claude/proj/nextjs-site/scripts/qa/mock-resend.mjs > /tmp/mock.log 2>&1 & M=$!
( cd /home/claude/bc && RESEND_API_KEY=k CONTACT_FROM_EMAIL='Leads <l@waterdamagerestoration-arizona.com>' CONTACT_TO_EMAIL=o@example.com RESEND_API_URL=http://localhost:4010/emails node_modules/.bin/next start -p 4020 > /tmp/a.log 2>&1 ) & S=$!
for i in $(seq 1 25); do curl -s -o /dev/null localhost:4020/ && curl -s localhost:4010/__log >/dev/null && break; sleep 1; done
python3 /home/claude/proj/nextjs-site/scripts/qa/regress.py http://localhost:4020 ${1:-all}
kill $S $M 2>/dev/null; pkill -f "[n]ext-server" 2>/dev/null; wait 2>/dev/null
