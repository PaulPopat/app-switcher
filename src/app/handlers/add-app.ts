import { IsString, Assert, Optional } from "@paulpopat/safe-type";
import { BuildAppBrowser } from "../app";
import { AddApp } from "../repositories/apps";
import { GetMainWindow } from "../window";

export default async (name: unknown, url: unknown, icon_url: unknown) => {
  Assert(IsString, name);
  Assert(IsString, url);
  Assert(Optional(IsString), icon_url);
  const result = await AddApp(name, url, icon_url);
  BuildAppBrowser(GetMainWindow(), result);
  return result;
};
