
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Division created",

    const slug = req.params.slug
    const result = await DivisionService.getSingleDivision(slug);
    sendResponse(res, {
        statusCode: 200,
        success: true,
    const result = await DivisionService.updateDivision(id, payload);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division updated",


const deleteDivision = catchAsync(async (req: Request, res: Response) => {
    const result = await DivisionService.deleteDivision(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division deleted",
        data: result,
    });
});

export const DivisionController = {
    createDivision,
    getAllDivisions,
    getSingleDivision,
    updateDivision,

