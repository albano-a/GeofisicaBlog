import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import sanityClient from "../cms/sanityClient";
import { PortableText } from "@portabletext/react";

export default function Home() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
        _id,
        title,
        slug,
        coverImage{asset->{url}},
        publishedAt,
        author->{name},
        body
      }`
      )
      .then(setPosts);
  }, []);
  return (
    <>
      <section className="flex flex-col items-center justify-center py-16 px-4">
        <Divider
          sx={{
            width: "100%",
            my: 8,
            "&::before, &::after": { borderColor: "grey.200" },
            bgcolor: "background.paper",
          }}
        >
          <h1 className="bg-seagreen-50 text-4xl md:text-5xl font-bold px-6 md:px-8 py-4 rounded-lg shadow-md tracking-tight">
            {t("WelcomeMessage")}
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            {t("WelcomeDescription")}
          </p>
        </Divider>

        {/* Blog Posts */}
        <div className="w-full max-w-5xl mt-12">
          <h2 className="text-2xl font-bold mb-6">{t("LatestPosts")}</h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {posts.map((post: any) => (
              <article
                key={post._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col"
              >
                {post.coverImage?.asset?.url && (
                  <img
                    src={post.coverImage.asset.url}
                    alt={post.title}
                    className="rounded-md mb-4 object-cover h-40 w-full"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <div className="text-gray-500 text-sm mb-2">
                  {post.author?.name} &middot;{" "}
                  {new Date(post.publishedAt).toLocaleDateString()}
                </div>
                <div className="text-gray-700 flex-1 mb-4 line-clamp-3">
                  <PortableText value={post.body} />
                </div>
                <a
                  href={`/post/${post.slug?.current}`}
                  className="mt-2 text-seagreen-700 font-medium hover:underline"
                >
                  {t("ReadMore")}
                </a>
              </article>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="w-full max-w-5xl mt-16">
          <h3 className="text-2xl font-bold mb-6">{t("Categories")}</h3>
          <div className="flex flex-wrap gap-4">
            {["Geophysics", "Seismology", "Remote Sensing", "Geology"].map(
              (cat) => (
                <span
                  key={cat}
                  className="bg-seagreen-100 text-seagreen-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-seagreen-200 transition"
                >
                  {t(cat)}
                </span>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}
