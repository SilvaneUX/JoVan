export default function AboutPage() {
  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800">
          About JoVan
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Story</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            JoVan is a leading export and import company specializing in local commodities. 
            With years of experience in international trade, we have built strong relationships 
            with suppliers and customers across the globe.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Our mission is to connect local producers with international markets, ensuring 
            that high-quality products reach customers worldwide while supporting local communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To become the most trusted partner in the export and import of local commodities, 
              fostering sustainable trade relationships that benefit both producers and consumers.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To provide exceptional service, maintain the highest quality standards, and create 
              value for all stakeholders through ethical and sustainable business practices.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Quality Assurance</h3>
              <p className="text-gray-700">
                All our products undergo rigorous quality checks to ensure they meet international standards.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Reliable Delivery</h3>
              <p className="text-gray-700">
                We work with trusted logistics partners to ensure timely and safe delivery of your orders.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Competitive Pricing</h3>
              <p className="text-gray-700">
                Our direct relationships with suppliers allow us to offer competitive prices without compromising quality.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Customer Support</h3>
              <p className="text-gray-700">
                Our dedicated team is always ready to assist you with any queries or concerns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
