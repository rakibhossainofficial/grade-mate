export default function LoadingSpinner({ size = 24, color = "text-primary" }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-4 ${color} border-t-transparent`}
        style={{ width: size, height: size }}
      />
    </div>
  );
}
