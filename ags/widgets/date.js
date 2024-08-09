const Date = () => {
  return Widget.Box({
    children: [
      Widget.Label({ className: "dateIcon", label: "" }),
      Widget.Label({
        justification: "center",
        className: "dateText",
        label: Variable("", {
          poll: [1000, "date '+%a, %b %-e'"],
        }).bind(),
      }),
    ],
  });
};
export default Date;
