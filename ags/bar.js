import HyprlandWorkspaces from "./widgets/workspaces.js";
import NetworkIndicator from "./widgets/network.js";
import VolumeIndicator from "./widgets/audio.js";
import BatteryProgress from "./widgets/battery.js";
import Brightness from "./widgets/brightness.js";
import Date from "./widgets/date.js";
import Time from "./widgets/time.js";

const bottom = () => {
  return Widget.Box({
    hpack: "end",
    classNames: ["barBottom", "barBottomHalf"],
    children: [
      NetworkIndicator(),
      VolumeIndicator(),
      Brightness(),
      BatteryProgress(),
      Date(),
      Time(),
    ],
  });
};

const barContents = () => {
  return Widget.CenterBox({
    startWidget: HyprlandWorkspaces(),
    endWidget: bottom(),
  });
};

const bar = (gdkMonitor, id) => {
  print("Window adding " + `bar-${id}`);
  return Widget.Window({
    name: `bar-${id}`,
    gdkmonitor: gdkMonitor,
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",
    margins: [7, 10, 0, 10],
    hpack: "fill",
    className: "bar",
    child: barContents(),
  });
};
export default bar;
