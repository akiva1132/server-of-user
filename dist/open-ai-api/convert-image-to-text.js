"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const imageToText = async (imageUrl) => {
    let data = new form_data_1.default();
    data.append('language', 'eng');
    data.append('isOverlayRequired', 'false');
    data.append('url', imageUrl);
    data.append('iscreatesearchablepdf', 'false');
    data.append('issearchablepdfhidetextlayer', 'false');
    data.append('OCREngine', 2);
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.ocr.space/parse/image',
        headers: {
            'apikey': '6cdff8c5d988957',
            ...data.getHeaders()
        },
        data: data
    };
    try {
        const response = await axios_1.default.request(config);
        return response.data.ParsedResults[0].ParsedText;
    }
    catch (error) {
        return Promise.reject(error);
    }
};
exports.default = imageToText;
