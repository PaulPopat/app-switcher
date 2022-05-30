import { app } from "electron";
import {
  Assert,
  Checker,
  IsArray,
  IsIntersection,
  IsObject,
  IsString,
  IsType,
} from "@paulpopat/safe-type";
import Fs from "fs-extra";
import Path from "path";
import { v4 as Guid } from "uuid";

export function GenerateStore<T>(schema: Checker<T>, name: string) {
  const final_schema = IsIntersection(schema, IsObject({ id: IsString }));
  type FinalType = IsType<typeof final_schema>;

  const Location = Path.join(
    app.getPath("userData"),
    "app-switcher",
    name + ".json"
  );

  const get_data = async () => {
    if (!(await Fs.pathExists(Location))) {
      await Fs.outputJson(Location, []);
    }

    const result = await Fs.readJson(Location);
    Assert(IsArray(final_schema), result);
    return result;
  };

  const set_data = async (data: FinalType[]) => {
    await Fs.outputJson(Location, []);
  };

  return {
    async GetAll() {
      return await get_data();
    },
    async Find(predicate: (item: FinalType) => boolean) {
      const data = await get_data();
      return data.find(predicate);
    },
    async Where(predicate: (item: FinalType) => boolean) {
      const data = await get_data();
      return data.filter(predicate);
    },
    async Get(id: string) {
      return await this.Find((i) => i.id === id);
    },
    async Add(item: T) {
      const id = Guid();
      const data = await get_data();
      await set_data([...data, { ...item, id }]);
      return id;
    },
    async Update(id: string, item: T) {
      const data = await get_data();
      await set_data(
        data.map((d) => {
          if (d.id === id) return { ...d, ...item };
          else return d;
        })
      );
    },
    async Delete(id: string) {
      await set_data(await this.Where((i) => i.id !== id));
    },
    Schema: final_schema,
  };
}
