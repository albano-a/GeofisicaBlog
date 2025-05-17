import { useTranslation } from "react-i18next";
import Divider from "@mui/material/Divider";

export default function Home() {
  const { t } = useTranslation();
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

        {/* Featured Articles */}
        <div className="w-full max-w-5xl grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {[1, 2, 3].map((id) => (
            <article
              key={id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col"
            >
              <img
                src={`https://source.unsplash.com/random/400x200?sig=${id}`}
                alt={t("FeaturedArticleAlt", { id })}
                className="rounded-md mb-4 object-cover h-40 w-full"
              />
              <h2 className="text-xl font-semibold mb-2">
                {t(`FeaturedArticleTitle${id}`)}
              </h2>
              <p className="text-gray-600 flex-1">
                {t(`FeaturedArticleDesc${id}`)}
              </p>
              <a
                href="#"
                className="mt-4 text-seagreen-700 font-medium hover:underline"
              >
                {t("ReadMore")}
              </a>
            </article>
          ))}
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
