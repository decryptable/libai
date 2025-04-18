![libai](./banner.jpg)

To install:

```bash
npm i github:decryptable/libai
```

## Models

| Model ID                          | Model Name                                            | Version  | Description                                                                                                         | Support Vision | Support Thinking | Support Search |
|------------------------------------|-------------------------------------------------------|----------|---------------------------------------------------------------------------------------------------------------------|----------------|------------------|----------------|
| openai/gpt-4o-mini                 | <img src="https://d3g322f8itkvhj.cloudfront.net/static/logo/chatgpt.png" width="20" height="20"> ChatGPT 4o-mini                      | 4o-mini  | GPT-4o mini is OpenAI's newest model after GPT-4 Omni, supporting both text and image inputs with text outputs.     | Yes            | No               | Yes            |
| deepseek/deepseek-chat             | <img src="https://d3g322f8itkvhj.cloudfront.net/static/logo/DeepSeek.png" width="20" height="20"> DeepSeek V3                          | V3       | DeepSeek-V3 is the latest model from the DeepSeek team, building upon the instruction following and coding abilities. | No             | No               | Yes            |
| qwen/qwq-32b                       | <img src="https://d3g322f8itkvhj.cloudfront.net/static/logo/qwen.png" width="20" height="20"> Qwen QwQ-32B                               | QwQ-32B  |                                                                                                                     | No             | Yes              | Yes            |
| deepseek/deepseek-r1               | <img src="https://d3g322f8itkvhj.cloudfront.net/static/logo/DeepSeek.png" width="20" height="20"> DeepSeek R1                         | R1       |                                                                                                                     | No             | Yes              | Yes            |
| openai/gpt-4o                      | <img src="https://d3g322f8itkvhj.cloudfront.net/static/logo/chatgpt.png" width="20" height="20"> ChatGPT 4o                            | 4o       | GPT-4o is OpenAI's latest AI model, supporting both text and image inputs with text outputs.                        | Yes            | No               | Yes            |
| anthropic/claude-3.5-sonnet        | <img src="https://d3g322f8itkvhj.cloudfront.net/static/logo/Claude.png" width="20" height="20"> Claude 3.5 Sonnet                       | 3.5      | New Claude 3.5 Sonnet delivers better-than-Opus capabilities, faster-than-Sonnet speeds, at the same Sonnet prices.   | Yes            | No               | Yes            |
| anthropic/claude-3.7-sonnet        | <img src="https://d3g322f8itkvhj.cloudfront.net/static/logo/Claude.png" width="20" height="20"> Claude 3.7 Sonnet                       | 3.7      | New Claude 3.7 Sonnet delivers better-than-Opus capabilities, faster-than-Sonnet speeds, at the same Sonnet prices.   | Yes            | No               | Yes            |
| grok/grok-3                        | <img src="https://d3g322f8itkvhj.cloudfront.net/static/logo/Grok.png" width="20" height="20"> Grok V3                                    | V3       |                                                                                                                     | No             | No               | Yes            |
| mistralai/mistral-large            | <img src="https://d3g322f8itkvhj.cloudfront.net/static/logo/Mistral-large.png" width="20" height="20"> Mistral large                   | large    |                                                                                                                     | Yes            | No               | Yes            |
| google/gemini-2.0                  | <img src="https://d3g322f8itkvhj.cloudfront.net/static/logo/Gemini.png" width="20" height="20"> Gemini 2.0                             | 2.0      | Gemini Flash 2.0 offers a significantly faster time to first token (TTFT) compared to Gemini Flash 1.5.             | Yes            | No               | Yes            |

## Usage

```javascript
import libai from "libai";
import generateAuthToken from "./dist/utils/generateAuthToken";

const main = async () => {
  const authToken = await generateAuthToken();

  if (!authToken) return;

  console.log(`Auth token: ${authToken}`)

  const models = await libai.getModels();
  const selectedModel = models[0];

  console.log("Selected model:", selectedModel)

  const message = "Hey there! How are you?";

  const webSearch = true;

  let finalResponse = "";

  await libai.getChatResponse(
    message,
    authToken,
    selectedModel.id,
    webSearch,
    null,
    (streamData) => {
      if (streamData.content) {
        process.stdout.write(streamData.content);

        finalResponse += streamData.content;
      }
    }
  );

  console.log(`\nFinal Response: ${finalResponse}`);
};

main()
```