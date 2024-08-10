const hyprland = await Service.import("hyprland");
import Gdk from "gi://Gdk?version=3.0";
import bar from "./bar.js";

const display = Gdk.Display.get_default();

const getMonitorName = (gdkmonitor) => {
  const screen = display?.get_default_screen();
  const screenCount = display?.get_n_monitors() ?? 1;

  for (let i = 0; i < screenCount; ++i) {
    if (gdkmonitor === display?.get_monitor(i))
      return screen?.get_monitor_plug_name(i) ?? null;
  }
  return null;
};

const setupBars = () => {
  let bars = [];
  let monitors = hyprland.monitors;

  for (let monitorIndex = 0; monitorIndex < monitors.length; monitorIndex++) {
    const monitor = monitors[monitorIndex];
    let { id, name } = monitor;

    const monitorCount = display?.get_n_monitors();
    for (let index = 0; index < (monitorCount ?? 1); index++) {
      let monitor = display?.get_monitor(index);
      if (getMonitorName(monitor) === name) bars.push(bar(monitor, id));
    }
  }

  return bars;
}

App.config({
  style: "./style.css",
  windows: setupBars(),
});

display?.connect("monitor-added", (_, monitor) => {
  print(JSON.stringify(App.windows, null, 2))
  App.addWindow(bar(monitor, parseInt(App.windows[App.windows.length - 1].name.split("-")[1]) + 1));
});

display?.connect("monitor-removed", (_, monitor) => {
  App.windows.forEach((win) => {
    if (win.gdkmonitor === monitor) App.removeWindow(win);
  });
});
