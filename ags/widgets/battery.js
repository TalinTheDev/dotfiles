const battery = await Service.import('battery')

const BatteryProgress = Widget.Box({
  visible: battery.bind('available'),
  vertical: true,
  children: [
    Widget.Label().hook(battery, self => {
      self.label = battery.bind('percent').emitter.percent.toString()
    })
  ],
  tooltipText: battery.bind('percent').as(p => p > 0 ? `${p.toString()}%` : "0"),
})


export default BatteryProgress;
