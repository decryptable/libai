declare const AI: {
    generateAuthToken: () => Promise<string | null>;
    getChatResponse: (message: string, authToken: string, model: string, webSearch?: boolean, session?: string | undefined | null, onStream?: (event: import("./utils/getChatResponse").Response) => void) => Promise<string | null | undefined>;
    getModels: () => Promise<import("./utils/getModels").Model[] | null>;
};
export default AI;
