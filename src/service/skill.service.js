import { http } from "./config"

export const skillService = {
    getAllSkill: () => {
        return http.get("/skill")
    }
}