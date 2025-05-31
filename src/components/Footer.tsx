// app/components/Footer.tsx
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Smartphone, Mail } from "lucide-react";
import IconSocial from "./ui/IconSocial";
export function Footer() {
  return (
    <footer className="bg-secondary border-t text-primary border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Store Info */}
        <div className="space-y-4">
          <h1 className="text-2xl text-white font-bold  cursor-pointer ">
            Saydaliyya
          </h1>
          <p className="">
            We offer a wide range of medicines and health products to help you stay healthy and happy. Our team is dedicated to providing you with the best service and support.
          </p>
        </div>

        {/* Customer Service */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white hover:font-bold cursor-pointer">
            Customer Service
          </h2>
          <ul className="space-y-2">
            {["Shipping", "Returns", "Payments", "Contact Us", "Help"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className=" hover:text-white cursor-pointer hover:font-semibold transition"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contacts */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold hover:font-bold text-white cursor-pointer">
            Contacts
          </h2>
          <address className="not-italic space-y-2  cursor-pointer  transition">
            <div className="flex items-start hover:font-bold transition">
              <MapPin className="mr-2 h-7 w-7 mt-1 " />
              <p className="">Canal Road, Faisalabad, Pakistan</p>
            </div>
            <div className="flex items-center hover:font-bold transition">
              <Phone className="mr-2 h-7 w-7 " />
              <p className="">(41) 456-78-90</p>
            </div>
            <div className="flex items-center hover:font-bold transition">
              <Smartphone className="mr-2 h-7 w-7 " />
              <p className="">+92 3184757136</p>
            </div>
            <div className="flex items-center hover:font-bold transition">
              <Mail className="mr-2 h-7 w-7 " />
              <p className="">saydaliyyaAdmin@gmail.com</p>
            </div>
          </address>
        </div>

       {/* Newsletter */}
       <div className="space-y-4 flex flex-col  md:items-start">
          <h2 className="text-lg font-semibold text-white">Newsletter</h2>
          <p className="">
            Join our newsletter and receive 10% off your first purchase.
          </p>
          <div className="space-x-2">
            <IconSocial
              containerstyle="flex lg:gap-6 gap-3 lg:mb-0 mb-10 justify-center md:justify-start"
              iconstyle="w-9 h-9 border border-white rounded-full flex justify-center items-center text-white text-base hover:bg-white hover:text-[#75aa22] hover:transition-all duration-500"
            />
          </div>
        </div>
      </div>

     
      {/* Copyright */}
      <div className="mt-12 pt-8 border-t border-primary text-center text-gray-500">
        <p>
          © {new Date().getFullYear()} Saydaliyya. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
