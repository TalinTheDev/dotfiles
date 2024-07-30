const Date = Widget.Box({
  vertical: true,
  children: [
    Widget.Label(""),
    Widget.Label({
      justification: "center",
      label: Variable("", {
        poll: [1000, "date '+%a%n%-e'"],
      }).bind()
    })
  ]
});

export default Date;
