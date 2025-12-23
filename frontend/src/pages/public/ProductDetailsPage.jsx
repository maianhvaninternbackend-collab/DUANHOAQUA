import React, { useState } from "react";
import { Rate } from "antd";
import { FaShoppingCart, FaHeart, FaTruck, FaShieldAlt } from "react-icons/fa";
import product_dua_luoi from "../../assets/product_dua_luoi.png"
const ProductDetails = ({ product }) => {
  // Mock data nếu không có props truyền vào
  const data = product || {
    name: "Dưa Lưới Fuji Nhật Bản",
    price: "150.000đ",
    oldPrice: "180.000đ",
    rating: 5,
    description: "Dưa lưới Fuji được trồng theo công nghệ Nhật Bản, có vị ngọt thanh, thơm đặc trưng và giòn tan trong từng miếng. Sản phẩm đã được gọt sẵn, đóng hộp tiện lợi, đảm bảo tươi ngon đến tay khách hàng.",
    image: product_dua_luoi, // Thay bằng image dưa lưới của bạn
    benefits: [
      "Gọt sẵn tiện lợi, dùng ngay",
      "Nguồn gốc rõ ràng, đạt chuẩn VietGAP",
      "Giàu Vitamin C và chất xơ",
    ]
  };

  const [quantity, setQuantity] = useState(1);

  return (
    <section className="bg-white min-h-screen pt-28 pb-10 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* --- CỘT TRÁI: HÌNH ẢNH (Desktop: w-1/2) --- */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-sm border border-gray-100">
              <img 
                src={data.image} 
                alt={data.name} 
                className="w-full h-full object-cover"
              />
              {/* Badge giảm giá tương tự style num của bạn */}
              <div className="absolute top-5 left-5 bg-[#c4cd38] text-white font-bold px-4 py-2 rounded-lg shadow-md">
                HOT
              </div>
            </div>
          </div>

          {/* --- CỘT PHẢI: THÔNG TIN (Desktop: w-1/2) --- */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 uppercase tracking-tight">
                {data.name}
              </h1>
              <div className="flex items-center gap-4">
                <Rate disabled defaultValue={data.rating} className="text-orange-400 text-sm" />
                <span className="text-gray-400 text-sm">(25 đánh giá từ khách hàng)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-[#49a760]">{data.price}</span>
              <span className="text-xl text-gray-400 line-through">{data.oldPrice}</span>
            </div>

            <p className="text-gray-600 leading-relaxed border-l-4 border-[#c4cd38] pl-4 italic">
              {data.description}
            </p>

            {/* Lợi ích ngắn gọn */}
            <ul className="space-y-3 pt-2">
              {data.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <div className="size-2 rounded-full bg-[#49a760]" />
                  {benefit}
                </li>
              ))}
            </ul>

            {/* Chọn số lượng & Mua ngay */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <div className="flex items-center border-2 border-gray-100 rounded-xl w-fit">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-50 text-xl"
                >-</button>
                <span className="px-6 font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-50 text-xl"
                >+</button>
              </div>
              
              <button className="flex-1 bg-(--color-green-button) text-white font-bold uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#153a2e] transition-all shadow-lg active:scale-95">
                <FaShoppingCart /> Thêm vào giỏ hàng
              </button>
              
              <button className="p-4 border-2 border-gray-100 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors">
                <FaHeart size={20} />
              </button>
            </div>

            {/* Thông tin thêm (Trust Badges) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <FaTruck className="text-[#cea73d] size-6" />
                <div>
                  <p className="font-bold text-sm">Giao hàng nhanh</p>
                  <p className="text-xs text-gray-500">Trong vòng 2h tại Hà Nội</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-[#cea73d] size-6" />
                <div>
                  <p className="font-bold text-sm">Bảo hành tươi ngon</p>
                  <p className="text-xs text-gray-500">Đổi trả nếu không hài lòng</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;