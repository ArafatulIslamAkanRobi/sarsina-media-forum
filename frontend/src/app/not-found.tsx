import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <div className="empty-state">
          <h1 style={{ fontSize: 28 }}>পেজটি পাওয়া যায়নি</h1>
          <p>আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে অথবা এখনো প্রকাশিত হয়নি।</p>
          <Link href="/" className="btn btn-primary">হোমে ফিরে যান</Link>
        </div>
      </div>
    </section>
  );
}
