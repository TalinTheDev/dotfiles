const Launcher = Widget.Button({
  child: Widget.Label("A"),
  onClicked: () => Utils.exec("wofi --show=drun"),
  className: "launcher-button",
});

const BarBox = Widget.Box({
  spacing: 8,
  homogeneous: false,
  vertical: false,
  children: [Launcher],
});

const bar = Widget.Window({
  name: "bar",
  anchor: ["top", "left", "right"],
  child: BarBox,
});

App.config({
  style: "./styles.css",
  windows: [],
});
