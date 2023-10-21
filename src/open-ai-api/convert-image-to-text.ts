import axios from 'axios'
import FormData from 'form-data'

const imageToText = async (imageUrl: string) => {
    let data = new FormData();
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
      data : data
    };

    try {
        const response = await axios.request(config);
        return response.data.ParsedResults[0].ParsedText;        
    } catch (error) {
        return Promise.reject(error);
    }
};

export default imageToText;