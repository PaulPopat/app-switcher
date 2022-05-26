import Axios from "axios";
import { WithQuery } from "../utils/url";

function GetDomain(url: string) {
  return new URL(url).origin;
}

export async function GetAppIcon(url: string) {
  const image = await Axios.get(
    WithQuery("https://t2.gstatic.com/faviconV2", {
      client: "SOCIAL",
      type: "FAVICON",
      fallback_opts: "TYPE,SIZE,URL",
      url: GetDomain(url),
      size: "256",
    }),
    { responseType: "arraybuffer" }
  );
  const data_url =
    "data:" +
    image.headers["content-type"] +
    ";base64," +
    Buffer.from(image.data).toString("base64");

  return data_url;
}
