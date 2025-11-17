export function mockHeroUI() {
  vi.mock("@heroui/react", () => ({
    Button: ({
      children,
      onPress,
      ...props
    }: {
      children: React.ReactNode;
      onPress: () => void;
    }) => (
      <button onClick={onPress} {...props}>
        {children}
      </button>
    ),
  }));
}
