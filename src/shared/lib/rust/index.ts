import { invoke } from "@tauri-apps/api/core";

class Rust {
    async call(name: string, args?: any): Promise<any> {
        try {
            return await invoke(name, args);
        }
        catch (ex) {
            console.error(ex);
            throw ex;
        }
    }
}

export const rust = new Rust();
