import { render } from "@testing-library/react";
import Providers from "../../Providers";

export const renderWithProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return render(<Providers>{children}</Providers>);
};
