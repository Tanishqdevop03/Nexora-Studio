import Button from "../components/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center pt-32">
      <div className="container-x text-center">
        <p className="font-display text-[30vw] leading-none font-bold text-white/5 md:text-[16rem]">404</p>
        <h1 className="-mt-8 text-4xl font-semibold md:-mt-16 md:text-6xl">This page doesn&apos;t exist.</h1>
        <p className="mt-4 text-muted">The link might be broken, or the page may have moved.</p>
        <Button to="/" className="mt-10">
          Back to Home
        </Button>
      </div>
    </section>
  );
}
