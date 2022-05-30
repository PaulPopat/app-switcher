import { IsNumber, IsObject, IsString } from "@paulpopat/safe-type";
import { GenerateStore } from "../utils/json-store";

const Store = GenerateStore(
  IsObject({ app: IsString, count: IsNumber }),
  "notifications"
);

export async function ClearNotifications(app_id: string) {
  const target = await Store.Find((i) => i.app === app_id);
  if (target) await Store.Update(target.id, { ...target, count: 0 });
}

export async function AddNotification(app_id: string) {
  const target = await Store.Find((i) => i.app === app_id);
  if (target)
    await Store.Update(target.id, { ...target, count: target.count++ });
  else await Store.Add({ app: app_id, count: 1 });
}

export async function GetNotifications(app_id: string) {
  const target = await Store.Find((i) => i.app === app_id);
  if (target) return target.count;

  return 0;
}
