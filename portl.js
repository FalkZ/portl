import {
  serve,
  ServerRequestBody
} from "https://deno.land/std@v0.30.0/http/server.ts";
import { readFileStrSync } from "https://deno.land/std@v0.30.0/fs/read_file_str.ts";

import { ws } from "./server.ts";

const isIterable = (object) =>
  object != null && typeof object[Symbol.iterator] === "function";
