import { BrowserView } from "electron";

const browsers: Record<
  string,
  { window: BrowserView; focus: () => () => void }
> = {};

let finalise = () => {};

export function Register(
  name: string,
  window: BrowserView,
  focus: () => () => void
) {
  browsers[name] = { window, focus };
}

export function Focus(name: string) {
  finalise();
  finalise = browsers[name].focus();
}

export function Close() {
  finalise();
  finalise = () => {};
}

export function GetAppFromWebId(web_id: number) {
  for (const id in browsers) {
    if (!browsers.hasOwnProperty(id)) continue;

    const target = browsers[id];
    if (target.window.webContents.id === web_id) return id;
  }

  throw new Error("No App found for ID");
}
