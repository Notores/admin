const { getModulesList, getModule } = require("@notores/core/ModuleHandler");
class AdminRouter {
    static async listModules(req, res, next) {
        const modules = getModulesList().map(mod => ({
            name: mod.name,
            models: []
        }));

        modules.forEach(module => {
            const mod = getModule(module.name);
            const models = Object.keys(mod.models);
            if (models.length >= 1) {
                module.models = models;
            }
        });

        res.locals.setBody({
            modules: modules
        });
        next();
    }

    static async listModels(req, res, next) {
        const module = getModule(req.params.module);
        if (module.installed) {
            const models = Object.keys(module.models).map(key => ({
                name: module.models[key].modelName,
                fields: Object.keys(module.models[key].schema)
            }));
            res.locals.setBody({
                models: models
            });
        } else {
            res.locals.setBody({
                models: []
            });
        }
        next();
    }

    static async getModel(req, res, next) {
        const module = getModule(req.params.module);
        if (module.installed && module.models[req.params.model]) {
            const model = module.models[req.params.model];
            res.locals.setBody({
                model: {
                    name: model.modelName,
                    fields: [
                        {
                            name: "id",
                            type: "ObjectId"
                        },
                        ...Object.keys(model.schema).map(name => ({
                            name,
                            type: model.paths[name].instance
                        }))
                    ]
                }
            });
        } else {
            res.locals.setBody({
                model: null
            });
        }
        next();
    }
    static async getModelData(req, res, next) {
        const module = getModule(req.params.module);
        if (module.installed && module.models[req.params.model]) {
            const model = module.models[req.params.model];
            console.log("finding for", model.model);
            res.locals.setBody({
                data: await model.model.find()
            });
        } else {
            res.locals.setBody({
                data: null
            });
        }
        next();
    }
}

module.exports = AdminRouter;
