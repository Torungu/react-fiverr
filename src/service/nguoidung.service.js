import { http } from "./config";

export const nguoidungService = {
    getListUser: () => {
        return http.get("/users");
    },
    // NV2: Tạo hàm xử lý  gọi API xóa người dùng

    deleteUser: (id) => {
        return http.delete(`/users/?id=${id}`);
    },
    createUser: (data) => {
        return http.post("/users", data);
    },
    uploadAvatar: (token, data) => {
        return http.post(
            "/users/upload-avatar", data, {
            // Tham số thứ 3 của Axios,được truyền vào khi muốn thêm token hoặc giá trị khác, bth thì chỉ cần truyền 2 tham số 
            headers: {
                token,
            }
        }
        );
    }
}