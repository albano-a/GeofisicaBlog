import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import sanityClient from "../cms/sanityClient";
import { useTranslation } from "react-i18next";
import { PortableText } from "@portabletext/react";

export default function Post() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post" && slug.current == $slug][0]{
                    _id,
                    title,
                    slug,
                    coverImage{asset->{url}},
                    publishedAt,
                    author->{name, image{asset->{url}}},
                    body
                }`,
        { slug }
      )
      .then((data) => {
        setPost(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (!post) return <div className="text-center py-16">Post not found.</div>;

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <Link
        to="/"
        className="text-seagreen-700 hover:underline mb-6 block text-left"
      >
        ← {t("BackToHome")}
      </Link>
      <h1 className="text-4xl font-bold mb-2 text-center">{post.title}</h1>
      <div className="text-gray-500 text-sm mb-4 flex justify-center">
        By {post.author?.name} &middot;{" "}
        {new Date(post.publishedAt).toLocaleDateString()}
      </div>
      <hr className="mb-8" />
      <article className="prose prose-lg" style={{ textAlign: "justify" }}>
        <PortableText value={post.body} />
      </article>
    </section>
  );
}
