export type MapKey = string | number | symbol;
interface EnhanceMap<Key extends MapKey, Value> {
  toArray: () => Value[];
  toJSON: () => Record<Key, Value>;
  jsonToMap: <K extends MapKey = MapKey, V = unknown>(json: Record<K, V>) => void;
}
export default class MapStore<Key extends MapKey = MapKey, T = unknown>
  extends Map<Key, T>
  implements EnhanceMap<Key, T>
{
  toArray(): T[] {
    return Array.from(this.values());
  }

  toJSON(): Record<Key, T> {
    const result: Record<Key, T> = {} as Record<Key, T>;
    for (const [key, value] of this.entries()) {
      result[key] = value;
    }
    return result;
  }

  jsonToMap<K extends MapKey = MapKey, V = unknown>(json: Record<K, V>): void {
    for (const [key, value] of Object.entries(json)) {
      this.set(key as Key, value as T);
    }
  }
}
