/** Marks prototype content so nobody mistakes it for a real published item. */
export function SampleBadge({ show }: { show?: boolean }) {
  if (!show) return null;
  return (
    <span className="badge badge--sample" title="নমুনা কনটেন্ট — অ্যাডমিন প্যানেল থেকে প্রকৃত তথ্য যুক্ত হবে">
      নমুনা
    </span>
  );
}
