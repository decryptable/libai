"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateAuthToken_1 = require("./utils/generateAuthToken");
const getChatResponse_1 = require("./utils/getChatResponse");
const getModels_1 = require("./utils/getModels");
const AI = {
    generateAuthToken: generateAuthToken_1.default,
    getChatResponse: getChatResponse_1.default,
    getModels: getModels_1.default
};
exports.default = AI;
