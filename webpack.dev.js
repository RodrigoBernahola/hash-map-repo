import { merge } from "webpack-merge";
import common from "./webpack.common.js";

export default merge(common, {
  mode: "development", // Cambiado de production a development
  devtool: "eval-source-map", // Un source-map más rápido para desarrollo
  devServer: {
    open: true,
    watchFiles: ["./src/template.html"],
  },
});
