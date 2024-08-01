import HyprlandWorkspaces from "./widgets/workspaces.js";
import NetworkIndicator from "./widgets/network.js";
import VolumeIndicator from "./widgets/audio.js";
import BatteryProgress from "./widgets/battery.js";
import Date from "./widgets/date.js";
import Time from "./widgets/time.js";


const bottom = Widget.Box({
  hpack: "end",
  classNames: ["barBottom", "barBottomHalf"],
  children: [NetworkIndicator, VolumeIndicator, BatteryProgress, Date, Time]
});

const bar = Widget.Window({
  name: "bar",
  anchor: ["top", "left", "right"],
  exclusivity: "exclusive",
  margins: [10, 10, 0, 10],
  hpack: "fill",
  className: "bar",
  child: Widget.CenterBox({
    startWidget: HyprlandWorkspaces,
    endWidget: bottom,
  }),
});

export default bar;
