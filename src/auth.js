import axios from "axios";

export async function isAuthorize(){
    if (localStorage.getItem("accessToken") === null) {
        return false;
    }

    if (new Date(Date.now()) < new Date(localStorage.getItem("tokenExpireData") * 1000)) {
        return true;
    }

    return await tryRefreshToken();
}

async function tryRefreshToken() {
    try {
        const url = `https://localhost:7143/api/Token/refresh?jwtToken=${localStorage.getItem("accessToken")}&resreshToken=${localStorage.getItem("refreshToken")}`;
        const {data} = await axios.get(url);
        localStorage.setItem("accessToken", data.value.accessToken)
        localStorage.setItem("refreshToken", data.value.refreshToken)
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function getUserData() {
    const accessToken = localStorage.getItem("accessToken");

    if(accessToken != null){
        const config = {
            headers: {Authorization: `Bearer ${accessToken}`}
        };
        const url = `https://localhost:7143/api/User/${localStorage.getItem("userId")}`;

        try{
            const {data} = await axios.get(url, config);
            console.log(data);
            return data.value;
        }
        catch (error){
            console.log(error)
            return null;
        }
    }
}