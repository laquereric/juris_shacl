"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JurisShaclData = void 0;
const jsonld = __importStar(require("jsonld"));
class JurisShaclData {
    constructor() {
        this.store = {};
    }
    /**
     * Initializes the JurisShaclData object.
     */
    init() {
        this.store = {};
    }
    /**
     * Stores JSON-LD data at a given prefix.
     * @param shacl_prefix The prefix in the state store where the JSON-LD data is stored.
     * @param json_ld_data The JSON-LD data to store.
     */
    setData(shacl_prefix, json_ld_data) {
        return __awaiter(this, void 0, void 0, function* () {
            const expanded = yield jsonld.expand(json_ld_data);
            console.log(JSON.stringify(expanded, null, 2));
            this.store[shacl_prefix] = expanded;
        });
    }
    /**
     * Updates a part of the stored JSON-LD data.
     * @param shacl_prefix The prefix in the state store where the JSON-LD data is stored.
     * @param shacl_path The path within the JSON-LD data to update.
     * @param data The data to update with.
     */
    update(shacl_prefix, shacl_path, data) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    /**
     * Gets a part of the stored JSON-LD data.
     * @param shacl_prefix The prefix in the state store where the JSON-LD data is stored.
     * @param shacl_path The path within the JSON-LD data to retrieve.
     * @returns The data at the specified path.
     */
    get(shacl_prefix, shacl_path) {
        if (this.store[shacl_prefix]) {
            const pathParts = shacl_path.split('.');
            let current = this.store[shacl_prefix];
            for (const part of pathParts) {
                if (current && current[part]) {
                    current = current[part];
                }
                else {
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
    set(shacl_prefix, shacl_path, data) {
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
exports.JurisShaclData = JurisShaclData;
