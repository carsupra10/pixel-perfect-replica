import { createFileRoute } from "@tanstack/react-router";
import { About, Contact, Footer, Gallery, Header, Hero, Quote, Services, WhyUs } from "@/components/site/Sections";

const title = "Mission Ocean | Container Leasing, Rental & Sales in Chennai";
const description =
  "Lease, rent, or buy reliable containers from Chennai, serving shipping lines, freight forwarders, and exporters.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Gallery />
        <WhyUs />
        <Quote />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
