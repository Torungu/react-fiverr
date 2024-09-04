import axios from "axios";

// NV1 : Coi và setup lại một axios custom xử lí gọi API cho dự án Fiverr
export const http = axios.create({
  baseURL: "https://fiverrnew.cybersoft.edu.vn/api",
  timeout: 30000,
  headers: {
    tokenCyberSoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxMiIsIkhldEhhblN0cmluZyI6IjIyLzAxLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczNzUwNDAwMDAwMCIsIm5iZiI6MTcxMjk0MTIwMCwiZXhwIjoxNzM3NjUxNjAwfQ.QIS-5ejbLk-ly0KkZrtV0hoyQXSL9wqIkbziyg_m8hg",
  },
});
