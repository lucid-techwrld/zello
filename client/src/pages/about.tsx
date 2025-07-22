const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At Zello, we are committed to building a platform that simplifies
            your shopping experience. We connect people to quality products and
            provide a secure, fast, and personalized marketplace. Our mission is
            to make discovery, buying, and selling effortless and enjoyable.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
          <p className="text-gray-700 leading-relaxed">
            We provide users with a dynamic platform where they can search for
            products, communicate directly with sellers, and manage their
            purchases with ease. With a strong focus on usability and
            reliability, Zello helps small businesses and individuals reach
            their audience effortlessly.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Davis", "Fatima", "John"].map((name, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-xl p-6 text-center shadow-sm"
              >
                <div className="w-24 h-24 rounded-full mx-auto bg-gray-300 mb-4" />
                <h3 className="font-bold">{name}</h3>
                <p className="text-sm text-gray-600">Fullstack Developer</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700">
            Have any questions or feedback? Reach out to our support team
            anytime at{" "}
            <a
              href="mailto:support@zello.com"
              className="text-blue-600 underline"
            >
              support@zello.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
