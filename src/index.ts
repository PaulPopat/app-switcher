import { app, BrowserWindow } from "electron";
import Path from "path";
import { BuildHandlers, Register } from "./app/handler-manager";
import { BuildAppBrowser } from "./app/app";
import { GetMainWindow } from "./app/window";
import Fs from "fs";
import { LoadApps } from "./app/repositories/apps";

async function LoadHandlers() {
  const search = Path.join(__dirname, "app", "handlers");
  const handlers = Fs.readdirSync(search);
  for (const handler of handlers) {
    const path = Path.join(search, handler);
    Register(handler.replace(".js", ""), require(path).default);
  }

  BuildHandlers();
}

const CreateWindow = async () => {
  app.setName("App Switcher");
  const win = GetMainWindow();
  const apps = await LoadApps();
  for (const app of apps) await BuildAppBrowser(win, app);
};

app.whenReady().then(async () => {
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) CreateWindow();
  });

  await LoadHandlers();
  await CreateWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
