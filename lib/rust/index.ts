class Rust {
    async call(name: string, args?: any): Promise<any> {
        console.log(`[Mock Rust Call] name: ${name}, args:`, args);
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        switch (name) {
            case 'get_routines':
                return [];
            case 'save_routine':
                return { success: true };
            default:
                console.warn(`[Mock Rust Call] Unhandled call: ${name}`);
                return null;
        }
    }
}

export const rust = new Rust();
