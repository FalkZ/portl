// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
import { serve } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  WebSocket
} from "https://deno.land/std/ws/mod.ts";

/** websocket echo server */
// const port = Deno.args[1] || "8080";
export const ws = (cb) => {
  console.log(`websocket server is running on :${port}`);
  for await (const req of serve(`:${port}`)) {
    const { headers, conn } = req;
    acceptWebSocket({
      conn,
      headers,
      bufReader: req.r,
      bufWriter: req.w
    })
      .then(
        async (sock: WebSocket): Promise<void> => {
          console.log("socket connected!");
          const it = sock.receive();
          while (true) {
            try {
              const { done, value } = await it.next();
              if (done) {
                break;
              }
              const ev = value;
              if (typeof ev === "string") {
                // text message
                console.log("ws:Text", ev);
                const { fn, args } = JSON.parse(ev);
                const it = cb({ fn, args });
                const send = () =>
                  Promise.resolve(it.next()).then(({ value, done }) => {
                    if (!done) {
                      await sock.send(JSON.stringify({ fn, ret: value }));
                      send();
                    }
                  });
                send();
              } else if (ev instanceof Uint8Array) {
                // binary message
                console.log("ws:Binary", ev);
              } else if (isWebSocketPingEvent(ev)) {
                const [, body] = ev;
                // ping
                console.log("ws:Ping", body);
              } else if (isWebSocketCloseEvent(ev)) {
                // close
                const { code, reason } = ev;
                console.log("ws:Close", code, reason);
              }
            } catch (e) {
              console.error(`failed to receive frame: ${e}`);
              await sock.close(1000).catch(console.error);
            }
          }
        }
      )
      .catch((err: Error): void => {
        console.error(`failed to accept websocket: ${err}`);
      });
  }
};