import { IsString, Assert } from "@paulpopat/safe-type";
import { dialog } from "electron";
import { DeleteApp, GetApp } from "../repositories/apps";
import { GetMainWindow } from "../window";

export default async (id: unknown) => {
  Assert(IsString, id);
  const app = await GetApp(id);
  if (!app) return;
  const dia = await dialog.showMessageBox(GetMainWindow(), {
    buttons: ["Confirm", "Cancel"],
    message: `Are you sure you want to remove ${app.name}?`,
  });
  if (dia.response === 1) return;
  await DeleteApp(id);
};
