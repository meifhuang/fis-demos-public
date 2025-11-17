export function mockFramerMotion() {
    vi.mock('framer-motion', () => ({
        motion: {
            h1: ({ children }: { children: React.ReactNode }) => <h1>{children}</h1>,
            div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
        },
    }));
}