const AdminRouter = require("./Router");
const { routeWithHandle, checkEmptyParams } = require("@notores/core");

module.exports = () => {

    routeWithHandle("admin", "/", [(req, res, next) => {
        res.redirect('/n-admin/dashboard');
        next();
    }], {
        accepts: ['html', 'json'],
        admin: true
    });

    routeWithHandle("admin", "/dashboard", [AdminRouter.dashboard], {
        accepts: ['html', 'json'],
        admin: true
    });

    routeWithHandle("admin-modules", "/modules(/?)", [AdminRouter.listModules], {
        accepts: ['html', 'json'],
        admin: true
    });

    //missing /modules/:module

    routeWithHandle(
        "admin-module-models",
        "/modules/:module/models",
        [checkEmptyParams, AdminRouter.listModels],
        {
            accepts: ['html', 'json'],
            admin: true
        }
    );

    routeWithHandle(
        "admin-module-model",
        "/modules/:module/models/:model",
        [checkEmptyParams, AdminRouter.getModel],
        {
            accepts: ['html', 'json'],
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
