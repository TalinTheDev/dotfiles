class BrightnessService extends Service {
  static {
    Service.register(
      this,
      {
        'screen-changed': ['float'],
      },
      {
        'screen-value': ['float', 'rw'],
      },
    );
  }

  #interface = Utils.exec("sh -c 'ls -w1 /sys/class/backlight | head -1'");
  #screenValue = 0;
  #max = Number(Utils.exec('brightnessctl max'));

  get screen_value() {
    return this.#screenValue;
  }

  set screen_value(percent) {
    if (percent < 0)
      percent = 0;

    if (percent > 1)
      percent = 1;

    Utils.execAsync(`brightnessctl set ${percent * 100}% -q`);
  }

  constructor() {
    super();

    const brightness = `/sys/class/backlight/${this.#interface}/brightness`;
    Utils.monitorFile(brightness, () => this.#onChange());

    this.#onChange();
  }

  #onChange() {
    this.#screenValue = parseFloat((Number(Utils.exec('brightnessctl get')) / this.#max) * 100).toFixed(0);
    this.changed('screen-value');
    this.emit('screen-changed', this.#screenValue);
  }

  connect(event = 'screen-changed', callback) {
    return super.connect(event, callback);
  }
}

const brightnessService = new BrightnessService;

const Brightness = () => {
  return Widget.Box({
    children: [
      Widget.Label({ className: "brightnessIcon", useMarkup: true }).hook(brightnessService, (self) => {
        const brightnessPercent = brightnessService.bind("screen-value").emitter.screenValue;
        const icon = [
          [66, "Full"],
          [33, "Medium"],
          [0, "None"],
        ].find(([threshold]) => threshold <= brightnessPercent)?.[1];

        if (icon == "Full") self.label = "&#xf6a9;"
        else if (icon == "Medium") self.label = "&#xeb30;"
        else if (icon == "None") self.label = "&#xed63;"
        else self.label = "&#xf5a8;"

        self.tooltip_text = `Brightness at ${brightnessPercent}%`;

      }),
      Widget.Label({ className: "brightnessText", label: brightnessService.bind('screen-value').as(v => `${v}`), })
    ],
    tooltipText: brightnessService.bind('screen-value').as(v => `${v}%`),
  });
};

export default Brightness;
