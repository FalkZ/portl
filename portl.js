import {
  serve,
  ServerRequestBody
} from "https://deno.land/std@v0.30.0/http/server.ts";
import { readFileStrSync } from "https://deno.land/std@v0.30.0/fs/read_file_str.ts";

import { ws } from "./server.ts";

const isIterable = (object) =>
  object != null && typeof object[Symbol.iterator] === "function";

const toServe = await import("./serve.js");

console.log(toServe);

ws(({ fn, args }) => {
  return toServe[fn](...args);
});

const readBody = async (req) => {
  const buf = new Uint8Array(req.contentLength);
  let bufSlice = buf;
  let totRead = 0;
  while (true) {
    const nread = await req.body.read(bufSlice);
    if (nread === Deno.EOF) break;
    totRead += nread;
    if (totRead >= req.contentLength) break;
    bufSlice = bufSlice.subarray(nread);
  }

  var enc = new TextDecoder("utf-8");
  const b = enc.decode(buf);

  return JSON.parse(b);
};

const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
  if (req.url === "/test") {
    req.respond({
      header: "Content-Type: text/html",
      body: readFileStrSync("./index.html")
    });
  } else {
    const str = req.url.substring(1);
    if (req.method === "POST") {
      if (toServe[str]) {
        try {
          const ret = toServe[str](...(await readBody(req)));

          if (toServe[str].constructor.name === "AsyncGeneratorFunction") {
            var enc = new TextEncoder("utf-8");

            req.respond({
              header: "Content-Type: application/json",
              body: ret
            });
          }
        } catch (error) {
          console.error(error.message);
          req.respond({
            status: 500,
            body: error.message
          });
        }
      } else {
        req.respond({
          status: 501
        });
      }
    }
  }
}
