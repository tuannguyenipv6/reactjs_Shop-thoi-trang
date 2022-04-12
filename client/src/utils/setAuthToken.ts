import axios from "axios";

// set header của cho các req từ axios
const setAuthToken = (token: string | null) => {
    if(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else {
        // Nếu ko có token thì xóa cái herder đi
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setAuthToken;