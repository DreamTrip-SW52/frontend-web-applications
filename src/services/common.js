import axios from "axios";
export default axios.create({
  baseURL: "https://dreamtrip-awg3.herokuapp.com/api/v1",
  // baseURL: "https://localhost:7160/api/v1",
  headers: {
    "Content-Type": "application/json",
    charset: "utf-8",
  },
});
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
