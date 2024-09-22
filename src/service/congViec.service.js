import { http } from "./config";

export const congViecService = {
  layCongViecTheoTen: (data) => {
    return http.get(`/cong-viec/lay-danh-sach-cong-viec-theo-ten/${data}`);
  },
  layMenuLoaiCongViec: http.get("/cong-viec/lay-menu-loai-cong-viec"),
  layChiTietMaLoaiCongViec: (data) => {
    return http.get(`/cong-viec/lay-chi-tiet-loai-cong-viec/${data}`);
  },
  layCongViecTheoChiTietLoai: (data) => {
    return http.get(`/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${data}`);
  },
  layCongViecChiTiet: (data) => {
    return http.get(`cong-viec/lay-cong-viec-chi-tiet/${data}`);
  },
};
