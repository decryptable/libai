export interface Response
{
    code: number;
    data: Data;
    message: string;
}

interface Data
{
    models: Model[];
}

export interface Model
{
    id: string;
    model: string;
    version: string;
    icon: string;
    description: string;
    paidOnly: boolean;
    supportVision: boolean;
    hot: boolean;
    supportThinking: boolean;
    supportSearch: boolean;
}


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
const getModels = async (): Promise<Model[] | null> =>
{
    try
    {
        const req = await fetch("https://ai-seek.thebetter.ai/v1/chat/list_models", {
            headers: {
                "X-App-Id": "ai-seek"
            }
        })

        const res: Response = await req.json()

        return res.data.models as Model[]
    } catch (error)
    {
        return null
    }
}

export default getModels;