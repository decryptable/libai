export interface Response {
    content: string;
}
/**
 * Sends a chat message to the AI service and retrieves the response, optionally streaming the response events.
 *
 * @param message - The message to send to the AI service.
 * @param authToken - The authentication token required to access the AI service.
 * @param model - Optional. Chat model. Defaults to `deepseek/deepseek-r1`.
 * @param webSearch - Optional. Whether to enable web search for the query. Defaults to `false`.
 * @param session - Optional. The session ID to use for the request. If not provided, a new session ID will be generated.
 * @param onStream - Optional. A callback function to handle streamed response events. Each event contains a partial response.
 *
 * @returns A promise that resolves to the final response string, or `null` if an error occurs.
 */
declare const getChatResponse: (message: string, authToken: string, model: string, webSearch?: boolean, session?: string | undefined | null, onStream?: (event: Response) => void) => Promise<string | null | undefined>;
export default getChatResponse;
