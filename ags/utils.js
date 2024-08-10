import Gdk from "gi://Gdk?version=3.0";
const display = Gdk.Display.get_default();

export const getMonitorName = (gdkmonitor) => {
  const screen = display?.get_default_screen();
  const screenCount = display?.get_n_monitors() ?? 1;

  for (let i = 0; i < screenCount; ++i) {
    if (gdkmonitor === display?.get_monitor(i))
      return screen?.get_monitor_plug_name(i) ?? null;
  }
  return null;
};
