const Time = Widget.Box({
  vertical: true,
  children: [
    Widget.Label({
      className: "timeIcon",
      label: ""
    }),
    Widget.Label({
      justification: "center",
      className: "timeText",
      label: Variable("", {
        poll: [1000, "date '+%-I%n%-M'"],
      }).bind()
    })
  ]
});
export default Time;
