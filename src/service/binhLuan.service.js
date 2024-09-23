import { http } from "./config";

export const binhLuanService = {
  layBinhLuanTheoCongViec: (data) => {
    return http.get(`/binh-luan/lay-binh-luan-theo-cong-viec/${data}`);
  },
};
