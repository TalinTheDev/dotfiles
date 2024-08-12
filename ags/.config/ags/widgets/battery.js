const battery = await Service.import("battery");

const BatteryProgress = () => {
  return Widget.Box({
    visible: battery.bind("available"),
    children: [
      Widget.Icon({ className: "batteryIcon" }).hook(battery, (self) => {
        const batteryPercent = battery.bind("percent").emitter.percent;
        const icon = [
          [100, "full"],
          [75, "good"],
          [50, "caution"],
          [20, "low"],
          [0, "empty"],
        ].find(([threshold]) => threshold <= batteryPercent)?.[1];

        self.icon = `battery-${icon}-symbolic`;
        self.tooltip_text = `Battery at ${batteryPercent}%`;
      }),
      Widget.Label({ className: "batteryText" }).hook(battery, (self) => {
        self.label = battery.bind("percent").emitter.percent.toString();
      }),
    ],
    tooltipText: battery
      .bind("percent")
      .as((p) => (p > 0 ? `${p.toString()}%` : "0")),
  });
};

export default BatteryProgress;
