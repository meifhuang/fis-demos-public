import { ComponentProps } from "react";

// Use ComponentProps<'div'>. This built-in React type
// includes all valid attributes for a <div> element,
// such as `children`, `className`, `id`, `style`, `onClick`, etc.
type DashboardSectionProps = ComponentProps<"div"> & {
  heading?: string;
  marginTop?: number;
  marginBottom?: number;
};

export default function DashboardSection({
  children,
  heading,
  marginTop = 36,
  marginBottom = 36,
}: DashboardSectionProps) {
  return (
    <section
      data-testid="dashboard-section"
      className={`px-6`}
      style={{
        marginTop: `${marginTop / 4}rem`,
        marginBottom: `${marginBottom / 4}rem`,
      }}
    >
      <div className="flex flex-col items-center mx-auto w-max-[1024px]">
        {heading && <h1 className="text-7xl mb-8 text-center">{heading}</h1>}
        {children}
      </div>
    </section>
  );
}
