import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactPage() {
  const whatsappNumber = '+1234567890';
  const email = 'info@jovan.com';
  const phone = '+1 (234) 567-890';
  const address = '123 Business Street, City, Country';

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Get in touch with us for any inquiries about our products or services
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Get In Touch</h2>
            
            <div className="space-y-6">
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition"
              >
                <FaWhatsapp className="text-3xl text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">WhatsApp</h3>
                  <p className="text-gray-600">{whatsappNumber}</p>
                  <p className="text-sm text-blue-600">Click to chat</p>
                </div>
              </a>

              <div className="flex items-start space-x-4 p-4">
                <FaEnvelope className="text-3xl text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <a href={`mailto:${email}`} className="text-gray-600 hover:text-blue-600">
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4">
                <FaPhone className="text-3xl text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="text-gray-600 hover:text-blue-600">
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4">
                <FaMapMarkerAlt className="text-3xl text-red-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Address</h3>
                  <p className="text-gray-600">{address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Business Hours</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-3">
                <span className="font-semibold text-gray-800">Monday - Friday</span>
                <span className="text-gray-600">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <span className="font-semibold text-gray-800">Saturday</span>
                <span className="text-gray-600">9:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <span className="font-semibold text-gray-800">Sunday</span>
                <span className="text-gray-600">Closed</span>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Quick Response</h3>
              <p className="text-gray-600 text-sm">
                For immediate assistance, reach us via WhatsApp. We typically respond within 
                a few hours during business hours.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="mb-6 text-lg">
            Contact us today to discuss your export and import needs
          </p>
          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            <FaWhatsapp className="mr-2 text-xl" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
