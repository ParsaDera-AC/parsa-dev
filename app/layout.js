import "./globals.css";

export const metadata = {
  title: "My Portfolio",
  description: "Showcasing my work as a full-stack developer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
