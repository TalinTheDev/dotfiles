const network = await Service.import('network')

const WifiIndicator = () => Widget.Box({
  hpack: "center",
  className: "wifi",
  children: [
    Widget.Icon({
      className: "wifiIcon",
      icon: network.wifi.bind('icon_name'),
    }),
  ],
  tooltipText: network.wifi.bind('ssid').as(ssid => ssid || 'Unknown')
})

const WiredIndicator = () => Widget.Icon({
  icon: network.wired.bind('icon_name'),
})

const NetworkIndicator = () => Widget.Stack({
  hpack: "fill",
  children: {
    wifi: WifiIndicator(),
    wired: WiredIndicator(),
  },
  shown: network.bind('primary').as(p => p || 'wifi'),
})

export default NetworkIndicator;
