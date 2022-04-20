"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppReducer_1 = require("../../src/store/reducers/App/AppReducer");
function catchAsync(fn, onEnd = () => { }) {
    return async function (dispatch, getState) {
        try {
            await fn(dispatch, getState);
        }
        catch (e) {
            dispatch((0, AppReducer_1.CreateMessage)(e.response.data.message || 'Произошла ошибка'));
        }
        dispatch(AppReducer_1.AppActions.setLoading(false));
        onEnd(dispatch, getState);
    };
}
exports.default = catchAsync;
//# sourceMappingURL=catchAsync.js.map