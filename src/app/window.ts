import { BrowserWindow } from "electron";
import Path from "path";
import WindowStateKeeper from "electron-window-state";
import { IsProd } from "./utils/env";

let win: BrowserWindow;

export function GetMainWindow() {
  if (win) return win;
  const state = WindowStateKeeper({ defaultWidth: 800, defaultHeight: 600 });
  win = new BrowserWindow({
    width: state.width,
    height: state.height,
    x: state.x,
    y: state.y,
    titleBarStyle: "hiddenInset",
    webPreferences: {
      preload: Path.join(__dirname, "..", "preload.js"),
    },
    useContentSize: true,
  });

  if (!IsProd) win.webContents.openDevTools();
  win.loadFile(Path.join(__dirname, "..", "..", "index.html"));
  state.manage(win);
  return win;
}
