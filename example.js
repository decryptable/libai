import libai from "./dist/libai";
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