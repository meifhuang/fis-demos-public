const mockData = [
  {
    id: "lesson-1",
    title: "Introduction to Atoms",
    description: "An overview of atoms and their components for beginners.",
    markdown: `
# Atoms: The Building Blocks of Matter

Atoms are the building blocks of all matter. Everything around you — the air, water, your body — is made of atoms. Scientists discovered that atoms are incredibly small and consist of even smaller parts: **protons**, **neutrons**, and **electrons**.

- **Protons** have a positive charge and sit in the center, called the **nucleus**.
- **Neutrons** have no charge and are also in the nucleus.
- **Electrons** have a negative charge and orbit around the nucleus.

Learning about atoms helps us understand chemistry, biology, and physics. For example, how water molecules form, how chemical reactions occur, and why different materials behave differently all depend on atoms.
`
  },
  {
    id: "lesson-2",
    title: "Photosynthesis Basics",
    description: "Learn how plants convert sunlight into energy through photosynthesis.",
    markdown: `
# Photosynthesis: Converting Light to Energy

Photosynthesis is the process by which plants make their own food using sunlight, water, and carbon dioxide. The main product of this process is glucose, which provides energy for the plant.

## Key Points

- **Chlorophyll** in leaves captures sunlight.
- **Carbon dioxide** from the air and **water** from the soil are converted into **glucose** and **oxygen**.
- This process is vital for life on Earth because it produces **oxygen** and **food**.

Understanding photosynthesis helps us appreciate plant biology, ecosystems, and the global carbon cycle.
`
  }
];


// Mimic the shape of a react-query hook for easy future replacement.
export const useMockLessonList = () => {
  return {
    data: mockData,
    isLoading: false,
    error: null,
  };
};

