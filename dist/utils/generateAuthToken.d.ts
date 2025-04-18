export interface Response {
    data: Data;
}
interface Data {
    uid: string;
    uidInt: number;
    token: string;
    newUser: boolean;
    firebaseToken: string;
    createdAtTimestamp: number;
    uid2Identity: null;
}
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
declare const generateAuthToken: () => Promise<string | null>;
export default generateAuthToken;
