const Date = Widget.Box({
  vertical: true,
  children: [
    Widget.Label({ className: "dateIcon", label: "" }),
    Widget.Label({
      justification: "center",
      className: "dateText",
      label: Variable("", {
        poll: [1000, "date '+%a%n%-e'"],
      }).bind()
    })
  ]
});

export default Date;
