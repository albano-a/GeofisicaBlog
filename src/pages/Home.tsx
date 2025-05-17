import { useTranslation } from "react-i18next";
import Divider from "@mui/material/Divider";

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Divider
          sx={{
            width: "100%",
            my: 4,
            "&::before, &::after": { borderColor: "grey.300" },
          }}
        >
          <span className="bg-seagreen-50 text-4xl mt-18">
            {t("WelcomeMessage")}
          </span>
        </Divider>
      </div>
    </>
  );
}
