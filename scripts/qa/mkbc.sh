#!/bin/bash
# Builds a font-stubbed COPY of the project in /home/claude/bc for local testing (sandbox cannot reach Google Fonts).
# The real project's layout.tsx is never modified.
P=/home/claude/proj/nextjs-site
cd /home/claude && rm -rf bc && mkdir bc && (cd $P && tar cf - --exclude=node_modules --exclude=.next .) | (cd bc && tar xf -) && ln -s $P/node_modules bc/node_modules
sed -i 's|import { Montserrat, Inter } from "next/font/google";|const Montserrat:any=()=>({variable:""}); const Inter:any=()=>({variable:""});|' bc/app/layout.tsx
cd bc && npm run build 2>&1 | tee /tmp/build.log | grep -E "rror|Failed|Generating static pages \(" | tail -2
