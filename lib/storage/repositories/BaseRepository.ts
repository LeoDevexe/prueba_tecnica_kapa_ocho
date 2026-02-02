/**
 * Repository Pattern: BaseRepository
 * Abstracción para persistencia en localStorage (cliente).
 * Las implementaciones concretas definen la clave de almacenamiento y la forma del entidad T.
 */
export abstract class BaseRepository<T> {
  constructor(protected storageKey: string) {}

  protected getAll(): T[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  protected save(items: T[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (e) {
      console.error("[BaseRepository] save error:", e);
    }
  }
}
