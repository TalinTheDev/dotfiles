import bar from "./bar.js";

App.config({
  style: "./style.css",
  windows: [bar],
});

Utils.monitorFile(`${App.configDir}`, function () {
  const css = `${App.configDir}/style.css`;
  App.resetCss();
  App.applyCss(css);
});
