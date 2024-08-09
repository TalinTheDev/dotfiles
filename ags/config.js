import bar from "./bar.js";
const hyprland = await Service.import("hyprland");
import Gdk from "gi://Gdk?version=3.0";

const prettyPrint = (json) => {
  print(JSON.stringify(json, null, 2));
};

const setupBars = () => {
  let monitors = hyprland.monitors;
  let currentBars = [];
  print(`${monitors.length} monitors`);
  for (let monitorIndex = 0; monitorIndex < monitors.length; monitorIndex++) {
    const currentMonitor = monitors[monitorIndex];
    let { id } = currentMonitor;
    let gdkMonitor;
    const monitor = hyprland.getMonitor(id);
    if (!monitor) return null;

    gdkMonitor =
      Gdk.Display.get_default()?.get_monitor_at_point(monitor.x, monitor.y) ||
      null;

    if (!gdkMonitor) continue;
    if (
      App.windows.filter((window) => window.name == `bar-${id}`).length == 0
    ) {
      print(id);
      currentBars.push(bar(gdkMonitor, id));
    }
  }
  return currentBars;
};

App.config({
  style: "./style.css",
  windows: setupBars(),
});

const display = Gdk.Display.get_default();
let added = 0;
let removed = 0;
display.connect("monitor-added", (_, monitor) => {
  if (added > 0) {
    return;
  }
  added += 1;

  print("Monitor added");
  setupBars().forEach((bar) => {
    App.addWindow(bar);
  });
});

display.connect("monitor-removed", (_, monitor) => {
  if (removed > 0) {
    return;
  }
  removed += 1;
  App.windows.forEach((window) => {
    prettyPrint(monitor);
    print("Window removing " + window.name);
    App.removeWindow(window.name);
  });
  print("Monitor removed");
});
