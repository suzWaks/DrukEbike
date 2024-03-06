import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Banner from "@layouts/components/Banner";
import Cta from "@layouts/components/Cta";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { gsap } from "@lib/gsap";
import Post from "@partials/Post";
import { useEffect, useRef } from "react";
import Link from 'next/link'
const { blog_folder } = config.settings;

// blog pagination
const BlogPagination = ({
  postIndex,
  posts,
  authors,
  currentPage,
  pagination,
}) => {
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const { frontmatter } = postIndex;
  const { title } = frontmatter;
  const postsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(postsRef.current, {
        opacity: 1,
        duration: 0.5,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Base title={title}>
      <section className="section pt-0">
        <Banner title={title} />
        <div className="container mt-11 pt-11">
          <div class="font-[sans-serif] bg-white p-4">
            <div class="max-w-4xl mx-auto">
              <div class="text-center">
                <h2 class="text-3xl font-extrabold text-[#333] inline-block border-b-4 border-[#333] pb-1">Kindly fill in to book</h2>
              </div>
              <div class="mt-12 pt-11">
                <div class="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 class="text-xl font-bold text-[#333]">01</h3>
                    <h3 class="text-xl font-bold text-[#333]">Personal Details</h3>
                  </div>
                  <div class="md:col-span-2">
                    <form>
                      <div class="grid sm:grid-cols-2 gap-5">
                        <input type="text" placeholder="First name"
                          class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                        <input type="text" placeholder="Last name"
                          class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                        <input type="email" placeholder="Email address"
                          class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                        <input type="number" placeholder="Phone number"
                          class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                      </div>
                    </form>
                  </div>
                </div>
                <div class="grid md:grid-cols-3 gap-6 mt-12 pt-12">
                  <div>
                    <h3 class="text-xl font-bold text-[#333]">02</h3>
                    <h3 class="text-xl font-bold text-[#333]">Booking Details</h3>
                  </div>
                  <div class="md:col-span-2">
                    <form>
                      <div class="grid sm:grid-cols-2 gap-5">
                        <input type="date" placeholder="Date"
                          class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />

                        <select
                          class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none">
                          <option selected disabled>Choose time</option>
                          <option value="08:00">08:00 AM</option>
                          <option value="12:00">12:00 PM</option>
                          <option value="15:30">03:30 PM</option>
                        </select>
                        <select
                          class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none">
                          <option selected disabled>Choose duration</option>
                          <option value="1">1hr</option>
                          <option value="2">2hr</option>
                          <option value="3">3hr</option>
                          <option value="3">Whole day</option>
                        </select>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="grid md:grid-cols-3 gap-6 mt-12 pt-12">
                  <div>
                    <h3 class="text-xl font-bold text-[#333]">03</h3>
                    <h3 class="text-xl font-bold text-[#333]">Documents</h3>
                  </div>
                  <div class="md:col-span-2">
                    <form>
                      <div class="grid sm:grid-cols-2 gap-5">
                        <label for="uploadFile1"
                          class="bg-white  rounded w-full sm:w-[360px] min-h-[160px] py-4 px-4 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 mx-auto font-[sans-serif] m-4">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 mb-6 fill-gray-400" viewBox="0 0 24 24">
                            <path
                              d="M22 13a1 1 0 0 0-1 1v4.213A2.79 2.79 0 0 1 18.213 21H5.787A2.79 2.79 0 0 1 3 18.213V14a1 1 0 0 0-2 0v4.213A4.792 4.792 0 0 0 5.787 23h12.426A4.792 4.792 0 0 0 23 18.213V14a1 1 0 0 0-1-1Z"
                              data-original="#000000" />
                            <path
                              d="M6.707 8.707 11 4.414V17a1 1 0 0 0 2 0V4.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414Z"
                              data-original="#000000" />
                          </svg>
                          <p class="text-gray-400 font-semibold text-sm">Drag & Drop or <span class="text-[#007bff]">Choose file</span> to
                            upload ID copy</p>
                          <input type="file" id='uploadFile1' class="hidden" />
                          <p class="text-xs text-gray-400 mt-2">PNG, JPG and PDF are Allowed.</p>
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="grid md:grid-cols-3 gap-6 mt-12 pt-12">
                  <div>
                    <h3 class="text-xl font-bold text-[#333]">04</h3>
                    <h3 class="text-xl font-bold text-[#333]">Payment method</h3>
                  </div>
                  <div class="md:col-span-2">
                    <div class="grid gap-6 sm:grid-cols-2">
                      <div class="flex items-center">
                        <input type="radio" class="w-5 h-5 cursor-pointer" id="card" name="paymentMethod" checked />
                        <label for="card" class="ml-4 flex gap-2 cursor-pointer">
                          <img src="https://readymadeui.com/images/visa.webp" class="w-12" alt="card1" />
                          <img src="https://readymadeui.com/images/american-express.webp" class="w-12" alt="card2" />
                          <img src="https://readymadeui.com/images/master.webp" class="w-12" alt="card3" />
                        </label>
                      </div>
                      <div class="flex items-center">
                        <input type="radio" class="w-5 h-5 cursor-pointer" id="mbob" name="paymentMethod" />
                        <label for="mbob" class="ml-4 flex gap-2 cursor-pointer">
                          <img src="https://thebhutanese.bt/wp-content/uploads/2020/11/86170542_4035856139774019_7366998609297932288_oS.jpg" class="w-20" alt="mbob" />
                          <img src="https://bnb.bt/wp-content/uploads/2023/02/MPay.svg" class="w-20" alt="mpay" />
                        </label>
                      </div>
                    </div>
                    <div class="grid sm:grid-cols-4 gap-6 mt-6">
                      <div class="col-span-2">
                        <input type="number" placeholder="Card number"
                          class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                      </div>
                      <input type="number" placeholder="EXP."
                        class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                      <input type="number" placeholder="CVV"
                        class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                    </div>
                    <div class="flex items-center mt-10">
                      <input id="checkbox1" type="checkbox"
                        class="w-4 h-4 mr-3 focus:ring-1 focus:ring-offset-2 focus:ring-[#007bff]" />
                      <label for="checkbox1" class="text-black text-md">I agree to the <Link href='/terms-policy' className="text-primary">Terms and Conditions</Link></label>
                    </div>
                  </div>
                </div>

                <div class="flex flex-wrap justify-end gap-4 mt-12">
                  <button type="button"
                    class="px-6 py-3.5 text-sm bg-transparent border-2 text-[#333] rounded-md hover:bg-gray-100">Pay later</button>
                  <button type="button"
                    class="px-6 py-3.5 text-sm btn btn-primary text-white rounded-md">Pay now</button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="row justify-center pt-20 pb-16 opacity-0"
            ref={postsRef}
          >
            {currentPosts.map((post, i) => (
              <div key={`key-${i}`} className="mb-8 lg:col-5">
                <Post post={post} authors={authors} />
              </div>
            ))}
          </div>
          <Pagination
            section={blog_folder}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </section>
      {/* CTA */}
      <Cta />
    </Base>
  );
};

export default BlogPagination;

// get blog pagination slug
export const getStaticPaths = () => {
  const getAllSlug = getSinglePage(`content/${blog_folder}`);
  const allSlug = getAllSlug.map((item) => item.slug);
  const { pagination } = config.settings;
  const totalPages = Math.ceil(allSlug.length / pagination);
  let paths = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      params: {
        slug: (i + 1).toString(),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

// get blog pagination content
export const getStaticProps = async ({ params }) => {
  const currentPage = parseInt((params && params.slug) || 1);
  const { pagination } = config.settings;
  const posts = getSinglePage(`content/${blog_folder}`);
  const postIndex = await getListPage(`content/${blog_folder}/_index.md`);

  return {
    props: {
      pagination: pagination,
      posts: posts,
      currentPage: currentPage,
      postIndex: postIndex,
    },
  };
};
