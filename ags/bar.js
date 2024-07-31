import HyprlandWorkspaces from "./widgets/workspaces.js";
import NetworkIndicator from "./widgets/network.js";
import VolumeIndicator from "./widgets/audio.js";
import BatteryProgress from "./widgets/battery.js";
import Date from "./widgets/date.js";
import Time from "./widgets/time.js";

const middle = Widget.Box({
  className: "barBottom",
  vertical: true,
  children: [
    NetworkIndicator(),
    VolumeIndicator,
    BatteryProgress
  ]
});

const bottom = Widget.Box({
  classNames: ["barBottom", "barBottomHalf"],
  vertical: true,
  children: [
    Date,
    Time
  ]
});

const bar = Widget.Window({
  name: "bar",
  anchor: ["left"],
  exclusivity: "exclusive",
  margins: [0, 0, 0, 5],
  className: "bar",
  child:
    Widget.CenterBox({
      vertical: true,
      startWidget: HyprlandWorkspaces(),
      centerWidget: middle,
      endWidget: bottom
    })
})

export default bar
