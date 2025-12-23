export default function FeaturesCarousel() {
  return (
    <div>
      {/* Placeholder for Features Carousel */}
      <h2>Features Carousel</h2>
      <Feature
        name={"Календарь"}
        description={"Просматривайте и управляйте своими задачами с помощью удобного календаря."}
      />
    </div>
  );
}

function Feature({ name, description, icon }: { name: string; description: string; icon: string }) {
  return (
    <div className="feature">
      <img src={icon} alt={`${name} icon`} />
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}