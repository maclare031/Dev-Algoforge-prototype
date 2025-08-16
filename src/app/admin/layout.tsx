import "../globals.css";
import AuthGuard from '../../components/AuthGuard';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-black via-gray-900 to-black overflow-x-hidden text-white">
        <AuthGuard>
          {children}
        </AuthGuard>
      </body>
    </html>
  );
}
