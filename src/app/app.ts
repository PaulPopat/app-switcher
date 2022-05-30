import { BrowserWindow, BrowserView } from "electron";
import { App } from "./repositories/apps";
import { Register } from "./repositories/browsers";
import Path from "path";

export async function BuildAppBrowser(win: BrowserWindow, app: App) {
  const browser = new BrowserView({
    webPreferences: {
      preload: Path.join(__dirname, "..", "browser-preload.js"),
    },
  });
  let active = false;
  win.addBrowserView(browser);
  Register(app.id, browser, () => {
    const [x, y] = win.getContentSize();
    win.setBrowserView(browser);
    browser.setBounds({
      x: 64,
      y: 36,
      width: x - 64,
      height: y - 36,
    });
    browser.setAutoResize({ width: true, height: true });
    active = true;
    win.webContents.send("nav", browser.webContents.getURL());

    return () => {
      win.removeBrowserView(browser);
      active = false;
    };
  });

  browser.webContents.loadURL(app.url);
  browser.webContents.on("did-start-navigation", (event, target) => {
    if (active) win.webContents.send("nav-start", target);
  });

  browser.webContents.on("did-navigate", (event, target) => {
    if (active) win.webContents.send("nav", target);
  });
}
