import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { skillService } from '../service/skill.service';

export const getAllSkillApi = createAsyncThunk(
    "skill/getAllSkillApi",
    async () => {
        const response = await skillService.getAllSkill();
        // console.log(response);
        return response.data.content;
    }
)
const initialState = {
    listSkill: []
}

const skillSlice = createSlice({
    name: "skill",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllSkillApi.fulfilled, (state, action) => {
            state.listSkill = action.payload
        });
        builder.addCase(getAllSkillApi.rejected, (state, action) => {
            // console.log(action);
        });
    }
});

export const { } = skillSlice.actions

export default skillSlice.reducer