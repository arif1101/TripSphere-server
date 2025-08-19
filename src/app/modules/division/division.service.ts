import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";
    }

    const duplicateDivision = await Division.findOne({
        name: payload.name,


    if (payload.thumbnail && existingDivision.thumbnail) {
        await deleteImageFromCLoudinary(existingDivision.thumbnail)
    }


const deleteDivision = async (id: string) => {
    await Division.findByIdAndDelete(id);
    return null;
};

export const DivisionService = {
    createDivision,
    getAllDivisions,
    getSingleDivision,
    updateDivision,

