import { v7 } from "uuid";
/**
 * Generates an authentication token.
 *
 * @async
 * @function
 * @returns {Promise<string | null>} A promise that resolves to the generated authentication token as a string,
 * or `null` if an error occurs during the process.
 *
 * @throws {Error} If the fetch request fails or the response cannot be parsed.
 */
const generateAuthToken = async () => {
    try {
        const req = await fetch("https://saas.castbox.fm/auth/api/v1/tokens/provider/secret", {
            headers: {
                "x-app-id": "ai-seek",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                secret: v7()
            }),
            method: "POST"
        });
        const res = await req.json();
        return res.data.token;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
export default generateAuthToken;
