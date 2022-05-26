import { GetMainWindow } from "../window";

export default async function () {
  const win = GetMainWindow();
  win.getBrowserView()?.webContents.goBack();
}
