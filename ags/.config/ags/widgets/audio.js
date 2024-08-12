const audio = await Service.import("audio");

const VolumeIndicator = () => {
  return Widget.Box({
    classNames: ["volumeButton"],
    child: Widget.Box({
      children: [
        Widget.Icon({ className: "audioIcon" }).hook(audio.speaker, (self) => {
          const vol = audio.speaker.volume * 100;
          const icon = [
            [101, "overamplified"],
            [67, "high"],
            [34, "medium"],
            [1, "low"],
            [0, "muted"],
          ].find(([threshold]) => threshold <= vol)?.[1];

          self.icon = `audio-volume-${icon}-symbolic`;
          self.tooltip_text = `Volume ${Math.floor(vol)}%`;
        }),
        Widget.Label({ className: "audioText" }).hook(audio.speaker, (self) => {
          self.label = Math.floor(audio.speaker.volume * 100).toString();
        }),
      ],
    }),
  });
};

export default VolumeIndicator;
