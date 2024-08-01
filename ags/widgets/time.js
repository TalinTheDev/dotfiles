const Time = Widget.Box({
  children: [
    Widget.Label({
      className: "timeIcon",
      label: ""
    }),
    Widget.Label({
      justification: "center",
      className: "timeText",
      label: Variable("", {
        poll: [1000, "date '+%-I:%-M %p'"],
      }).bind()
    })
  ]
});
export default Time;
