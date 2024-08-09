const hyprland = await Service.import("hyprland");

const dispatch = (ws) => hyprland.messageAsync(`dispatch workspace ${ws}`);

const HyprlandWorkspaces = () => {
  return Widget.EventBox({
    className: "workspaces",
    onScrollUp: () => dispatch("+1"),
    onScrollDown: () => dispatch("-1"),
    child: Widget.Box({
      children: Array.from({ length: 10 }, (_, i) => i + 1).map((i) =>
        Widget.Button({
          classNames: ["workspaceButton", "flat"],
          attribute: i,
          label: `○`,
          onClicked: () => dispatch(i),
        })
      ),
      setup: (self) =>
        self.hook(hyprland, () => {
          self.children.forEach((btn) => {
            btn.label = hyprland.workspaces.some(
              (ws) => ws.id === btn.attribute
            )
              ? "●"
              : "○";
          });
        }),
    }),
  });
};

export default HyprlandWorkspaces;
