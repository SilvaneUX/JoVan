import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappUrl = `https://wa.me/${product.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in ${encodeURIComponent(product.name)}`;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 bg-gray-200">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mb-2 text-sm">{product.category}</p>
        <p className="text-gray-700 mb-4">{product.description}</p>
        {product.price && (
          <p className="text-blue-600 font-semibold mb-4">{product.price}</p>
        )}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          <FaWhatsapp className="mr-2 text-xl" />
          Contact via WhatsApp
        </a>
      </div>
    </div>
  );
}
