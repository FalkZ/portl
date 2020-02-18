import { ws } from "./server.ts";
const toServe = await import("./serve.js");

console.log(toServe);

const doneStore = [];

export const caller = ({ sock, data }) => {
  const { fn, args, id, once, done } = JSON.parse(data);
  doneStore[id] = done;
  if (!done) {
    const it = toServe[fn](...args);
    const send = () =>
      Promise.resolve(it.next()).then(async ({ value, done }) => {
        if (!done && !doneStore[id]) {
          await sock.send(JSON.stringify({ fn, ret: value, id, once }));
          if (!once) send();
        } else {
          await sock.send(JSON.stringify({ fn, done: true, id, once }));
        }
      });
    send();
  }
};

ws(caller);
