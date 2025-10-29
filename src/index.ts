import * as jsonld from 'jsonld';

export class JurisShaclData {
  private store: any = {};

  constructor() {}

  /**
   * Initializes the JurisShaclData object.
   */
  public init(): void {
    this.store = {};
  }

  /**
   * Stores JSON-LD data at a given prefix.
   * @param shacl_prefix The prefix in the state store where the JSON-LD data is stored.
   * @param json_ld_data The JSON-LD data to store.
   */
  public async setData(shacl_prefix: string, json_ld_data: any): Promise<void> {
    const expanded = await jsonld.expand(json_ld_data);
    console.log(JSON.stringify(expanded, null, 2));
    this.store[shacl_prefix] = expanded;
  }

  /**
   * Updates a part of the stored JSON-LD data.
   * @param shacl_prefix The prefix in the state store where the JSON-LD data is stored.
   * @param shacl_path The path within the JSON-LD data to update.
   * @param data The data to update with.
   */
  public async update(shacl_prefix: string, shacl_path: string, data: any): Promise<void> {
    if (this.store[shacl_prefix]) {
      // Simple path update for now, can be expanded with framing
      const pathParts = shacl_path.split('.');
      let current = this.store[shacl_prefix];
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!current[pathParts[i]]) {
          current[pathParts[i]] = {};
        }
        current = current[pathParts[i]];
      }
      current[pathParts[pathParts.length - 1]] = data;
    }
  }

  /**
   * Gets a part of the stored JSON-LD data.
   * @param shacl_prefix The prefix in the state store where the JSON-LD data is stored.
   * @param shacl_path The path within the JSON-LD data to retrieve.
   * @returns The data at the specified path.
   */
  public get(shacl_prefix: string, shacl_path: string): any {
    if (this.store[shacl_prefix]) {
      const pathParts = shacl_path.split('.');
      let current = this.store[shacl_prefix];
      for (const part of pathParts) {
        if (current && current[part]) {
          current = current[part];
        } else {
          return undefined;
        }
      }
      return current;
    }
    return undefined;
  }

  /**
   * Sets a part of the stored JSON-LD data.
   * @param shacl_prefix The prefix in the state store where the JSON-LD data is stored.
   * @param shacl_path The path within the JSON-LD data to set.
   * @param data The data to set.
   */
  public set(shacl_prefix: string, shacl_path: string, data: any): void {
    if (!this.store[shacl_prefix]) {
      this.store[shacl_prefix] = {};
    }
    const pathParts = shacl_path.split('.');
    let current = this.store[shacl_prefix];
    for (let i = 0; i < pathParts.length - 1; i++) {
      if (!current[pathParts[i]]) {
        current[pathParts[i]] = {};
      }
      current = current[pathParts[i]];
    }
    current[pathParts[pathParts.length - 1]] = data;
  }
}
