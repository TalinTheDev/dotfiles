import HyprlandWorkspaces from "./widgets/workspaces.js";
import NetworkIndicator from "./widgets/network.js";
import VolumeIndicator from "./widgets/audio.js";
import BatteryProgress from "./widgets/battery.js";
import Date from "./widgets/date.js";
import Time from "./widgets/time.js";

const middle = Widget.Box({
  vpack: "center",
  className: "barBottom",
  //children: [NetworkIndicator(), VolumeIndicator, BatteryProgress],
});


const bottom = Widget.Box({
  hpack: "end",
  classNames: ["barBottom", "barBottomHalf"],
  children: [NetworkIndicator(), VolumeIndicator, BatteryProgress, Date, Time]
});

const bar = Widget.Window({
  name: "bar",
  anchor: ["top", "left", "right"],
  exclusivity: "exclusive",
  margins: [5, 5, 0, 5],
  hpack: "fill",
  className: "bar",
  child: Widget.CenterBox({
    startWidget: HyprlandWorkspaces,
    centerWidget: middle,
    endWidget: bottom,
  }),
});

export default bar;
