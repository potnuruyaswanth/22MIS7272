const axios= require("axios");
require("dotenv").config();
async function getAuthToken() {
    try{
        const response=await axios.post(
            "http://4.224.186.213/evalution-service/auth",
            {
                email:process.env.EMAIL,
                name:process.env.NAME,
                rollNo:process.env.ROLLNO,
                accessCode:process.env.ACCESS_CODE,
                clientID:process.env.CLIENT_ID,
                clientSecret:process.env.CLIENT_SECRET,
            }
        );
        return response.data.access_token;
    }catch(error){
        return null;
    }
}
module.exports=getAuthToken;