"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/libai.ts
var libai_exports = {};
__export(libai_exports, {
  default: () => libai_default
});
module.exports = __toCommonJS(libai_exports);

// node_modules/uuid/dist/esm/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

// node_modules/uuid/dist/esm/rng.js
var import_crypto = require("crypto");
var rnds8Pool = new Uint8Array(256);
var poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    (0, import_crypto.randomFillSync)(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

// node_modules/uuid/dist/esm/v7.js
var _state = {};
function v7(options, buf, offset) {
  let bytes;
  if (options) {
    bytes = v7Bytes(options.random ?? options.rng?.() ?? rng(), options.msecs, options.seq, buf, offset);
  } else {
    const now = Date.now();
    const rnds = rng();
    updateV7State(_state, now, rnds);
    bytes = v7Bytes(rnds, _state.msecs, _state.seq, buf, offset);
  }
  return buf ?? unsafeStringify(bytes);
}
function updateV7State(state, now, rnds) {
  state.msecs ??= -Infinity;
  state.seq ??= 0;
  if (now > state.msecs) {
    state.seq = rnds[6] << 23 | rnds[7] << 16 | rnds[8] << 8 | rnds[9];
    state.msecs = now;
  } else {
    state.seq = state.seq + 1 | 0;
    if (state.seq === 0) {
      state.msecs++;
    }
  }
  return state;
}
function v7Bytes(rnds, msecs, seq, buf, offset = 0) {
  if (rnds.length < 16) {
    throw new Error("Random bytes length must be >= 16");
  }
  if (!buf) {
    buf = new Uint8Array(16);
    offset = 0;
  } else {
    if (offset < 0 || offset + 16 > buf.length) {
      throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
    }
  }
  msecs ??= Date.now();
  seq ??= rnds[6] * 127 << 24 | rnds[7] << 16 | rnds[8] << 8 | rnds[9];
  buf[offset++] = msecs / 1099511627776 & 255;
  buf[offset++] = msecs / 4294967296 & 255;
  buf[offset++] = msecs / 16777216 & 255;
  buf[offset++] = msecs / 65536 & 255;
  buf[offset++] = msecs / 256 & 255;
  buf[offset++] = msecs & 255;
  buf[offset++] = 112 | seq >>> 28 & 15;
  buf[offset++] = seq >>> 20 & 255;
  buf[offset++] = 128 | seq >>> 14 & 63;
  buf[offset++] = seq >>> 6 & 255;
  buf[offset++] = seq << 2 & 255 | rnds[10] & 3;
  buf[offset++] = rnds[11];
  buf[offset++] = rnds[12];
  buf[offset++] = rnds[13];
  buf[offset++] = rnds[14];
  buf[offset++] = rnds[15];
  return buf;
}
var v7_default = v7;

// src/utils/generateAuthToken.ts
var generateAuthToken = async () => {
  try {
    const req = await fetch("https://saas.castbox.fm/auth/api/v1/tokens/provider/secret", {
      headers: {
        "x-app-id": "ai-seek",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        secret: v7_default()
      }),
      method: "POST"
    });
    const res = await req.json();
    return res.data.token;
  } catch (error) {
    console.error(error);
    return null;
  }
};
var generateAuthToken_default = generateAuthToken;

