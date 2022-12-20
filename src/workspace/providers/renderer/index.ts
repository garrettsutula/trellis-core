import { deflateAsync } from '../../../common/deflate';

const encoder = new TextEncoder();

function encode64(e) {
  let r = "";
  for (let i = 0; i < e.length; i += 3)
      i + 2 == e.length ? r += append3bytes(e[i], e[i + 1], 0) : i + 1 == e.length ? r += append3bytes(e[i], 0, 0) : r += append3bytes(e[i], e[i + 1], e[i + 2]);
  return r
}
function append3bytes(e, n, t) {
  const c1 = e >> 2;
  const c2 = (3 & e) << 4 | n >> 4;
  const c3 = (15 & n) << 2 | t >> 6;
  const c4 = 63 & t;
  let r = ""
  r += encode6bit(63 & c1);
  r += encode6bit(63 & c2);
  r += encode6bit(63 & c3);
  r += encode6bit(63 & c4);
  return r
}
function encode6bit(e) {
  return e < 10 ? String.fromCharCode(48 + e) : (e -= 10) < 26 ? String.fromCharCode(65 + e) : (e -= 26) < 26 ? String.fromCharCode(97 + e) : 0 == (e -= 26) ? "-" : 1 == e ? "_" : "?"
}

export async function encodeMarkup(pumlMarkup: string) {
  const u8arr = new Uint8Array(pumlMarkup.length);
  encoder.encodeInto(pumlMarkup, u8arr);
  const compressedMarkup = await deflateAsync(u8arr, {level: 9});
  return encode64(compressedMarkup);
}

export function getRenderer(basePath: string) {
  return {
    getSvg: async (pumlMarkup: string) => {
      const encodedMarkup = await encodeMarkup(pumlMarkup);
      const response = await fetch(`${basePath}/svg/${encodedMarkup}`);
      return response.text();
    }
  }
}
