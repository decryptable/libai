"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get a list of models
 *
 * @async
 * @function
 * @returns {Promise<Model[] | null>} A promise that resolves to an array of models if the request is successful,
 * or `null` if an error occurs.
 *
 * @throws {Error} If the fetch request fails or the response cannot be parsed as JSON.
 */
const getModels = async () => {
    try {
        const req = await fetch("https://ai-seek.thebetter.ai/v1/chat/list_models", {
            headers: {
                "X-App-Id": "ai-seek"
            }
        });
        const res = await req.json();
        return res.data.models;
    }
    catch (error) {
        return null;
    }
};
exports.default = getModels;
