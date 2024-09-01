
const axios = require('axios');

async function getCheckGrammar(text){
    const response =  await axios.post(
        'https://api.sapling.ai/api/v1/edits',
        {
            "key": 'ICT22NAYQ3VWWTJHLN9SCKFMZTL7O248', // replace with your API key
            "session_id": 'test session',
            text
        })
}