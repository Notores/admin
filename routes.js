const AdminRouter = require("./Router");
const { routeWithHandle, checkEmptyParams } = require("@notores/core");

module.exports = () => {
    routeWithHandle("admin-modules", "/modules", [AdminRouter.listModules], {
        admin: true
    });

    //missing /modules/:module

    routeWithHandle(
        "admin-module-models",
        "/modules/:module/models",
        [checkEmptyParams, AdminRouter.listModels],
        {
            admin: true
        }
    );

    routeWithHandle(
        "admin-module-model",
        "/modules/:module/models/:model",
        [checkEmptyParams, AdminRouter.getModel],
        {
            admin: true
        }
    );

    routeWithHandle(
        "admin-module-model",
        "/modules/:module/models/:model",
        [checkEmptyParams, AdminRouter.getModel],
        {
            admin: true
        }
    );

    routeWithHandle(
        "admin-module-model",
        "/modules/:module/models/:model/data",
        [checkEmptyParams, AdminRouter.getModelData],
        {
            admin: true
        }
    );
};
