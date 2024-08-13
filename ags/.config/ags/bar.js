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
    className: "barContents"
  });
};

const bar = (gdkMonitor, id) => {
  print("Window adding " + `bar-${id}`);
  return Widget.Window({
    name: `bar-${id}`,
    gdkmonitor: gdkMonitor,
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",
    hpack: "fill",
    className: "bar",
    child: barContents(),
  });
};
export default bar;
