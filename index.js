const { NotoresModule } = require("@notores/core");
class AdminModule extends NotoresModule {
    init() {
        require("./routes")();
    }
}

module.exports = new AdminModule();
