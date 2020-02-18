import { ws } from "./ws.js";

const toServe = await import(Deno.args[0]);
console.log("serving: ", Deno.args[0]);

const doneStore = [];

const portl = ({ send, received }) => {
  const { fn, args, id, once, done } = received;
  doneStore[id] = done;
  if (!done) {
    const f = toServe[fn];
    if (f === undefined) {
      send({ fn, error: "is not implemented", id, once });
    } else {
      const it = f(...args);
      const sendNext = () =>
        Promise.resolve(it.next()).then(async ({ value, done }) => {
          if (!done && !doneStore[id]) {
            await send({ fn, ret: value, id, once });
            if (!once) sendNext();
          } else {
            await send({ fn, done: true, id, once });
          }
        });

      if (
        ["AsyncGeneratorFunction", "GeneratorFunction"].includes(
          f.constructor.name
        )
      ) {
        sendNext();
      } else {
        send({ fn, ret: it, id, once: true });
      }
    }
  }
};

ws(portl);