// node_modules/fetch-event-stream/esm/deps/jsr.io/@std/streams/0.221.0/text_line_stream.js
var TextLineStream = class extends TransformStream {
  #currentLine = "";
  /** Constructs a new instance. */
  constructor(options = { allowCR: false }) {
    super({
      transform: (chars, controller) => {
        chars = this.#currentLine + chars;
        while (true) {
          const lfIndex = chars.indexOf("\n");
          const crIndex = options.allowCR ? chars.indexOf("\r") : -1;
          if (crIndex !== -1 && crIndex !== chars.length - 1 && (lfIndex === -1 || lfIndex - 1 > crIndex)) {
            controller.enqueue(chars.slice(0, crIndex));
            chars = chars.slice(crIndex + 1);
            continue;
          }
          if (lfIndex === -1)
            break;
          const endIndex = chars[lfIndex - 1] === "\r" ? lfIndex - 1 : lfIndex;
          controller.enqueue(chars.slice(0, endIndex));
          chars = chars.slice(lfIndex + 1);
        }
        this.#currentLine = chars;
      },
      flush: (controller) => {
        if (this.#currentLine === "")
          return;
        const currentLine = options.allowCR && this.#currentLine.endsWith("\r") ? this.#currentLine.slice(0, -1) : this.#currentLine;
        controller.enqueue(currentLine);
      }
    });
  }
};

// node_modules/fetch-event-stream/esm/utils.js
function stream(input) {
  let decoder = new TextDecoderStream();
  let split2 = new TextLineStream({ allowCR: true });
  return input.pipeThrough(decoder).pipeThrough(split2);
}
function split(input) {
  let rgx = /[:]\s*/;
  let match = rgx.exec(input);
  let idx = match && match.index;
  if (idx) {
    return [
      input.substring(0, idx),
      input.substring(idx + match[0].length)
    ];
  }
}
function fallback(headers, key, value) {
  let tmp = headers.get(key);
  if (!tmp)
    headers.set(key, value);
}

// node_modules/fetch-event-stream/esm/mod.js
async function* events(res, signal) {
  if (!res.body)
    return;
  let iter = stream(res.body);
  let line, reader = iter.getReader();
  let event;
  for (; ; ) {
    if (signal && signal.aborted) {
      return reader.cancel();
    }
    line = await reader.read();
    if (line.done)
      return;
    if (!line.value) {
      if (event)
        yield event;
      event = void 0;
      continue;
    }
    let [field, value] = split(line.value) || [];
    if (!field)
      continue;
    if (field === "data") {
      event ||= {};
      event[field] = event[field] ? event[field] + "\n" + value : value;
    } else if (field === "event") {
      event ||= {};
      event[field] = value;
    } else if (field === "id") {
      event ||= {};
      event[field] = +value || value;
    } else if (field === "retry") {
      event ||= {};
      event[field] = +value || void 0;
    }
  }
}
async function stream2(input, init) {
  let req = new Request(input, init);
  fallback(req.headers, "Accept", "text/event-stream");
  fallback(req.headers, "Content-Type", "application/json");
  let r = await fetch(req);
  if (!r.ok)
    throw r;
  return events(r, req.signal);
}

// src/utils/getChatResponse.ts
var getChatResponse = async (message, authToken, model, webSearch, session, onStream) => {
  try {
    const events3 = await stream2("https://ai-seek.thebetter.ai/v3/chat/send", {
      headers: {
        "X-App-Id": "ai-seek",
        "X-Access-Token": authToken,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        sessionId: session ?? v7_default(),
        model: model ?? "deepseek/deepseek-r1",
        text: message,
        restrictedType: "PRO_USER",
        imageS3Keys: null,
        fileS3Keys: null,
        webSearch
      }),
      method: "POST"
    });
    let finalResponse;
    for await (let event of events3) {
      try {
        const data = JSON.parse(event.data);
        if (onStream) {
          onStream(data);
        }
        finalResponse += data.content;
      } catch (error) {
      }
    }
    return finalResponse;
  } catch (error) {
    return null;
  }
};
var getChatResponse_default = getChatResponse;

// src/utils/getModels.ts
var getModels = async () => {
  try {
    const req = await fetch("https://ai-seek.thebetter.ai/v1/chat/list_models", {
      headers: {
        "X-App-Id": "ai-seek"
      }
    });
    const res = await req.json();
    return res.data.models;
  } catch (error) {
    return null;
  }
};
var getModels_default = getModels;

// src/libai.ts
var AI = {
  generateAuthToken: generateAuthToken_default,
  getChatResponse: getChatResponse_default,
  getModels: getModels_default
};
var libai_default = AI;
