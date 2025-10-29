export declare class JurisShaclData {
    private store;
    constructor();
    /**
     * Initializes the JurisShaclData object.
     */
    init(): void;
    /**
     * Stores JSON-LD data at a given prefix.
     * @param shacl_prefix The prefix in the state store where the JSON-LD data is stored.
     * @param json_ld_data The JSON-LD data to store.
     */
    setData(shacl_prefix: string, json_ld_data: any): Promise<void>;
    /**
     * Updates a part of the stored JSON-LD data.
     * @param shacl_prefix The prefix in the state store where the JSON-LD data is stored.
     * @param shacl_path The path within the JSON-LD data to update.
     * @param data The data to update with.
     */
    update(shacl_prefix: string, shacl_path: string, data: any): Promise<void>;
    /**
     * Gets a part of the stored JSON-LD data.
     * @param shacl_prefix The prefix in the state store where the JSON-LD data is stored.
     * @param shacl_path The path within the JSON-LD data to retrieve.
     * @returns The data at the specified path.
     */
    get(shacl_prefix: string, shacl_path: string): any;
    /**
     * Sets a part of the stored JSON-LD data.
     * @param shacl_prefix The prefix in the state store where the JSON-LD data is stored.
     * @param shacl_path The path within the JSON-LD data to set.
     * @param data The data to set.
     */
    set(shacl_prefix: string, shacl_path: string, data: any): void;
}
