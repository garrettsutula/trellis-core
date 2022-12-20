import { deflateRaw } from "zlib";

export async function deflateAsync(content, opts) {
  return new Promise((resolve, reject) => {
    deflateRaw(content, opts, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  })
}