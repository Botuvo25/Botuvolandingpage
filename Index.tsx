console.log('Index.tsx rendered');

import Hero from "@/components/Hero";
// ... other imports

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      {/* other components */}
    </div>
  );
};

export default Index;
