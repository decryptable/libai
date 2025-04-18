"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const fetch_event_stream_1 = require("fetch-event-stream");
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
const getChatResponse = async (message, authToken, model, webSearch, session, onStream) => {
    try {
        const events = await (0, fetch_event_stream_1.stream)("https://ai-seek.thebetter.ai/v3/chat/send", {
            headers: {
                "X-App-Id": "ai-seek",
                "X-Access-Token": authToken,
                "content-type": "application/json"
            },
            body: JSON.stringify({
                sessionId: session !== null && session !== void 0 ? session : (0, uuid_1.v7)(),
                model: model !== null && model !== void 0 ? model : "deepseek/deepseek-r1",
                text: message,
                restrictedType: "PRO_USER",
                imageS3Keys: null,
                fileS3Keys: null,
                webSearch: webSearch
            }),
            method: "POST"
        });
        let finalResponse;
        for await (let event of events) {
            try {
                const data = JSON.parse(event.data);
                if (onStream) {
                    onStream(data);
                }
                finalResponse += data.content;
            }
            catch (error) {
            }
        }
        return finalResponse;
    }
    catch (error) {
        return null;
    }
};
exports.default = getChatResponse;
