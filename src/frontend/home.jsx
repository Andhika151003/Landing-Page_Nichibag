import React from "react";
import Carousel from "../components/Carousel";
import Button from "../components/ButtonProduct";
import HeroSection from "../components/HeroSection";

const Product = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Produk Terlaris yang Wajib Dimiliki
          </h2>

          <p className="mx-auto mt-4 max-w-md text-gray-500">
            Dipesan ratusan kali setiap bulan, inilah pilihan yang tak pernah mengecewakan.
          </p>
        </header>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li>
            <a href="#" className="group block overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt=""
                className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[250px]"
              />

              <div className="relative bg-transparent pt-3">
                <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                  Basic Tee
                </h3>

                <p className="mt-2">
                  <span className="sr-only"> Regular Price </span>

                  <span className="tracking-wider text-gray-900">
                    {" "}
                    £24.00 GBP{" "}
                  </span>
                </p>
              </div>
            </a>
          </li>

          <li>
            <a href="#" className="group block overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt=""
                className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[250px]"
              />

              <div className="relative bg-transparent pt-3">
                <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                  Basic Tee
                </h3>

                <p className="mt-2">
                  <span className="sr-only"> Regular Price </span>

                  <span className="tracking-wider text-gray-900">
                    {" "}
                    £24.00 GBP{" "}
                  </span>
                </p>
              </div>
            </a>
          </li>

          <li>
            <a href="#" className="group block overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt=""
                className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[250px]"
              />

              <div className="relative bg-transparent pt-3">
                <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                  Basic Tee
                </h3>

                <p className="mt-2">
                  <span className="sr-only"> Regular Price </span>

                  <span className="tracking-wider text-gray-900">
                    {" "}
                    £24.00 GBP{" "}
                  </span>
                </p>
              </div>
            </a>
          </li>

          <li>
            <a href="#" className="group block overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt=""
                className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[250px]"
              />

              <div className="relative bg-transparent pt-3">
                <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                  Basic Tee
                </h3>

                <p className="mt-2">
                  <span className="sr-only"> Regular Price </span>

                  <span className="tracking-wider text-gray-900">
                    {" "}
                    £24.00 GBP{" "}
                  </span>
                </p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div className="mt-6 flex justify-center">
        <Button />
      </div>
    </section>
  );
};

const Category = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Temukan Kategori Produk Favorit Semua Orang!
          </h2>

          <p className="mx-auto mt-4 max-w-md text-gray-500">
             Dari ratusan pilihan, inilah kategori yang selalu jadi incaran — siap temukan yang cocok untuk Anda?
          </p>
        </header>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li>
            <a href="#" className="group block overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt=""
                className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[250px]"
              />

              <div className="relative bg-transparent pt-3">
                <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                  Basic Tee
                </h3>

                <p className="mt-2">
                  <span className="sr-only"> Regular Price </span>

                  <span className="tracking-wider text-gray-900">
                    {" "}
                    £24.00 GBP{" "}
                  </span>
                </p>
              </div>
            </a>
          </li>

          <li>
            <a href="#" className="group block overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt=""
                className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[250px]"
              />

              <div className="relative bg-transparent pt-3">
                <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                  Basic Tee
                </h3>

                <p className="mt-2">
                  <span className="sr-only"> Regular Price </span>

                  <span className="tracking-wider text-gray-900">
                    {" "}
                    £24.00 GBP{" "}
                  </span>
                </p>
              </div>
            </a>
          </li>

          <li>
            <a href="#" className="group block overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt=""
                className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[250px]"
              />

              <div className="relative bg-transparent pt-3">
                <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                  Basic Tee
                </h3>

                <p className="mt-2">
                  <span className="sr-only"> Regular Price </span>

                  <span className="tracking-wider text-gray-900">
                    {" "}
                    £24.00 GBP{" "}
                  </span>
                </p>
              </div>
            </a>
          </li>

          <li>
            <a href="#" className="group block overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt=""
                className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[250px]"
              />

              <div className="relative bg-transparent pt-3">
                <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                  Basic Tee
                </h3>

                <p className="mt-2">
                  <span className="sr-only"> Regular Price </span>

                  <span className="tracking-wider text-gray-900">
                    {" "}
                    £24.00 GBP{" "}
                  </span>
                </p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      {/* <div className="mt-6 flex justify-center">
        <Button />
      </div> */}
    </section>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Carousel tanpa container padding */}
      <Carousel />

      {/* Section lainnya dengan padding */}
      <div className="px-8 py-16 bg-[#F9F6EE]">
        <Product />
      </div>

      <div>
        <HeroSection /> 
      </div>

      <div>
        <Category />
      </div>

    </div>
  );
};

export default Home;
